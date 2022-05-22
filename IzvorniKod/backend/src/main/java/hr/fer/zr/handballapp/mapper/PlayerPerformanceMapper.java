package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.PlayerPerformanceDto;
import hr.fer.zr.handballapp.model.PlayerMatchPerformance;
import org.springframework.stereotype.Component;

@Component
public class PlayerPerformanceMapper implements DefaultMapper<PlayerMatchPerformance, PlayerPerformanceDto> {
    private final PlayerNameMapper playerMapper;

    public PlayerPerformanceMapper(PlayerNameMapper playerMapper) {
        this.playerMapper = playerMapper;
    }

    @Override
    public PlayerPerformanceDto map(PlayerMatchPerformance playerPerformance) {
        return new PlayerPerformanceDto(
                playerMapper.map(playerPerformance.getPlayer()),
                playerPerformance.getGoals(),
                playerPerformance.getAssists(),
                playerPerformance.getSuspensions(),
                playerPerformance.getDefenses(),
                playerPerformance.getTurnovers(),
                playerPerformance.getStolen());
    }
}
