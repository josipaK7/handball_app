package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.CompetitionSaveRequestDto;
import hr.fer.zr.handballapp.dto.CompetitionDto;
import hr.fer.zr.handballapp.exceptions.ResourceNotFoundException;
import hr.fer.zr.handballapp.mapper.CompetitionLogoMapper;
import hr.fer.zr.handballapp.mapper.CompetitionMapper;
import hr.fer.zr.handballapp.model.Club;
import hr.fer.zr.handballapp.model.Competition;
import hr.fer.zr.handballapp.model.Match;
import hr.fer.zr.handballapp.repository.ClubRepository;
import hr.fer.zr.handballapp.repository.CompetitionRepository;
import hr.fer.zr.handballapp.repository.MatchRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CompetitionServiceImpl implements CompetitionService {

    private final CompetitionRepository competitionRepository;
    private final CompetitionMapper competitionMapper;
    private final CompetitionLogoMapper competitionLogoMapper;
    private final ClubRepository clubRepository;
    private final MatchRepository matchRepository;

    public CompetitionServiceImpl(CompetitionRepository competitionRepository, CompetitionMapper competitionMapper, CompetitionLogoMapper competitionLogoMapper, ClubRepository clubRepository, MatchRepository matchRepository) {
        this.competitionRepository = competitionRepository;
        this.competitionMapper = competitionMapper;
        this.competitionLogoMapper = competitionLogoMapper;
        this.clubRepository = clubRepository;
        this.matchRepository = matchRepository;
    }

    @Override
    public List<CompetitionDto> getAllCompetitions() {
        List<Competition> competitions = this.competitionRepository.findAll();
        return competitionLogoMapper.mapToList(competitions);
    }

    @Override
    public CompetitionDto getCompetitionById(Long competitionId) {
        Optional<Competition> competitionOptional = this.competitionRepository.findByCompetitionId(competitionId);
        if (competitionOptional.isEmpty()) {
            throw new ResourceNotFoundException(String.format("Competition with id %d does not exist", competitionId));
        }
        return competitionMapper.map(competitionOptional.get());
    }

    @Override
    @Transactional
    public CompetitionDto saveCompetition(CompetitionSaveRequestDto competitionSaveRequestDto) {
        Competition competition = null;
        if (competitionSaveRequestDto.getCompetitionId() != null) {
            Optional<Competition> competitionOptional =
                    this.competitionRepository.findByCompetitionId(competitionSaveRequestDto.getCompetitionId());
            if (competitionOptional.isEmpty()) {
                throw new ResourceNotFoundException(String.format("Competition with id %d does not exist",
                        competitionSaveRequestDto.getCompetitionId()));
            }
            competition = competitionOptional.get();
        } else {
            competition = new Competition();
            competition.setClubs(new ArrayList<>());
        }

        List<Club> currentClubsInCompetition = competition.getClubs();
        List<Club> requestedClubsInCompetition = clubRepository.findAllById(competitionSaveRequestDto.getClubIds());
        List<Club> clubsToRemoveFromCompetition = getClubsToDeleteFromCompetition(currentClubsInCompetition, requestedClubsInCompetition);

        for (Club club : requestedClubsInCompetition) {
            club.addCompetition(competition);
        }

        for (Club club : clubsToRemoveFromCompetition) {
            club.removeCompetition(competition);
        }

        competition.setClubs(currentClubsInCompetition);

        competition.setName(competitionSaveRequestDto.getName());
        competition.setDescription(competitionSaveRequestDto.getDescription());
        competition.setDateFrom(competitionSaveRequestDto.getDateFrom());
        competition.setDateTo(competitionSaveRequestDto.getDateTo());
        competition.setImage(competitionSaveRequestDto.getImage());

        Competition updatedCompetition = this.competitionRepository.save(competition);

        // Obrisati sve utakmice u kojima je klub sudjelovao
        if (!clubsToRemoveFromCompetition.isEmpty()) {
            List<Match> matchesToDelete = matchRepository.findAllByClubOneInOrClubTwoIn(
                    clubsToRemoveFromCompetition, clubsToRemoveFromCompetition);
            matchRepository.deleteAll(matchesToDelete);
        }

        return this.competitionMapper.map(updatedCompetition);
    }

    @Override
    public void deleteCompetition(Long competitionId) {
        Optional<Competition> competition = competitionRepository.findByCompetitionId(competitionId);
        if (competition.isPresent()) {
            competitionRepository.delete(competition.get());
        } else {
            throw new ResourceNotFoundException("Ne možete obrisati natjecanje koje ne postoji");
        }
    }

    private List<Club> getClubsToDeleteFromCompetition(List<Club> currentClubs, List<Club> clubsToAdd) {
        List<Club> deleteList = new ArrayList<>();
        Set<Long> clubIdsToKeep = clubsToAdd.stream().map(club -> club.getClubId()).collect(Collectors.toSet());

        for (Club currentClub : currentClubs) {
            if (!clubIdsToKeep.contains(currentClub.getClubId())) {
                deleteList.add(currentClub);
            }
        }
        return deleteList;
    }
}
