package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.CoachDto;
import hr.fer.zr.handballapp.model.Coach;
import org.springframework.stereotype.Component;

@Component
public class CoachNameMapper implements DefaultMapper<Coach, CoachDto> {
    private final CoachRoleMapper coachRoleMapper;

    public CoachNameMapper(CoachRoleMapper coachRoleMapper) {
        this.coachRoleMapper = coachRoleMapper;
    }

    @Override
    public CoachDto map(Coach coach) {
        CoachDto coachDto = new CoachDto();
        coachDto.setCoachId(coach.getCoachId());
        coachDto.setFirstName(coach.getFirstName());
        coachDto.setLastName(coach.getLastName());
        coachDto.setCoachRole(coachRoleMapper.map(coach.getCoachRole()));
        return coachDto;
    }
}
