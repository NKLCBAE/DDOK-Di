package ssafy.ddokdi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ddokdi.entity.Calendar;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
}
