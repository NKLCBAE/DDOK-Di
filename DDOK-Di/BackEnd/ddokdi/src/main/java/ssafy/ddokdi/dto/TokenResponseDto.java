package ssafy.ddokdi.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class TokenResponseDto {

    private String jwt;
    private String ticket;
    private Long userId;
    private String name;
    private String position;

}
