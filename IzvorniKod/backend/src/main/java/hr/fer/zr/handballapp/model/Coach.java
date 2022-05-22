package hr.fer.zr.handballapp.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "coach")
public class Coach {

    @Id
    @Column(name = "coach_id")
    private Long coachId;

    @ManyToOne
    @JoinColumn(nullable = true, name = "club_id")
    private Club club;

    @ManyToOne
    @JoinColumn(nullable = false, name = "coach_role_id")
    private CoachRole coachRole;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private byte[] image;

    @Column(name = "origin_country")
    private String originCountry;

    public Coach() {

    }

    public Coach(Long coachId, Club club, CoachRole coachRole, String firstName, String lastName, byte[] image, String originCountry) {
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

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public CoachRole getCoachRole() {
        return coachRole;
    }

    public void setCoachRole(CoachRole coachRole) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Coach coach = (Coach) o;
        return Objects.equals(getCoachId(), coach.getCoachId()) && Objects.equals(getClub(), coach.getClub()) && Objects.equals(getCoachRole(), coach.getCoachRole()) && Objects.equals(getFirstName(), coach.getFirstName()) && Objects.equals(getLastName(), coach.getLastName()) && Objects.equals(getImage(), coach.getImage()) && Objects.equals(getOriginCountry(), coach.getOriginCountry());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCoachId());
    }
}
