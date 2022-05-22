package hr.fer.zr.handballapp.dto;

public class PlayerPerformanceDto {
    private PlayerDto player;
    private Long goals;
    private Long assists;
    private Long suspensions;
    private Long defenses;
    private Long turnovers;
    private Long stolen;

    public PlayerPerformanceDto() {

    }

    public PlayerPerformanceDto(PlayerDto player, Long goals, Long assists, Long suspensions, Long defenses, Long turnovers, Long stolen) {
        super();
        this.player = player;
        this.goals = goals;
        this.assists = assists;
        this.suspensions = suspensions;
        this.defenses = defenses;
        this.turnovers = turnovers;
        this.stolen = stolen;
    }

    public PlayerDto getPlayer() {
        return player;
    }

    public void setPlayer(PlayerDto player) {
        this.player = player;
    }

    public Long getGoals() {
        return goals;
    }

    public void setGoals(Long goals) {
        this.goals = goals;
    }

    public Long getAssists() {
        return assists;
    }

    public void setAssists(Long assists) {
        this.assists = assists;
    }

    public Long getSuspensions() {
        return suspensions;
    }

    public void setSuspensions(Long suspensions) {
        this.suspensions = suspensions;
    }

    public Long getDefenses() {
        return defenses;
    }

    public void setDefenses(Long defenses) {
        this.defenses = defenses;
    }

    public Long getTurnovers() {
        return turnovers;
    }

    public void setTurnovers(Long turnovers) {
        this.turnovers = turnovers;
    }

    public Long getStolen() {
        return stolen;
    }

    public void setStolen(Long stolen) {
        this.stolen = stolen;
    }
}
