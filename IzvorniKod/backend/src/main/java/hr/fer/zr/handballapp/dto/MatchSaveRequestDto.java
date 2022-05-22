package hr.fer.zr.handballapp.dto;

import java.util.Date;
import java.util.List;

public class MatchSaveRequestDto {
    private Long matchId;
    private Long competitionId;
    private Long clubOne;
    private Long clubTwo;
    private Long clubOneGoals;
    private Long clubTwoGoals;
    private Date datePlayed;
    private List<Long> matchReferees;
    private List<PlayerPerformanceDto> clubOnePlayerMatchPerformance;
    private List<PlayerPerformanceDto> clubTwoPlayerMatchPerformance;

    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public Long getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(Long competitionId) {
        this.competitionId = competitionId;
    }

    public Long getClubOne() {
        return clubOne;
    }

    public void setClubOne(Long clubOne) {
        this.clubOne = clubOne;
    }

    public Long getClubTwo() {
        return clubTwo;
    }

    public void setClubTwo(Long clubTwo) {
        this.clubTwo = clubTwo;
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

    public List<Long> getMatchReferees() {
        return matchReferees;
    }

    public void setMatchReferees(List<Long> matchReferees) {
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
