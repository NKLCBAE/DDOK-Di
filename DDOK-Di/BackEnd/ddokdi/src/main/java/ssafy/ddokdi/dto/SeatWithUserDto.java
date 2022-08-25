package ssafy.ddokdi.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ssafy.ddokdi.entity.Seat;
import ssafy.ddokdi.enums.StatusEnum;

@Getter
@Setter
@SuperBuilder
public class SeatWithUserDto extends SeatDto {

    private Long user_id;
    private String user_name;
    private String user_position;
    private StatusEnum user_status;
    private String user_profileUrl;


    public SeatWithUserDto(Seat seat) {
        super(seat.isFull(), seat.getArea().getZone(), seat.getSeatNumber(), seat.getLeftPos(), seat.getTopPos(), seat.isVertical());
        this.user_id = seat.getUser().getId();
        this.user_name = seat.getUser().getName();
        this.user_position = seat.getUser().getPosition();
        this.user_status = seat.getUser().getUserStatus();
        this.user_profileUrl = seat.getUser().getProfileUrl();
    }
}
