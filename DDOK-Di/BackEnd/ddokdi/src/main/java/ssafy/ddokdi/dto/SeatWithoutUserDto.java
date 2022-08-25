package ssafy.ddokdi.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ssafy.ddokdi.entity.Seat;

@Getter
@Setter
@SuperBuilder
public class SeatWithoutUserDto extends SeatDto {

    public SeatWithoutUserDto(Seat seat) {
        super(seat.isFull(), seat.getArea().getZone(), seat.getSeatNumber(), seat.getLeftPos(), seat.getTopPos(), seat.isVertical());
    }
}
