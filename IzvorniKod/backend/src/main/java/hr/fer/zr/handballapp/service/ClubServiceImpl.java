package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.ClubSaveRequestDto;
import hr.fer.zr.handballapp.dto.ClubDto;
import hr.fer.zr.handballapp.exceptions.ResourceNotFoundException;
import hr.fer.zr.handballapp.mapper.*;
import hr.fer.zr.handballapp.model.*;
import hr.fer.zr.handballapp.repository.ClubRepository;
import hr.fer.zr.handballapp.repository.CoachRepository;
import hr.fer.zr.handballapp.repository.CompetitionRepository;
import hr.fer.zr.handballapp.repository.PlayerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ClubServiceImpl implements ClubService {
    private final ClubRepository clubRepository;
    private final ClubMapper clubMapper;
    private final ClubLogoMapper clubLogoMapper;
    private final ClubNameMapper clubNameMapper;
    private final CoachRepository coachRepository;
    private final CompetitionRepository competitionRepository;
    private final PlayerRepository playerRepository;
    Logger logger = LoggerFactory.getLogger(ClubServiceImpl.class);

    public ClubServiceImpl(ClubRepository clubRepository, ClubMapper clubMapper, CoachRepository coachRepository, CompetitionRepository competitionRepository, PlayerRepository playerRepository, ClubLogoMapper clubLogoMapper, ClubNameMapper clubNameMapper) {
        this.clubRepository = clubRepository;
        this.clubMapper = clubMapper;
        this.coachRepository = coachRepository;
        this.competitionRepository = competitionRepository;
        this.playerRepository = playerRepository;
        this.clubLogoMapper = clubLogoMapper;
        this.clubNameMapper = clubNameMapper;
    }


    @Override
    public List<ClubDto> getAllClubs() {
        List<Club> clubs = this.clubRepository.findAll();
        return clubLogoMapper.mapToList(clubs);
    }

    @Override
    public List<ClubDto> getCompetitionClubs(Long competitionId) {
        List<Club> clubs = this.clubRepository.findAllByClubCompetitionsCompetitionId(competitionId);
        return clubNameMapper.mapToList(clubs);
    }

    @Override
    public ClubDto getClubByClubId(Long clubId) {
        Optional<Club> clubOptional = this.clubRepository.findByClubId(clubId);
        if (clubOptional.isEmpty()) {
            throw new ResourceNotFoundException(String.format("Club with id %d does not exist", clubId));
        }
        return clubMapper.map(clubOptional.get());
    }

    @Override
    @Transactional
    public ClubDto saveClub(ClubSaveRequestDto clubSaveRequestDto) {
        Club club;
        if (clubSaveRequestDto.getClubId() != null) {
            logger.info("LOGGER club postoji vec, treba ga updateati " + clubSaveRequestDto.getClubId());
            // Update
            Optional<Club> clubOptional = clubRepository.findByClubId(clubSaveRequestDto.getClubId());
            if (clubOptional.isEmpty()) {
                throw new ResourceNotFoundException(String.format("Klub s id %d ne postoji", clubSaveRequestDto.getClubId()));
            }
            club = clubOptional.get();
        } else {
            // Create
            club = new Club();
            club.setClubCoaches(new ArrayList<>());
            club.setClubPlayers(new ArrayList<>());
        }

        club.setName(clubSaveRequestDto.getName());
        club.setDescription(clubSaveRequestDto.getDescription());
        club.setImage(clubSaveRequestDto.getImage());
        club.setPlace(clubSaveRequestDto.getPlace());
        club.setEstablishmentDate(clubSaveRequestDto.getEstablishmentDate());

        List<Competition> clubCompetitions = competitionRepository.findAllById(clubSaveRequestDto.getClubCompetitions());
        club.setClubCompetitions(new HashSet<>(clubCompetitions));

        logger.info("LOGGER: save club with clubId before: " + club.getClubId());

        List<Coach> currentClubCoaches = club.getClubCoaches();
        List<Coach> clubCoaches = coachRepository.findAllById(clubSaveRequestDto.getClubCoaches());
        List<Coach> coachesToRemoveFromClub = coachesToRemoveFromClub(currentClubCoaches, clubCoaches);

        List<Player> currentClubPlayers = club.getClubPlayers();
        List<Player> clubPlayersToSet = playerRepository.findAllById(clubSaveRequestDto.getClubPlayers());
        List<Player> clubPlayersToRemove = playersToRemoveFromClub(currentClubPlayers, clubPlayersToSet);

        for (Coach coach : clubCoaches) {
            coach.setClub(club);
        }
        // Kod updatea, moramo ukloniti treneru koji je maknut s popisa trenera kluba njegov klub.
        // Coach je owning entity
        for (Coach coach : coachesToRemoveFromClub) {
            coach.setClub(null);
        }
        club.setClubCoaches(clubCoaches);

        if (!coachesToRemoveFromClub.isEmpty()) {
            coachRepository.saveAll(coachesToRemoveFromClub);
        }

        for (Player player : clubPlayersToSet) {
            player.setClub(club);
        }
        // Kod updatea, moramo ukloniti igrača koji je maknut s popisa igrača kluba njegov klub.
        // Player je owning entity zato moramo preko njega mijenjati
        for (Player playerToRemove : clubPlayersToRemove) {
            playerToRemove.setClub(null);
        }

        club.setClubPlayers(clubPlayersToSet);

        logger.info("LOGGER: save club with clubId: " + club.getClubId());


        Club savedClub = clubRepository.save(club);

        logger.info("LOGGER: save club coaches size: " + savedClub.getClubCoaches().size());


        if (!clubPlayersToRemove.isEmpty()) {
            playerRepository.saveAll(clubPlayersToRemove);
        }

        return clubMapper.map(savedClub);
    }

    @Override
    public void deleteClub(Long clubId) {
        Optional<Club> club = clubRepository.findByClubId(clubId);
        if (club.isPresent()) {
            clubRepository.delete(club.get());
        } else {
            throw new ResourceNotFoundException("Ne možete obrisati klub koji ne postoji");
        }
    }

    private List<Coach> coachesToRemoveFromClub(List<Coach> currentCoaches, List<Coach> coachesToSet) {
        // Coach implementira equals, jednaki su ako im je id jednak
        return currentCoaches.stream().filter(coach -> !coachesToSet.contains(coach)).collect(Collectors.toList());
    }

    private List<Player> playersToRemoveFromClub(List<Player> currentPlayers, List<Player> playersToSet) {
        // Coach implementira equals, jednaki su ako im je id jednak
        List<Player> playersToRemove = new ArrayList<>();
        for (Player currentPlayer : currentPlayers) {
            if (!playersToSet.contains(currentPlayer)) {
                playersToRemove.add(currentPlayer);
            }
        }
        return playersToRemove;
    }
}

