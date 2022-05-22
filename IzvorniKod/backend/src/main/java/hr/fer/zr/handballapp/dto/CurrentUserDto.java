package hr.fer.zr.handballapp.dto;

public class CurrentUserDto {

    private UserDto user;

    public CurrentUserDto(UserDto user) {
        this.user = user;
    }

    public CurrentUserDto() {
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}
