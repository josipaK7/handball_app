package hr.fer.zr.handballapp.dto;

public class PlayerSelectDto {
    private Long playerId;
    private String firstName;
    private String lastName;

    public PlayerSelectDto() {

    }

    public PlayerSelectDto(Long playerId, String firstName, String lastName) {
        super();
        this.playerId = playerId;
        this.firstName = firstName;
        this.lastName = lastName;
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
}
