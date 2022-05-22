package hr.fer.zr.handballapp.dto;

import java.util.Date;
import java.util.List;

public class ClubDto {
    private Long clubId;
    private String name;
    private String description;
    private byte[] image;
    private String place;
    private Date establishmentDate;
    private List<CoachDto> clubCoaches;
    private List<CompetitionDto> clubCompetitions;
    private List<ClubPlayerDto> clubPlayers;

    public ClubDto() {

    }

    public ClubDto(Long clubId, String name, String description, byte[] image, String place, Date establishmentDate, List<CoachDto> clubCoaches, List<CompetitionDto> clubCompetitions, List<ClubPlayerDto> clubPlayers) {
        super();
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

    public List<CoachDto> getClubCoaches() {
        return clubCoaches;
    }

    public void setClubCoaches(List<CoachDto> clubCoaches) {
        this.clubCoaches = clubCoaches;
    }

    public List<CompetitionDto> getClubCompetitions() {
        return clubCompetitions;
    }

    public void setClubCompetitions(List<CompetitionDto> clubCompetitions) {
        this.clubCompetitions = clubCompetitions;
    }

    public List<ClubPlayerDto> getClubPlayers() {
        return clubPlayers;
    }

    public void setClubPlayers(List<ClubPlayerDto> clubPlayers) {
        this.clubPlayers = clubPlayers;
    }
}
