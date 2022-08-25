package ssafy.ddokdi.service;

import ssafy.ddokdi.dto.SeatDto;

import java.util.List;
import java.util.Map;

public interface SeatService {

    public List<SeatDto> getSeatAllByArea(String area) throws Exception;
    public Map<String,String> updateSeat(String area, Long seatId, SeatDto seatDto) throws Exception;
    public Map<String, String> delSeat(String area, Long seatId) throws Exception;
    SeatDto findBySeatNumberAndArea(String area, Long seatNumber) throws Exception;
}
