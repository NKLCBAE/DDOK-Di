package ssafy.ddokdi.dto;


import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginDto {
    @Email(message = "email format not satisfied")
    @NotEmpty
    private String email;
    @Size(min=3, max=128, message = "password size error : 3 ~ 128")
    @NotEmpty
    private String password;

}
