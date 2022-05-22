package hr.fer.zr.handballapp.security;

import hr.fer.zr.handballapp.dto.UserDto;
import hr.fer.zr.handballapp.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
    private final UserService userService;

    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LOGGER.info("LOGIN FOR " + username);
        Optional<UserDto> optionalUser = userService.getByEmail(username);
        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("Username not found");
        }
        final UserDto user = optionalUser.get();

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), user.getPassword(), AuthorityUtils.commaSeparatedStringToAuthorityList("ADMIN"));
    }
}
