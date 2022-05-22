package hr.fer.zr.handballapp.dto;

public class CoachSelectDto {
    private Long coachId;
    private String firstName;
    private String lastName;

    public CoachSelectDto() {

    }

    public CoachSelectDto(Long coachId, String firstName, String lastName) {
        super();
        this.coachId = coachId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Long getCoachId() {
        return coachId;
    }

    public void setCoachId(Long coachId) {
        this.coachId = coachId;
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
}
