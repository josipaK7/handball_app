package hr.fer.zr.handballapp.dto;

import java.util.List;

public class ClubPlayerDto {
    private Long playerId;
    private String firstName;
    private String lastName;
    private List<PositionDto> positions;

    public ClubPlayerDto() {

    }

    public ClubPlayerDto(Long playerId, String firstName, String lastName, List<PositionDto> positions) {
        super();
        this.playerId = playerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.positions = positions;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
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

    public List<PositionDto> getPositions() {
        return positions;
    }

    public void setPositions(List<PositionDto> positions) {
        this.positions = positions;
    }
}
