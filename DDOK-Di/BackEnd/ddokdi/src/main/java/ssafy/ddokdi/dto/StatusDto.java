package ssafy.ddokdi.dto;

import lombok.*;
import ssafy.ddokdi.entity.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusDto {

    private String status;
    private Long seatId;
    private String area;
    private Long seatNumber;

    public StatusDto(User user) {
        this.status = user.getUserStatus().name();
        this.seatId = user.getSeat().getId();
        this.area = user.getSeat().getArea().getZone();
        this.seatNumber = user.getSeat().getSeatNumber();
    }
}
