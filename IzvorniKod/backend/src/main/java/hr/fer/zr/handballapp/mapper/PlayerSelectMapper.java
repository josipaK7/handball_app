package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.PlayerSelectDto;
import hr.fer.zr.handballapp.model.Player;
import org.springframework.stereotype.Component;

@Component
public class PlayerSelectMapper implements DefaultMapper<Player, PlayerSelectDto> {

    @Override
    public PlayerSelectDto map(Player player) {
        PlayerSelectDto playerSelectDto = new PlayerSelectDto();
        playerSelectDto.setPlayerId(player.getPlayerId());
        playerSelectDto.setFirstName(player.getFirstName());
        playerSelectDto.setLastName(player.getLastName());
        return playerSelectDto;
    }
}
