package hr.fer.zr.handballapp.dto;

public class UserDto {
    private Long id;
    private String email;
    private String password;
    private RoleDto role;
    private boolean isAdmin;

    public UserDto() {

    }

    public UserDto(Long id, String email, String password, RoleDto role, boolean isAdmin) {
        super();
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isAdmin = isAdmin;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleDto getRole() {
        return role;
    }

    public void setRole(RoleDto role) {
        this.role = role;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
