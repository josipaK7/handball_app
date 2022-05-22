package hr.fer.zr.handballapp.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "competition")
public class Competition {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "competition_id_generator")
    @SequenceGenerator(name = "competition_id_generator", sequenceName = "competition_id_seq", allocationSize = 1)
    @Column(name = "competition_id")
    private Long competitionId;

    private String name;

    private String description;

    @Column(name = "date_from")
    private Date dateFrom;

    @Column(name = "date_to")
    private Date dateTo;

    private byte[] image;

    @ManyToMany(mappedBy = "clubCompetitions")
    private List<Club> clubs;

    public Competition() {

    }

    public Competition(Long competitionId, String name, String description, Date dateFrom, Date dateTo, byte[] image, List<Club> clubs) {
        super();
        this.competitionId = competitionId;
        this.name = name;
        this.description = description;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.image = image;
        this.clubs = clubs;
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

    public List<Club> getClubs() {
        return clubs;
    }

    public void setClubs(List<Club> clubs) {
        this.clubs = clubs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Competition that = (Competition) o;
        return getCompetitionId().equals(that.getCompetitionId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCompetitionId());
    }
}
