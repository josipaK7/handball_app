package hr.fer.zr.handballapp.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "match")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "match_id_generator")
    @SequenceGenerator(name = "match_id_generator", sequenceName = "match_id_seq", allocationSize = 1)
    @Column(name = "match_id")
    private Long matchId;

    @ManyToOne
    @JoinColumn(nullable = false, name = "club_one_id")
    private Club clubOne;

    @ManyToOne
    @JoinColumn(nullable = false, name = "club_two_id")
    private Club clubTwo;

    @ManyToOne
    @JoinColumn(nullable = false, name = "competition_id")
    private Competition competition;
    @Column(name = "club_one_goals")
    private Long clubOneGoals;
    @Column(name = "club_two_goals")
    private Long clubTwoGoals;
    @Column(name = "date_played")
    private Date datePlayed;

    @ManyToMany
    @JoinTable(
            name = "match_referee",
            joinColumns = @JoinColumn(name = "match_id"),
            inverseJoinColumns = @JoinColumn(name = "referee_id")
    )
    List<Referee> matchReferees;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL)
    List<PlayerMatchPerformance> playerMatchPerformanceListClub = new ArrayList<>();

    public Match() {

    }

    public Match(Long matchId, Club clubOne, Club clubTwo, Competition competition, Long clubOneGoals, Long clubTwoGoals, Date datePlayed, List<Referee> matchReferees, List<PlayerMatchPerformance> playerMatchPerformanceListClub) {
        super();
        this.matchId = matchId;
        this.clubOne = clubOne;
        this.clubTwo = clubTwo;
        this.competition = competition;
        this.clubOneGoals = clubOneGoals;
        this.clubTwoGoals = clubTwoGoals;
        this.datePlayed = datePlayed;
        this.matchReferees = matchReferees;
        this.playerMatchPerformanceListClub = playerMatchPerformanceListClub;
    }

    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public Club getClubOne() {
        return clubOne;
    }

    public void setClubOne(Club clubOne) {
        this.clubOne = clubOne;
    }

    public Club getClubTwo() {
        return clubTwo;
    }

    public void setClubTwo(Club clubTwo) {
        this.clubTwo = clubTwo;
    }

    public Competition getCompetition() {
        return competition;
    }

    public void setCompetition(Competition competition) {
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

    public List<Referee> getMatchReferees() {
        return matchReferees;
    }

    public void setMatchReferees(List<Referee> matchReferees) {
        this.matchReferees = matchReferees;
    }

    public List<PlayerMatchPerformance> getPlayerMatchPerformanceListClub() {
        return playerMatchPerformanceListClub;
    }

    public void setPlayerMatchPerformanceListClub(List<PlayerMatchPerformance> playerMatchPerformanceListClubOne) {
        this.playerMatchPerformanceListClub = playerMatchPerformanceListClubOne;
    }
}

