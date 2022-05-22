package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.UserDto;
import hr.fer.zr.handballapp.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements DefaultMapper<User, UserDto> {
    private final RoleMapper roleMapper;

    public UserMapper(RoleMapper roleMapper) {
        this.roleMapper = roleMapper;
    }

    @Override
    public UserDto map(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setRole(roleMapper.map(user.getRole()));
        userDto.setAdmin("ADMIN".equals(user.getRole().getRoleName()));
        return userDto;
    }
}
