package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.*;
import hr.fer.zr.handballapp.model.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MatchMapper implements DefaultMapper<Match, MatchDto> {
    private final RefereeMapper refereeMapper;

    public MatchMapper(RefereeMapper refereeMapper) {
        this.refereeMapper = refereeMapper;
    }

    @Override
    public MatchDto map(Match match) {
        MatchDto matchDto = new MatchDto();
        matchDto.setMatchId(match.getMatchId());
        matchDto.setClubOne(mapClub(match.getClubOne()));
        matchDto.setClubTwo(mapClub(match.getClubTwo()));
        matchDto.setCompetition(mapCompetition(match.getCompetition()));
        matchDto.setClubOneGoals(match.getClubOneGoals());
        matchDto.setClubTwoGoals(match.getClubTwoGoals());
        matchDto.setDatePlayed(match.getDatePlayed());
        matchDto.setMatchReferees(refereeMapper.mapToList(match.getMatchReferees()));
        matchDto.setClubOnePlayerMatchPerformance(mapPlayerPerformance(getPlayersForClub(match.getClubOne().getClubId(), match.getPlayerMatchPerformanceListClub())));
        matchDto.setClubTwoPlayerMatchPerformance(mapPlayerPerformance(getPlayersForClub(match.getClubTwo().getClubId(), match.getPlayerMatchPerformanceListClub())));
        return matchDto;
    }

    private List<PlayerMatchPerformance> getPlayersForClub(Long clubId, List<PlayerMatchPerformance> playerMatchPerformanceList) {
        List<PlayerMatchPerformance> performanceList = new ArrayList<>();
        for (PlayerMatchPerformance playerMatchPerformance : playerMatchPerformanceList) {
            Club club = playerMatchPerformance.getClub();
            if (club.getClubId().equals(clubId)) {
                performanceList.add(playerMatchPerformance);
            }
        }
        return performanceList;
    }

    private ClubDto mapClub(Club club) {
        ClubDto clubDto = new ClubDto();
        clubDto.setClubId(club.getClubId());
        clubDto.setName(club.getName());
        return clubDto;
    }

    private CompetitionDto mapCompetition(Competition competition) {
        CompetitionDto competitionDto = new CompetitionDto();
        competitionDto.setCompetitionId(competition.getCompetitionId());
        competitionDto.setName(competition.getName());
        return competitionDto;
    }

    private List<PlayerPerformanceDto> mapPlayerPerformance(List<PlayerMatchPerformance> playerMatchPerformanceList) {
        List<PlayerPerformanceDto> performanceList = new ArrayList<>();
        for (PlayerMatchPerformance playerMatchPerformance : playerMatchPerformanceList) {
            PlayerPerformanceDto playerPerformanceDto = new PlayerPerformanceDto();
            playerPerformanceDto.setPlayer(mapPlayer(playerMatchPerformance.getPlayer()));
            playerPerformanceDto.setAssists(playerMatchPerformance.getAssists());
            playerPerformanceDto.setDefenses(playerMatchPerformance.getDefenses());
            playerPerformanceDto.setGoals(playerMatchPerformance.getGoals());
            playerPerformanceDto.setStolen(playerMatchPerformance.getStolen());
            playerPerformanceDto.setSuspensions(playerMatchPerformance.getSuspensions());
            playerPerformanceDto.setTurnovers(playerMatchPerformance.getTurnovers());

            performanceList.add(playerPerformanceDto);
        }
        return performanceList;
    }

    private PlayerDto mapPlayer(Player player) {
        PlayerDto playerDto = new PlayerDto();
        playerDto.setPlayerId(player.getPlayerId());
        playerDto.setFirstName(player.getFirstName());
        playerDto.setLastName(player.getLastName());
        return playerDto;
    }

}
