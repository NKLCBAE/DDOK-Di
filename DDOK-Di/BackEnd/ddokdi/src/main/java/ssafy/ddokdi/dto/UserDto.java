package ssafy.ddokdi.dto;


import lombok.*;
//import ssafy.ddokdi.entity.User;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String email;
//    private String password;
    private String name;
    private Long height;
    private String phoneNumber;
    private String position;
    private Long employeeNumber;
    private String userStatus;
//
//    public UserDto(User user) {
//        this.id = user.getId();
//        this.email = user.getEmail();
//        this.password = user.getPassword();
//        this.name = user.getName();
//        this.height = user.getHeight();
//        this.phoneNumber = user.getPhoneNumber();
//        this.position = user.getPosition();
//        this.employeeNumber = user.getEmployeeNumber();
//        this.userStatus = user.getUserStatus().name();
//    }
}
