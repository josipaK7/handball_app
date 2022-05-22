package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.MatchDto;
import hr.fer.zr.handballapp.dto.MatchSaveRequestDto;
import hr.fer.zr.handballapp.dto.PlayerPerformanceDto;
import hr.fer.zr.handballapp.exceptions.ResourceNotFoundException;
import hr.fer.zr.handballapp.mapper.MatchMapper;
import hr.fer.zr.handballapp.model.*;
import hr.fer.zr.handballapp.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;

@Service
public class MatchServiceImpl implements MatchService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MatchServiceImpl.class);

    private final MatchRepository matchRepository;
    private final MatchMapper matchMapper;
    private final ClubRepository clubRepository;
    private final CompetitionRepository competitionRepository;
    private final RefereeRepository refereeRepository;
    private final PlayerRepository playerRepository;

    public MatchServiceImpl(MatchRepository matchRepository, MatchMapper matchMapper, ClubRepository clubRepository, CompetitionRepository competitionRepository, RefereeRepository refereeRepository, PlayerRepository playerRepository) {
        this.matchRepository = matchRepository;
        this.matchMapper = matchMapper;
        this.clubRepository = clubRepository;
        this.competitionRepository = competitionRepository;
        this.refereeRepository = refereeRepository;
        this.playerRepository = playerRepository;
    }

    @Override
    public List<MatchDto> getPlayedMatchesByCompetitionId(Long competitionId) {
        Timestamp now = Timestamp.from(Instant.now());
        List<Match> matches = matchRepository.findAllByCompetitionCompetitionIdAndDatePlayedBefore(competitionId, now);
        Collections.sort(matches, new Comparator<Match>() {
            @Override
            public int compare(Match o1, Match o2) {
                return -o1.getDatePlayed().compareTo(o2.getDatePlayed());
            }
        });
        return matchMapper.mapToList(matches);
    }

    @Override
    public List<MatchDto> getScheduledMatchesByCompetitionId(Long competitionId) {
        Timestamp now = Timestamp.from(Instant.now());
        List<Match> matches = matchRepository.findAllByCompetitionCompetitionIdAndDatePlayedAfter(competitionId, now);
        Collections.sort(matches, new Comparator<Match>() {
            @Override
            public int compare(Match o1, Match o2) {
                return -o1.getDatePlayed().compareTo(o2.getDatePlayed());
            }
        });
        return matchMapper.mapToList(matches);
    }

    @Override
    public MatchDto savePlayedMatch(MatchSaveRequestDto matchSaveRequestDto) {
        Match match;
        if (matchSaveRequestDto.getMatchId() != null) {
            // Update
            Optional<Match> matchOptional = matchRepository.findByMatchId(matchSaveRequestDto.getMatchId());
            if (matchOptional.isEmpty()) {
                throw new ResourceNotFoundException(String.format("Utakmica s id %d ne postoji", matchSaveRequestDto.getMatchId()));
            }
            match = matchOptional.get();
        } else {
            // Create
            match = new Match();
        }

        Optional<Competition> competition = competitionRepository.findByCompetitionId(matchSaveRequestDto.getCompetitionId());
        if (competition.isEmpty()) {
            throw new ResourceNotFoundException(String.format("Natjecanje s id %d ne postoji", matchSaveRequestDto.getCompetitionId()));
        }
        match.setCompetition(competition.get());
        Optional<Club> clubOne = clubRepository.findByClubId(matchSaveRequestDto.getClubOne());
        if (clubOne.isEmpty()) {
            throw new ResourceNotFoundException(String.format("Klub s id %d ne postoji", matchSaveRequestDto.getClubOne()));
        }
        match.setClubOne(clubOne.get());
        Optional<Club> clubTwo = clubRepository.findByClubId(matchSaveRequestDto.getClubTwo());
        if (clubTwo.isEmpty()) {
            throw new ResourceNotFoundException(String.format("Klub s id %d ne postoji", matchSaveRequestDto.getClubTwo()));
        }
        match.setClubTwo(clubTwo.get());
        match.setClubOneGoals(matchSaveRequestDto.getClubOneGoals());
        match.setClubTwoGoals(matchSaveRequestDto.getClubTwoGoals());
        match.setDatePlayed(matchSaveRequestDto.getDatePlayed());

        List<Referee> referees = refereeRepository.findAllByRefereeIdIn(matchSaveRequestDto.getMatchReferees());
        match.setMatchReferees(referees);

        List<PlayerMatchPerformance> playerMatchPerformanceList = new ArrayList<>();
        playerMatchPerformanceList.addAll(convert(matchSaveRequestDto.getClubOnePlayerMatchPerformance(), match, clubOne.get()));
        playerMatchPerformanceList.addAll(convert(matchSaveRequestDto.getClubTwoPlayerMatchPerformance(), match, clubTwo.get()));

        LOGGER.info("createPlayedMatch playerMatchPerformanceList size " + playerMatchPerformanceList.size());

        match.setPlayerMatchPerformanceListClub(playerMatchPerformanceList);
        return this.matchMapper.map(this.matchRepository.save(match));
    }

    private List<PlayerMatchPerformance> convert(List<PlayerPerformanceDto> playerPerformanceDtos, Match match, Club club) {
        List<PlayerMatchPerformance> playerMatchPerformanceList = new ArrayList<>();

        for (PlayerPerformanceDto playerPerformanceDto : playerPerformanceDtos) {

            LOGGER.info("createPlayedMatch convert for player id " + playerPerformanceDto.getPlayer().getPlayerId()
                    + " and match id " + match.getMatchId());
            LOGGER.info("createPlayedMatch convert goals " + playerPerformanceDto.getGoals());

            PlayerMatchPerformance entity = new PlayerMatchPerformance();
            Optional<Player> player = playerRepository.findByPlayerId(playerPerformanceDto.getPlayer().getPlayerId());
            if (player.isEmpty()) {
                throw new ResourceNotFoundException(
                        String.format("Igrač s id %d ne postoji", playerPerformanceDto.getPlayer().getPlayerId()));
            }
            entity.setPlayer(player.get());
            entity.setMatch(match);
            if (match.getMatchId() != null) {
                entity.setId(new PlayerMatchPerformanceKey(match.getMatchId(), player.get().getPlayerId()));
            }

            entity.setClub(club);
            entity.setAssists(playerPerformanceDto.getAssists());
            entity.setDefenses(playerPerformanceDto.getDefenses());
            entity.setGoals(playerPerformanceDto.getGoals());
            entity.setStolen(playerPerformanceDto.getStolen());
            entity.setSuspensions(playerPerformanceDto.getSuspensions());
            entity.setTurnovers(playerPerformanceDto.getTurnovers());

            playerMatchPerformanceList.add(entity);
        }
        return playerMatchPerformanceList;
    }

    @Override
    public void deleteMatch(Long matchId) {
        Optional<Match> match = matchRepository.findByMatchId(matchId);
        if (match.isPresent()) {
            matchRepository.delete(match.get());
        } else {
            throw new ResourceNotFoundException("Ne možete obrisati utakmicu koja ne postoji");
        }
    }

    @Override
    public List<MatchDto> getMatchesByReferee(Long matchRefereeId) {
        List<Match> matches = matchRepository.findAll();
        List<Match> refereeMatches = new ArrayList<>();
        for (Match match : matches) {
            List<Referee> referees = match.getMatchReferees();
            for (Referee referee : referees) {
                if (referee.getRefereeId().equals(matchRefereeId)) {
                    refereeMatches.add(match);
                }
            }
        }
        return this.matchMapper.mapToList(refereeMatches);
    }

    @Override
    public MatchDto saveScheduledMatch(MatchSaveRequestDto matchSaveRequestDto) {
        Match match;
        if (matchSaveRequestDto.getMatchId() != null) {
            // Update
            Optional<Match> matchOptional = matchRepository.findByMatchId(matchSaveRequestDto.getMatchId());
            if (matchOptional.isEmpty()) {
                throw new ResourceNotFoundException(String.format("Utakmica s id %d ne postoji", matchSaveRequestDto.getMatchId()));
            }
            match = matchOptional.get();
        } else {
            // Create
            match = new Match();
        }

        Optional<Competition> competition = competitionRepository.findByCompetitionId(matchSaveRequestDto.getCompetitionId());
        if (competition.isEmpty()) {
            throw new ResourceNotFoundException(String.format("Natjecanje s id %d ne postoji", matchSaveRequestDto.getCompetitionId()));
        }
        match.setCompetition(competition.get());
        Optional<Club> clubOne = clubRepository.findByClubId(matchSaveRequestDto.getClubOne());
        if (clubOne.isEmpty()) {
            throw new ResourceNotFoundException(String.format("Klub s id %d ne postoji", matchSaveRequestDto.getClubOne()));
        }
        match.setClubOne(clubOne.get());
        Optional<Club> clubTwo = clubRepository.findByClubId(matchSaveRequestDto.getClubTwo());
        if (clubTwo.isEmpty()) {
            throw new ResourceNotFoundException(String.format("Klub s id %d ne postoji", matchSaveRequestDto.getClubTwo()));
        }
        match.setClubTwo(clubTwo.get());
        match.setClubOneGoals(0L);
        match.setClubTwoGoals(0L);
        match.setDatePlayed(matchSaveRequestDto.getDatePlayed());

        List<Referee> referees = refereeRepository.findAllByRefereeIdIn(matchSaveRequestDto.getMatchReferees());
        match.setMatchReferees(referees);

        match.setPlayerMatchPerformanceListClub(new ArrayList<>());
        return this.matchMapper.map(this.matchRepository.save(match));
    }
}
