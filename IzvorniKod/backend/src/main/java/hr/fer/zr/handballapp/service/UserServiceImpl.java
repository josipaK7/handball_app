package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.CurrentUserDto;
import hr.fer.zr.handballapp.dto.UserDto;
import hr.fer.zr.handballapp.exceptions.ResourceNotFoundException;
import hr.fer.zr.handballapp.mapper.UserMapper;
import hr.fer.zr.handballapp.model.User;
import hr.fer.zr.handballapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.security.Principal;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public Optional<UserDto> getByEmail(String email) {
        Optional<User> user = this.userRepository.findUserByEmail(email);
        if (user.isPresent()) {
            return Optional.of(this.userMapper.map(user.get()));
        }
        return Optional.empty();
    }

    @Override
    public CurrentUserDto getCurrentUser(Principal principal) {
        try {
            if (principal != null) {
                LOGGER.info("Principal set.");
                Optional<UserDto> userDto = getByEmail(principal.getName());
                userDto.ifPresent((user) -> LOGGER.info("Principal with email exists."));
                if (userDto.isPresent()) {
                    return new CurrentUserDto(userDto.get());
                } else {
                    throw new ResourceNotFoundException("Ne postoji user " + principal.getName());
                }
            }
            LOGGER.info("Principal null.");
            return new CurrentUserDto();
        } catch (Exception e) {
            throw new ResourceAccessException("Dogodila se pogreška prilikom dohvata.");
        }
    }
}
