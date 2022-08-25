package ssafy.ddokdi.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ssafy.ddokdi.enums.RoleEnum;

@Getter
@Setter
@SuperBuilder
public class TokenResponseOfAdminDto extends TokenResponseDto {

    private String userRole;

}