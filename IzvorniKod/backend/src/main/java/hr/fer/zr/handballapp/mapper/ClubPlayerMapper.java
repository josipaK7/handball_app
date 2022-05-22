package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.ClubPlayerDto;
import hr.fer.zr.handballapp.model.Player;
import org.springframework.stereotype.Component;

@Component
public class ClubPlayerMapper implements DefaultMapper<Player, ClubPlayerDto> {
    private final PositionMapper positionMapper;

    public ClubPlayerMapper(PositionMapper positionMapper) {
        this.positionMapper = positionMapper;
    }

    @Override
    public ClubPlayerDto map(Player player) {
        ClubPlayerDto clubPlayerDto = new ClubPlayerDto();
        clubPlayerDto.setPlayerId(player.getPlayerId());
        clubPlayerDto.setFirstName(player.getFirstName());
        clubPlayerDto.setLastName(player.getLastName());
        clubPlayerDto.setPositions(positionMapper.mapToList(player.getPlayerPositions()));
        return clubPlayerDto;
    }

}
