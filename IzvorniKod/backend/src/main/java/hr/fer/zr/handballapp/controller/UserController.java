package hr.fer.zr.handballapp.controller;

import hr.fer.zr.handballapp.dto.CurrentUserDto;
import hr.fer.zr.handballapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/current")
    public ResponseEntity<CurrentUserDto> getCurrentUser(Principal principal) {
        CurrentUserDto user = userService.getCurrentUser(principal);
        return ResponseEntity.ok(user);
    }
}
