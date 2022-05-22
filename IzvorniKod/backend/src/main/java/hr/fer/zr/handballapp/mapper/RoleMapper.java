package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.RoleDto;
import hr.fer.zr.handballapp.model.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper implements DefaultMapper<Role, RoleDto> {

    @Override
    public RoleDto map(Role role) {
        RoleDto roleDto = new RoleDto();
        roleDto.setRoleId(role.getRoleId());
        roleDto.setRoleName(role.getRoleName());
        return roleDto;
    }
}
