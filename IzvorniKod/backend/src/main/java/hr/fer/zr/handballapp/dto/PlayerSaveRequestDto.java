package hr.fer.zr.handballapp.dto;

import java.util.Date;
import java.util.List;

public class PlayerSaveRequestDto {
    private Long playerId;
    private Long club;
    private String firstName;
    private String lastName;
    private byte[] image;
    private Date dateOfBirth;
    private Long height;
    private Long weight;
    private String originCountry;
    private List<Long> positions;
    private String preferredHand;

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public Long getClub() {
        return club;
    }

    public void setClub(Long club) {
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

    public String getOriginCountry() {
        return originCountry;
    }

    public void setOriginCountry(String originCountry) {
        this.originCountry = originCountry;
    }

    public List<Long> getPositions() {
        return positions;
    }

    public void setPositions(List<Long> positions) {
        this.positions = positions;
    }

    public String getPreferredHand() {
        return preferredHand;
    }

    public void setPreferredHand(String preferredHand) {
        this.preferredHand = preferredHand;
    }
}
