package hr.fer.zr.handballapp.dto;

public class CoachDto {
    private Long coachId;
    private ClubDto club;
    private CoachRoleDto coachRole;
    private String firstName;
    private String lastName;
    private byte[] image;
    private String originCountry;

    public CoachDto() {

    }

    public CoachDto(Long coachId, ClubDto club, CoachRoleDto coachRole, String firstName, String lastName, byte[] image, String originCountry) {
        super();
        this.coachId = coachId;
        this.club = club;
        this.coachRole = coachRole;
        this.firstName = firstName;
        this.lastName = lastName;
        this.image = image;
        this.originCountry = originCountry;
    }

    public Long getCoachId() {
        return coachId;
    }

    public void setCoachId(Long coachId) {
        this.coachId = coachId;
    }

    public ClubDto getClub() {
        return club;
    }

    public void setClub(ClubDto club) {
        this.club = club;
    }

    public CoachRoleDto getCoachRole() {
        return coachRole;
    }

    public void setCoachRole(CoachRoleDto coachRole) {
        this.coachRole = coachRole;
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

    public String getOriginCountry() {
        return originCountry;
    }

    public void setOriginCountry(String originCountry) {
        this.originCountry = originCountry;
    }
}
