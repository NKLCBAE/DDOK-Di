package ssafy.ddokdi.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ssafy.ddokdi.entity.Seat;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class SeatDto {

    public boolean isFull;
    // 만약 boolean isFull이면 setter를 만났을 때 롬복이 setFull로 자동으로 번역?해준다 -> Full 정보를 갖게 된다
    // 자리 정보
    public String area;
    public Long seatNumber;
    // 위치 정보
    public Long leftPos;
    public Long topPos;
    // 자리 세로/가로 여부
    public boolean isVertical;


    public SeatDto(Seat seat) {
        this.isFull = seat.isFull();
        this.area = seat.getArea().getZone();
        this.seatNumber = seat.getSeatNumber();
        this.leftPos = seat.getLeftPos();
        this.topPos = seat.getTopPos();
    }
}
