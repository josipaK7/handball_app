package hr.fer.zr.handballapp.model;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "club")
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "club_id_generator")
    @SequenceGenerator(name = "club_id_generator", sequenceName = "club_id_seq", allocationSize = 1)
    @Column(name = "club_id")
    private Long clubId;

    private String name;

    private String description;

    private byte[] image;

    private String place;

    @Column(name = "establishment_date")
    private Date establishmentDate;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "club")
    private List<Coach> clubCoaches;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "club_competition",
            joinColumns = @JoinColumn(name = "club_id"),
            inverseJoinColumns = @JoinColumn(name = "competition_id")
    )
    private Set<Competition> clubCompetitions;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "club")
    private List<Player> clubPlayers;

    public Club() {

    }

    public Club(Long clubId, String name, String description, byte[] image, String place, Date establishmentDate,
                List<Coach> clubCoaches, Set<Competition> clubCompetitions, List<Player> clubPlayers) {
        this.clubId = clubId;
        this.name = name;
        this.description = description;
        this.image = image;
        this.place = place;
        this.establishmentDate = establishmentDate;
        this.clubCoaches = clubCoaches;
        this.clubCompetitions = clubCompetitions;
        this.clubPlayers = clubPlayers;
    }

    public void addCompetition(Competition competition) {
        if (clubCompetitions == null) {
            clubCompetitions = new HashSet<>();
        }
        clubCompetitions.add(competition);
    }

    public void removeCompetition(Competition competition) {
        if (clubCompetitions != null) {
            clubCompetitions.remove(competition);
        }
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Date getEstablishmentDate() {
        return establishmentDate;
    }

    public void setEstablishmentDate(Date establishmentDate) {
        this.establishmentDate = establishmentDate;
    }

    public List<Coach> getClubCoaches() {
        return clubCoaches;
    }

    public void setClubCoaches(List<Coach> clubCoaches) {
        this.clubCoaches = clubCoaches;
    }

    public Set<Competition> getClubCompetitions() {
        return clubCompetitions;
    }

    public void setClubCompetitions(Set<Competition> clubCompetitions) {
        this.clubCompetitions = clubCompetitions;
    }

    public List<Player> getClubPlayers() {
        return clubPlayers;
    }

    public void setClubPlayers(List<Player> clubPlayers) {
        this.clubPlayers = clubPlayers;
    }
}
