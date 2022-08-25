package ssafy.ddokdi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ddokdi.dto.UserForAdminDto;
import ssafy.ddokdi.entity.Area;
import ssafy.ddokdi.entity.DeskSetting;
import ssafy.ddokdi.entity.User;

import java.util.List;
import java.util.Optional;

public interface AreaRepository extends JpaRepository<Area, String> {

    Optional<Area> findByZone(String area);

}
