package ssafy.ddokdi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ddokdi.entity.UserStatus;

public interface UserStatusRepository extends JpaRepository<UserStatus, Long> {
}
