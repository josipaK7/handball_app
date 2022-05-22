package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.PlayerDto;
import hr.fer.zr.handballapp.model.Player;
import org.springframework.stereotype.Component;

@Component
public class PlayerNameMapper implements DefaultMapper<Player, PlayerDto> {

    @Override
    public PlayerDto map(Player player) {
        PlayerDto playerDto = new PlayerDto();
        playerDto.setPlayerId(player.getPlayerId());
        playerDto.setFirstName(player.getFirstName());
        playerDto.setLastName(player.getLastName());
        return playerDto;
    }
}
