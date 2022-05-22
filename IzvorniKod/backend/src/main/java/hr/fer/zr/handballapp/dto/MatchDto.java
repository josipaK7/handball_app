package hr.fer.zr.handballapp.dto;

import java.util.Date;
import java.util.List;

public class MatchDto {
    public Long matchId;
    public ClubDto clubOne;
    public ClubDto clubTwo;
    public CompetitionDto competition;
    public Long clubOneGoals;
    public Long clubTwoGoals;
    public Date datePlayed;
    public List<RefereeDto> matchReferees;
    public List<PlayerPerformanceDto> clubOnePlayerMatchPerformance;
    public List<PlayerPerformanceDto> clubTwoPlayerMatchPerformance;

    public MatchDto() {

    }

    public MatchDto(Long matchId, ClubDto clubOne, ClubDto clubTwo, CompetitionDto competition, Long clubOneGoals, Long clubTwoGoals, Date datePlayed) {
        super();
        this.matchId = matchId;
        this.clubOne = clubOne;
        this.clubTwo = clubTwo;
        this.competition = competition;
        this.clubOneGoals = clubOneGoals;
        this.clubTwoGoals = clubTwoGoals;
        this.datePlayed = datePlayed;
    }

    public MatchDto(Long matchId, ClubDto clubOne, ClubDto clubTwo, CompetitionDto competition, Long clubOneGoals, Long clubTwoGoals, Date datePlayed, List<RefereeDto> matchReferees) {
        super();
        this.matchId = matchId;
        this.clubOne = clubOne;
        this.clubTwo = clubTwo;
        this.competition = competition;
        this.clubOneGoals = clubOneGoals;
        this.clubTwoGoals = clubTwoGoals;
        this.datePlayed = datePlayed;
        this.matchReferees = matchReferees;
    }

    public MatchDto(Long matchId, ClubDto clubOne, ClubDto clubTwo, CompetitionDto competition, Long clubOneGoals, Long clubTwoGoals, Date datePlayed, List<RefereeDto> matchReferees, List<PlayerPerformanceDto> clubOnePlayerMatchPerformance, List<PlayerPerformanceDto> clubTwoPlayerMatchPerformance) {
        super();
        this.matchId = matchId;
        this.clubOne = clubOne;
        this.clubTwo = clubTwo;
        this.competition = competition;
        this.clubOneGoals = clubOneGoals;
        this.clubTwoGoals = clubTwoGoals;
        this.datePlayed = datePlayed;
        this.matchReferees = matchReferees;
        this.clubOnePlayerMatchPerformance = clubOnePlayerMatchPerformance;
        this.clubTwoPlayerMatchPerformance = clubTwoPlayerMatchPerformance;
    }

    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public ClubDto getClubOne() {
        return clubOne;
    }

    public void setClubOne(ClubDto clubOne) {
        this.clubOne = clubOne;
    }

    public ClubDto getClubTwo() {
        return clubTwo;
    }

    public void setClubTwo(ClubDto clubTwo) {
        this.clubTwo = clubTwo;
    }

    public CompetitionDto getCompetition() {
        return competition;
    }

    public void setCompetition(CompetitionDto competition) {
        this.competition = competition;
    }

    public Long getClubOneGoals() {
        return clubOneGoals;
    }

    public void setClubOneGoals(Long clubOneGoals) {
        this.clubOneGoals = clubOneGoals;
    }

    public Long getClubTwoGoals() {
        return clubTwoGoals;
    }

    public void setClubTwoGoals(Long clubTwoGoals) {
        this.clubTwoGoals = clubTwoGoals;
    }

    public Date getDatePlayed() {
        return datePlayed;
    }

    public void setDatePlayed(Date datePlayed) {
        this.datePlayed = datePlayed;
    }

    public List<RefereeDto> getMatchReferees() {
        return matchReferees;
    }

    public void setMatchReferees(List<RefereeDto> matchReferees) {
        this.matchReferees = matchReferees;
    }

    public List<PlayerPerformanceDto> getClubOnePlayerMatchPerformance() {
        return clubOnePlayerMatchPerformance;
    }

    public void setClubOnePlayerMatchPerformance(List<PlayerPerformanceDto> clubOnePlayerMatchPerformance) {
        this.clubOnePlayerMatchPerformance = clubOnePlayerMatchPerformance;
    }

    public List<PlayerPerformanceDto> getClubTwoPlayerMatchPerformance() {
        return clubTwoPlayerMatchPerformance;
    }

    public void setClubTwoPlayerMatchPerformance(List<PlayerPerformanceDto> clubTwoPlayerMatchPerformance) {
        this.clubTwoPlayerMatchPerformance = clubTwoPlayerMatchPerformance;
    }
}
