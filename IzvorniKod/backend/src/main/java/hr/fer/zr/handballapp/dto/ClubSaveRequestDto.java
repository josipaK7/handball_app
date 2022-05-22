package hr.fer.zr.handballapp.dto;

import java.util.Date;
import java.util.List;

public class ClubSaveRequestDto {
    private Long clubId;
    private String name;
    private String description;
    private byte[] image;
    private String place;
    private Date establishmentDate;
    private List<Long> clubCoaches;
    private List<Long> clubCompetitions;
    private List<Long> clubPlayers;

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

    public List<Long> getClubCoaches() {
        return clubCoaches;
    }

    public void setClubCoaches(List<Long> clubCoaches) {
        this.clubCoaches = clubCoaches;
    }

    public List<Long> getClubCompetitions() {
        return clubCompetitions;
    }

    public void setClubCompetitions(List<Long> clubCompetitions) {
        this.clubCompetitions = clubCompetitions;
    }

    public List<Long> getClubPlayers() {
        return clubPlayers;
    }

    public void setClubPlayers(List<Long> clubPlayers) {
        this.clubPlayers = clubPlayers;
    }
}
