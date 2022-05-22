package hr.fer.zr.handballapp.dto;

import java.util.Date;
import java.util.List;

public class ScheduledMatchDto {
    public Long matchId;
    public ClubDto clubOne;
    public ClubDto clubTwo;
    public CompetitionDto competition;
    public Date datePlayed;
    public List<RefereeDto> matchReferees;

    public ScheduledMatchDto() {

    }

    public ScheduledMatchDto(Long matchId, ClubDto clubOne, ClubDto clubTwo, CompetitionDto competition, Date datePlayed, List<RefereeDto> matchReferees) {
        this.matchId = matchId;
        this.clubOne = clubOne;
        this.clubTwo = clubTwo;
        this.competition = competition;
        this.datePlayed = datePlayed;
        this.matchReferees = matchReferees;
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

}
