package hr.fer.zr.handballapp.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "referee")
public class Referee {

    @ManyToMany(mappedBy = "matchReferees")
    List<Match> matches;
    @Id
    @Column(name = "referee_id")
    private Long refereeId;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "origin_country")
    private String originCoutry;
    @Column(name = "active_from_date")
    private Date activeFromDate;

    public Referee() {
    }

    public Referee(Long refereeId, String firstName, String lastName, String originCoutry, Date activeFromDate) {
        super();
        this.refereeId = refereeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.originCoutry = originCoutry;
        this.activeFromDate = activeFromDate;
    }

    public Long getRefereeId() {
        return refereeId;
    }

    public void setRefereeId(Long refereeId) {
        this.refereeId = refereeId;
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

    public String getOriginCoutry() {
        return originCoutry;
    }

    public void setOriginCoutry(String originCoutry) {
        this.originCoutry = originCoutry;
    }

    public Date getActiveFromDate() {
        return activeFromDate;
    }

    public void setActiveFromDate(Date activeFromDate) {
        this.activeFromDate = activeFromDate;
    }
}
