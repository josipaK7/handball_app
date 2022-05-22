package hr.fer.zr.handballapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "coach_role")
public class CoachRole {

    @Id
    @Column(name = "coach_role_id")
    private Long coachRoleId;

    private String name;

    public CoachRole() {

    }

    public CoachRole(Long coachRoleId, String name) {
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
