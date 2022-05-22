package hr.fer.zr.handballapp.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "player_match_performance")
public class PlayerMatchPerformance {

    @EmbeddedId
    private PlayerMatchPerformanceKey id = new PlayerMatchPerformanceKey();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id", nullable = false, insertable = false, updatable = false)
    @MapsId("matchId")
    private Match match;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false, insertable = false, updatable = false)
    @MapsId("playerId")
    private Player player;

    @Column(name = "goals")
    private Long goals;

    @Column(name = "assists")
    private Long assists;

    @Column(name = "suspensions")
    private Long suspensions;

    @Column(name = "defenses")
    private Long defenses;

    @Column(name = "turnovers")
    private Long turnovers;

    @Column(name = "stolen")
    private Long stolen;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    public PlayerMatchPerformance() {

    }

    public PlayerMatchPerformance(PlayerMatchPerformanceKey id, Match match, Player player, Long goals, Long assists, Long suspensions, Long defenses, Long turnovers, Long stolen, Club club) {
        super();
        this.id = id;
        this.match = match;
        this.player = player;
        this.goals = goals;
        this.assists = assists;
        this.suspensions = suspensions;
        this.defenses = defenses;
        this.turnovers = turnovers;
        this.stolen = stolen;
        this.club = club;
    }

    public PlayerMatchPerformanceKey getId() {
        return id;
    }

    public void setId(PlayerMatchPerformanceKey id) {
        this.id = id;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Long getGoals() {
        return goals;
    }

    public void setGoals(Long goals) {
        this.goals = goals;
    }

    public Long getAssists() {
        return assists;
    }

    public void setAssists(Long assists) {
        this.assists = assists;
    }

    public Long getSuspensions() {
        return suspensions;
    }

    public void setSuspensions(Long suspensions) {
        this.suspensions = suspensions;
    }

    public Long getDefenses() {
        return defenses;
    }

    public void setDefenses(Long defenses) {
        this.defenses = defenses;
    }

    public Long getTurnovers() {
        return turnovers;
    }

    public void setTurnovers(Long turnovers) {
        this.turnovers = turnovers;
    }

    public Long getStolen() {
        return stolen;
    }

    public void setStolen(Long stolen) {
        this.stolen = stolen;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlayerMatchPerformance that = (PlayerMatchPerformance) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getMatch(), that.getMatch()) && Objects.equals(getPlayer(), that.getPlayer()) && Objects.equals(getGoals(), that.getGoals()) && Objects.equals(getAssists(), that.getAssists()) && Objects.equals(getSuspensions(), that.getSuspensions()) && Objects.equals(getDefenses(), that.getDefenses()) && Objects.equals(getTurnovers(), that.getTurnovers()) && Objects.equals(getStolen(), that.getStolen()) && Objects.equals(getClub(), that.getClub());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getMatch(), getPlayer(), getGoals(), getAssists(), getSuspensions(), getDefenses(), getTurnovers(), getStolen(), getClub());
    }

}
