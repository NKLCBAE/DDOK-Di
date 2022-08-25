package ssafy.ddokdi.dto;

import lombok.*;


// 수정중
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserModifyDto {
    private Long id;
    private String email;
    private String name;
    private Long height;
    private String phoneNumber;
    private String position;
    private Long employeeNumber;
    private String userStatus;
}

