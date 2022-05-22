package hr.fer.zr.handballapp.dto;

public class ClubSelectDto {
    private Long clubId;
    private String name;

    public ClubSelectDto() {

    }

    public ClubSelectDto(Long clubId, String name) {
        super();
        this.clubId = clubId;
        this.name = name;
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
}
