package hr.fer.zr.handballapp.dto;

public class CompetitionSelectDto {
    private Long competitionId;
    private String name;

    public CompetitionSelectDto() {

    }

    public CompetitionSelectDto(Long competitionId, String name) {
        super();
        this.competitionId = competitionId;
        this.name = name;
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

}
