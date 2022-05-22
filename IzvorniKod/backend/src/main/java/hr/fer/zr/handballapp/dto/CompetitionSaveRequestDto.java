package hr.fer.zr.handballapp.dto;

import java.util.Date;
import java.util.List;

public class CompetitionSaveRequestDto {
    private Long competitionId;
    private String name;
    private String description;
    private Date dateFrom;
    private Date dateTo;
    private byte[] image;
    private List<Long> clubIds;

    public CompetitionSaveRequestDto() {

    }

    public CompetitionSaveRequestDto(String name, String description, Date dateFrom, Date dateTo, byte[] image, List<Long> clubIds) {
        super();
        this.name = name;
        this.description = description;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.image = image;
        this.clubIds = clubIds;
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

    public List<Long> getClubIds() {
        return clubIds;
    }

    public void setClubIds(List<Long> clubIds) {
        this.clubIds = clubIds;
    }

    public Long getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(Long competitionId) {
        this.competitionId = competitionId;
    }
}
