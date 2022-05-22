package hr.fer.zr.handballapp.dto;

import com.sun.istack.Nullable;

import java.util.Date;
import java.util.List;

public class CompetitionDto {
    private Long competitionId;
    private String name;
    private String description;
    private Date dateFrom;
    private Date dateTo;
    private List<ClubDto> clubs;

    @Nullable
    private byte[] image;

    public CompetitionDto() {

    }

    public CompetitionDto(Long competitionId, String name, String description, Date dateFrom, Date dateTo, byte[] image) {
        super();
        this.competitionId = competitionId;
        this.name = name;
        this.description = description;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.image = image;
    }

    public Long getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(Long competitionId) {
        this.competitionId = competitionId;
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

    public Date getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(Date dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Date getDateTo() {
        return dateTo;
    }

    public void setDateTo(Date dateTo) {
        this.dateTo = dateTo;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public List<ClubDto> getClubs() {
        return clubs;
    }

    public void setClubs(List<ClubDto> clubs) {
        this.clubs = clubs;
    }
}
