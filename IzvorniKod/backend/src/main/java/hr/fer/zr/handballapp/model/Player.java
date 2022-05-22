package hr.fer.zr.handballapp.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "player")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "player_id_generator")
    @SequenceGenerator(name = "player_id_generator", sequenceName = "player_id_seq", allocationSize = 1)
    @Column(name = "player_id")
    private Long playerId;

    @ManyToOne
    @JoinColumn(nullable = true, name = "club_id")
    private Club club;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private byte[] image;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    private Long height;

    private Long weight;

    @Column(name = "preferred_hand")
    private String preferredHand;

    @Column(name = "origin_country")
    private String originCountry;

    @ManyToMany
    @JoinTable(
            name = "player_position",
            joinColumns = @JoinColumn(name = "player_id"),
            inverseJoinColumns = @JoinColumn(name = "position_id")
    )
    private List<Position> playerPositions;

    public Player() {

    }

    public Player(Long playerId, Club club, String firstName, String lastName, byte[] image, Date dateOfBirth, Long height, Long weight, String preferredHand, String originCountry, List<Position> playerPositions) {
        super();
        this.playerId = playerId;
        this.club = club;
        this.firstName = firstName;
        this.lastName = lastName;
        this.image = image;
        this.dateOfBirth = dateOfBirth;
        this.height = height;
        this.weight = weight;
        this.preferredHand = preferredHand;
        this.originCountry = originCountry;
        this.playerPositions = playerPositions;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Long getHeight() {
        return height;
    }

    public void setHeight(Long height) {
        this.height = height;
    }

    public Long getWeight() {
        return weight;
    }

    public void setWeight(Long weight) {
        this.weight = weight;
    }

    public String getPreferredHand() {
        return preferredHand;
    }

    public void setPreferredHand(String preferredHand) {
        this.preferredHand = preferredHand;
    }

    public String getOriginCountry() {
        return originCountry;
    }

    public void setOriginCountry(String originCountry) {
        this.originCountry = originCountry;
    }

    public List<Position> getPlayerPositions() {
        return playerPositions;
    }

    public void setPlayerPositions(List<Position> playerPositions) {
        this.playerPositions = playerPositions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Player player = (Player) o;
        return Objects.equals(getPlayerId(), player.getPlayerId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getPlayerId());
    }
}
