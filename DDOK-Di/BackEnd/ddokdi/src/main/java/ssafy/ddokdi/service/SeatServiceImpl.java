package ssafy.ddokdi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.ddokdi.dto.SeatDto;
import ssafy.ddokdi.dto.SeatWithUserDto;
import ssafy.ddokdi.dto.SeatWithoutUserDto;
import ssafy.ddokdi.entity.Area;
import ssafy.ddokdi.entity.Seat;
import ssafy.ddokdi.repository.AreaRepository;
import ssafy.ddokdi.repository.SeatRepository;

import java.util.*;

@Service
public class SeatServiceImpl implements SeatService{

    @Autowired
    public SeatRepository seatRepository;
    @Autowired
    public AreaRepository areaRepository;

    @Override
    @Transactional
    public List<SeatDto> getSeatAllByArea(String area) throws NoSuchElementException {
        Optional<Area> opArea = areaRepository.findByZone(area);
        if(opArea.isEmpty()){
            throw new NoSuchElementException("Non-Existent Area");
        }

        List<Seat> seatList = opArea.get().getSeats();
        if (seatList.isEmpty()) {
            throw new NoSuchElementException();
        } else { // 만일 해당 area에 자리가 등록되어 있으면
            List<SeatDto> seatDtoList = new ArrayList<>();
            for( Seat seat : seatList){
                SeatDto seatDto = seatDtoBuilder(seat);
                seatDtoList.add(seatDto);
            }
            return seatDtoList;
        }
    }


    @Override
    @Transactional
    public SeatDto findBySeatNumberAndArea(String area, Long seatNumber) throws NoSuchElementException {
        Optional<Area> opArea = areaRepository.findByZone(area);
        if(opArea.isEmpty()){
            throw new NoSuchElementException("Non-Existent Area");
        }

        Area realArea = opArea.get();
        Optional<Seat> opSeat = seatRepository.findBySeatNumberAndArea(seatNumber, realArea);
        if(opSeat.isEmpty()){
            throw new NoSuchElementException("Non-Existent Seat");
        }


            Seat seat = opSeat.get();
            SeatDto seatDto = seatDtoBuilder(seat);

            return seatDto;
    }


    @Override
    @Transactional
    public Map<String,String> updateSeat(String area, Long seatNumber, SeatDto seatDto) throws Exception {
        Map<String,String> map = new HashMap<>();
        Optional<Area> opArea = areaRepository.findByZone(area);
        if(opArea.isEmpty()){
            map.put("CODE", "NOT_FOUND");
            map.put("DETAILS","Non-existent zone");
            return map;
        }

        Area realArea = opArea.get();
        Optional<Seat> opSeat = seatRepository.findBySeatNumberAndArea(seatNumber, realArea);
        map.put("CODE", "OK");

        if (opSeat.isPresent()) {
            System.out.println("자리가 이미 존재합니다");
            Seat seat = opSeat.get();
            // 위치(left, top)만 변경
            seat.setArea(realArea);
            seat.setLeftPos(seatDto.getLeftPos());
            seat.setTopPos(seatDto.getTopPos());
            seat.setVertical(seatDto.isVertical());
            seatRepository.save(seat);

            map.put("DETAILS","Seat Number: Area " + area + " seatNumber "+ seatNumber + " has been updated.");

        } else {
            System.out.println("자리를 새로 생성합니다");
            Seat seat = new Seat();
            seat.setFull(false);
            seat.setArea(realArea);
            seat.setSeatNumber(seatNumber);
            seat.setLeftPos(seatDto.getLeftPos());
            seat.setTopPos(seatDto.getTopPos());
            seat.setVertical(seatDto.isVertical());
//                    Seat.builder()
//                    .isFull(false)
//                    .area(realArea)
//                    .seatNumber(seatDto.getSeatNumber())
//                    .leftPos(seatDto.getLeftPos())
//                    .topPos(seatDto.getTopPos())
//                    .isVertical(seatDto.isVertical())
//                    .build();
            seatRepository.save(seat);
            System.out.println("자리를 생성하였습니다");

            map.put("DETAILS","Seat Number: Area " + area + " seatNumber "+ seatNumber + " has been created.");

        }

        return map;

    }

    @Override
    @Transactional
    public Map<String, String> delSeat(String area, Long seatNumber) throws Exception {
        Optional<Area> opArea = areaRepository.findByZone(area);
        Map<String,String> map = new HashMap<>();

        if (opArea.isEmpty()) {
            map.put("CODE", "NOT_FOUND");
            map.put("DETAILS", "There is No Area " + area);
            return map;
        }

        Area realArea = opArea.get();
        seatRepository.deleteBySeatNumberAndArea(seatNumber, realArea);

        map.put("CODE", "DELETED");
        map.put("DETAILS", "Area " + area + " Seat " + seatNumber + " deleted");

        return map;
    }

    private SeatDto seatDtoBuilder(Seat seat) {
        SeatDto seatDto;

        if (seat.getUser() != null) {
            seatDto = SeatWithUserDto.builder()
                    .isFull(seat.isFull())
                    .seatNumber(seat.getSeatNumber())
                    .area(seat.getArea().getZone())
                    .leftPos(seat.getLeftPos())
                    .topPos(seat.getTopPos())
                    .isVertical(seat.isVertical())
                    .user_id(seat.getUser().getId())
                    .user_name(seat.getUser().getName())
                    .user_position(seat.getUser().getPosition())
                    .user_status(seat.getUser().getUserStatus())
                    .user_profileUrl(seat.getUser().getProfileUrl())
                    .build();
        } else {
            seatDto = SeatWithoutUserDto.builder()
                    .isFull(seat.isFull())
                    .seatNumber(seat.getSeatNumber())
                    .area(seat.getArea().getZone())
                    .leftPos(seat.getLeftPos())
                    .topPos(seat.getTopPos())
                    .isVertical(seat.isVertical())
                    .build();
        }
        return seatDto;
    }
}
