package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.PositionDto;
import hr.fer.zr.handballapp.model.Position;
import org.springframework.stereotype.Component;

@Component
public class PositionMapper implements DefaultMapper<Position, PositionDto> {

    @Override
    public PositionDto map(Position position) {
        PositionDto positionDto = new PositionDto();
        positionDto.setPositionId(position.getPositionId());
        positionDto.setName(position.getName());
        return positionDto;
    }
}