package ssafy.ddokdi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ddokdi.dto.SeatDto;
import ssafy.ddokdi.entity.Area;
import ssafy.ddokdi.entity.Seat;
import ssafy.ddokdi.entity.User;

import java.util.List;
import java.util.Optional;

public interface SeatRepository extends JpaRepository<Seat, Long>{


//    List<Seat> findAllByArea(String area);
    Optional<Seat> findBySeatNumber(Long seatNumber);
    void deleteBySeatNumberAndArea(Long seatNumber, Area area);
    Optional<Seat> findBySeatNumberAndArea(Long seatNumber, Area area);
    Optional<Seat> findByUser(User user);


}



