package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.CoachRoleDto;
import hr.fer.zr.handballapp.model.CoachRole;
import org.springframework.stereotype.Component;

@Component
public class CoachRoleMapper implements DefaultMapper<CoachRole, CoachRoleDto> {

    @Override
    public CoachRoleDto map(CoachRole coachRole) {
        CoachRoleDto coachRoleDto = new CoachRoleDto();
        coachRoleDto.setCoachRoleId(coachRole.getCoachRoleId());
        coachRoleDto.setName(coachRole.getName());
        return coachRoleDto;
    }

}
