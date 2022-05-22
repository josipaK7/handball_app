package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.CoachSelectDto;
import hr.fer.zr.handballapp.model.Coach;
import org.springframework.stereotype.Component;

@Component
public class CoachSelectMapper implements DefaultMapper<Coach, CoachSelectDto> {

    @Override
    public CoachSelectDto map(Coach coach) {
        CoachSelectDto coachSelectDto = new CoachSelectDto();
        coachSelectDto.setCoachId(coach.getCoachId());
        coachSelectDto.setFirstName(coach.getFirstName());
        coachSelectDto.setLastName(coach.getLastName());
        return coachSelectDto;
    }
}
