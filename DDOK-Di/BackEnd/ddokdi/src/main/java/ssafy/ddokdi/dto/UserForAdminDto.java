package ssafy.ddokdi.dto;


import lombok.*;
//import ssafy.ddokdi.entity.User;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserForAdminDto {
    private Long id;
    private String email;
    private String name;
    private Long height;
    private String phoneNumber;
    private String position;
    private String userStatus;
    private String userRole;
//
//    public UserForAdminDto(User user) {
//        this.id = user.getId();
//        this.email = user.getEmail();
//        this.name = user.getName();
//        this.height = user.getHeight();
//        this.phoneNumber = user.getPhoneNumber();
//        this.position = user.getPosition();
//        this.userStatus = user.getUserStatus().name();
//        this.userRole = user.getUserRole().name();
//    }
}
