package ssafy.ddokdi.dto;

import lombok.*;
import ssafy.ddokdi.entity.User;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpDto {
    @Email(message = "email format not satisfied")
    @NotEmpty
    private String email;
    @Size(min=3, max=128, message = "password size error : 3 ~ 128")
    @NotEmpty
    private String password;
    private String name;
    private Long height;
    private String phoneNumber;
    private String position;
    private Long employeeNumber;

    public SignUpDto(User user) {
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.name = user.getName();
        this.height = user.getHeight();
        this.phoneNumber = user.getPhoneNumber();
        this.position = user.getPosition();
        this.employeeNumber = user.getEmployeeNumber();
    }
}