package hr.fer.zr.handballapp.dto;

import java.util.Date;

public class RefereeDto {
    private Long refereeId;
    private String firstName;
    private String lastName;
    private String originCountry;
    private Date activeFromDate;

    public RefereeDto() {

    }

    public RefereeDto(Long refereeId, String firstName, String lastName, String originCountry, Date activeFromDate) {
        super();
        this.refereeId = refereeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.originCountry = originCountry;
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

    public String getOriginCountry() {
        return originCountry;
    }

    public void setOriginCountry(String originCountry) {
        this.originCountry = originCountry;
    }

    public Date getActiveFromDate() {
        return activeFromDate;
    }

    public void setActiveFromDate(Date activeFromDate) {
        this.activeFromDate = activeFromDate;
    }
}
