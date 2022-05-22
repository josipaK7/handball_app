package hr.fer.zr.handballapp.dto;

public class CoachRoleDto {
    private Long coachRoleId;
    private String name;

    public CoachRoleDto() {

    }

    public CoachRoleDto(Long coachRoleId, String name) {
        super();
        this.coachRoleId = coachRoleId;
        this.name = name;
    }

    public Long getCoachRoleId() {
        return coachRoleId;
    }

    public void setCoachRoleId(Long coachRoleId) {
        this.coachRoleId = coachRoleId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
