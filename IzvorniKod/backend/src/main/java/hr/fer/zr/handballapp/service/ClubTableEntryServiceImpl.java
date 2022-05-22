package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.ClubTableEntryDto;
import hr.fer.zr.handballapp.dto.MatchDto;
import hr.fer.zr.handballapp.model.Club;
import hr.fer.zr.handballapp.repository.ClubRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ClubTableEntryServiceImpl implements ClubTableEntryService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ClubTableEntryServiceImpl.class);

    private final MatchService matchService;
    private final ClubRepository clubRepository;

    public ClubTableEntryServiceImpl(MatchService matchService, ClubRepository clubRepository) {
        this.matchService = matchService;
        this.clubRepository = clubRepository;
    }

    @Override
    public List<ClubTableEntryDto> getTableEntries(Long competitionId) {
        Map<Long, ClubTableEntryDto> clubTableData = new HashMap<>();
        List<MatchDto> matches = this.matchService.getPlayedMatchesByCompetitionId(competitionId);
        Set<Long> idsOfClubsInMatches = new HashSet<>();

        for (MatchDto match : matches) {
            idsOfClubsInMatches.add(match.clubOne.getClubId());
            idsOfClubsInMatches.add(match.clubTwo.getClubId());

            ClubTableEntryDto clubTableEntryOne = clubTableData.get(match.clubOne.getClubId());
            if (clubTableEntryOne == null) {
                clubTableEntryOne = firstAppearanceInTableOne(match);
            }
            ClubTableEntryDto clubTableEntryTwo = clubTableData.get(match.clubTwo.getClubId());
            if (clubTableEntryTwo == null) {
                clubTableEntryTwo = firstAppearanceInTableTwo(match);
            }
            if (match.clubOneGoals > match.clubTwoGoals) {
                clubTableEntryOne.setVictories(clubTableEntryOne.getVictories() + 1);
                clubTableEntryTwo.setDefeats(clubTableEntryTwo.getDefeats() + 1);
                clubTableEntryOne.setPoints(clubTableEntryOne.getPoints() + 2);
                clubTableEntryTwo.setPoints(clubTableEntryTwo.getPoints());
            }
            if (match.clubOneGoals < match.clubTwoGoals) {
                clubTableEntryOne.setDefeats(clubTableEntryOne.getDefeats() + 1);
                clubTableEntryTwo.setVictories(clubTableEntryTwo.getVictories() + 1);
                clubTableEntryOne.setPoints(clubTableEntryOne.getPoints());
                clubTableEntryTwo.setPoints(clubTableEntryTwo.getPoints() + 2);
            }
            if (match.clubOneGoals.equals(match.clubTwoGoals)) {
                clubTableEntryOne.setDraws(clubTableEntryOne.getDraws() + 1);
                clubTableEntryTwo.setDraws(clubTableEntryTwo.getDraws() + 1);
                clubTableEntryOne.setPoints(clubTableEntryOne.getPoints() + 1);
                clubTableEntryTwo.setPoints(clubTableEntryTwo.getPoints() + 1);
            }
            clubTableEntryOne.setConcededGoals(clubTableEntryOne.getConcededGoals() + match.clubTwoGoals);
            clubTableEntryOne.setScoredGoals(clubTableEntryOne.getScoredGoals() + match.clubOneGoals);
            clubTableEntryOne.setMatchesPlayed(clubTableEntryOne.getMatchesPlayed() + 1);
            clubTableData.put(match.clubOne.getClubId(), clubTableEntryOne);

            clubTableEntryTwo.setConcededGoals(clubTableEntryTwo.getConcededGoals() + match.clubOneGoals);
            clubTableEntryTwo.setScoredGoals(clubTableEntryTwo.getScoredGoals() + match.clubTwoGoals);
            clubTableEntryTwo.setMatchesPlayed(clubTableEntryTwo.getMatchesPlayed() + 1);
            clubTableData.put(match.clubTwo.getClubId(), clubTableEntryTwo);
        }

        List<Club> clubsWithZeroMatches = clubRepository.findAllByClubCompetitionsCompetitionId( competitionId)
                .stream().filter(club -> !idsOfClubsInMatches.contains(club.getClubId())).collect(Collectors.toList());

        for (Club clubWithZeroMatches : clubsWithZeroMatches) {
            ClubTableEntryDto clubTableEntryDto = emptyClubTableEntryFor(clubWithZeroMatches);
            clubTableData.put(clubWithZeroMatches.getClubId(), clubTableEntryDto);
        }

        List<ClubTableEntryDto> clubTable = new ArrayList<ClubTableEntryDto>(clubTableData.values());
        /* clubTable.sort(Comparator.comparing(ClubTableEntryDto::getPoints).reversed()
                .thenComparing(ClubTableEntryDto::getGoalDifference, Comparator.reverseOrder())
                .thenComparing(ClubTableEntryDto::getClubName));*/


        Collections.sort(clubTable, new ClubTableEntryComparator());
        return clubTable;
    }

    public ClubTableEntryDto firstAppearanceInTableOne(MatchDto match) {
        ClubTableEntryDto clubTableEntry = new ClubTableEntryDto();
        clubTableEntry.setClubId(match.clubOne.getClubId());
        clubTableEntry.setClubName(match.clubOne.getName());
        return clubTableEntry;
    }

    public ClubTableEntryDto firstAppearanceInTableTwo(MatchDto match) {
        ClubTableEntryDto clubTableEntry = new ClubTableEntryDto();
        clubTableEntry.setClubId(match.clubTwo.getClubId());
        clubTableEntry.setClubName(match.clubTwo.getName());
        return clubTableEntry;
    }

    private ClubTableEntryDto emptyClubTableEntryFor(Club club) {
        ClubTableEntryDto clubTableEntry = new ClubTableEntryDto();
        clubTableEntry.setClubId(club.getClubId());
        clubTableEntry.setClubName(club.getName());
        return clubTableEntry;
    }

    static class ClubTableEntryComparator implements Comparator<ClubTableEntryDto> {

        @Override
        public int compare(ClubTableEntryDto clubOne, ClubTableEntryDto clubTwo) {
            int comparePoints = Long.valueOf(clubTwo.getPoints()).compareTo(clubOne.getPoints());
            if (comparePoints != 0) {
                return comparePoints;
            }
            int compareGoalDifference = Long.valueOf(clubTwo.getGoalDifference()).compareTo(clubOne.getGoalDifference());
            if (compareGoalDifference != 0) {
                return compareGoalDifference;
            }
            return clubOne.getClubName().compareTo(clubTwo.getClubName());
        }
    }
}
