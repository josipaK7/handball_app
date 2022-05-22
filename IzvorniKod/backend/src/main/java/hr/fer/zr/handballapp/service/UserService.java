package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.CurrentUserDto;
import hr.fer.zr.handballapp.dto.UserDto;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Service
public interface UserService {
    Optional<UserDto> getByEmail(String email);
    CurrentUserDto getCurrentUser(Principal principal);
}
