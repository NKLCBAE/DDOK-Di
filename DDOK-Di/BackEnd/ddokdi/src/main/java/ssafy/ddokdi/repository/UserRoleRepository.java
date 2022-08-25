package ssafy.ddokdi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ddokdi.entity.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
}
