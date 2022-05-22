package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.RefereeDto;
import hr.fer.zr.handballapp.model.Referee;
import org.springframework.stereotype.Component;

@Component
public class RefereeMapper implements DefaultMapper<Referee, RefereeDto> {

    @Override
    public RefereeDto map(Referee referee) {
        return new RefereeDto(referee.getRefereeId(),
                referee.getFirstName(),
                referee.getLastName(),
                referee.getOriginCoutry(),
                referee.getActiveFromDate());
    }
}
