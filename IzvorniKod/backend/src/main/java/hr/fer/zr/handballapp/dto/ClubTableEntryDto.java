package hr.fer.zr.handballapp.dto;

public class ClubTableEntryDto {
    private long clubId;
    private String clubName;
    private long victories;
    private long defeats;
    private long draws;
    private long concededGoals;
    private long scoredGoals;
    private long matchesPlayed;
    private long points;

    public ClubTableEntryDto() {

    }

    public ClubTableEntryDto(long clubId, String clubName, long victories, long defeats, long draws, long concededGoals, long scoredGoals, long matchesPlayed, long points) {
        super();
        this.clubId = clubId;
        this.clubName = clubName;
        this.victories = victories;
        this.defeats = defeats;
        this.draws = draws;
        this.concededGoals = concededGoals;
        this.scoredGoals = scoredGoals;
        this.matchesPlayed = matchesPlayed;
        this.points = points;
    }

    public long getClubId() {
        return clubId;
    }

    public void setClubId(long clubId) {
        this.clubId = clubId;
    }

    public String getClubName() {
        return clubName;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }

    public long getVictories() {
        return victories;
    }

    public void setVictories(long victories) {
        this.victories = victories;
    }

    public long getDefeats() {
        return defeats;
    }

    public void setDefeats(long defeats) {
        this.defeats = defeats;
    }

    public long getDraws() {
        return draws;
    }

    public void setDraws(long draws) {
        this.draws = draws;
    }

    public long getConcededGoals() {
        return concededGoals;
    }

    public void setConcededGoals(long concededGoals) {
        this.concededGoals = concededGoals;
    }

    public long getScoredGoals() {
        return scoredGoals;
    }

    public void setScoredGoals(long scoredGoals) {
        this.scoredGoals = scoredGoals;
    }

    public long getMatchesPlayed() {
        return matchesPlayed;
    }

    public void setMatchesPlayed(long matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }

    public long getPoints() {
        return points;
    }

    public void setPoints(long points) {
        this.points = points;
    }

    public long getGoalDifference() {
        return getScoredGoals() - getConcededGoals();
    }
}
