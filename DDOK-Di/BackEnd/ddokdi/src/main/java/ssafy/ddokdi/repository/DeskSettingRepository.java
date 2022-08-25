package ssafy.ddokdi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ddokdi.entity.DeskSetting;
import ssafy.ddokdi.entity.User;

import java.util.Optional;

public interface DeskSettingRepository extends JpaRepository<DeskSetting, Long> {
    Optional<DeskSetting> findByUserAndDeskIndex(User user, Long deskIndex);
}
