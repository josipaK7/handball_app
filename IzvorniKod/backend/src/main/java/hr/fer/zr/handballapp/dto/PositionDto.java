package hr.fer.zr.handballapp.dto;

public class PositionDto {
    private Long positionId;
    private String name;

    public PositionDto() {

    }

    public PositionDto(Long positionId, String name) {
        super();
        this.positionId = positionId;
        this.name = name;
    }

    public Long getPositionId() {
        return positionId;
    }

    public void setPositionId(Long positionId) {
        this.positionId = positionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
