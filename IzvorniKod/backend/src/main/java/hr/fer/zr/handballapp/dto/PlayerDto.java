package hr.fer.zr.handballapp.dto;

import java.util.Date;
import java.util.List;

public class PlayerDto {
    private Long playerId;
    private ClubDto club;
    private String firstName;
    private String lastName;
    private byte[] image;
    private Date dateOfBirth;
    private Long height;
    private Long weight;
    private String preferredHand;
    private String originCountry;
    private List<PositionDto> positions;

    public PlayerDto() {

    }

    public PlayerDto(Long playerId, ClubDto club, String firstName, String lastName, byte[] image, Date dateOfBirth, Long height, Long weight, String preferredHand, String originCountry, List<PositionDto> positions) {
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
        this.positions = positions;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public ClubDto getClub() {
        return club;
    }

    public void setClub(ClubDto club) {
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

    public List<PositionDto> getPositions() {
        return positions;
    }

    public void setPositions(List<PositionDto> positions) {
        this.positions = positions;
    }
}
