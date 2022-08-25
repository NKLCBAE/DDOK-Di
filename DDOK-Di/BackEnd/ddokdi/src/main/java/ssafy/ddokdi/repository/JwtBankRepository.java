package ssafy.ddokdi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.ddokdi.entity.JwtBank;

import java.util.Optional;

public interface JwtBankRepository extends JpaRepository<JwtBank,String> {
    void deleteAllByEmail(String email);
    Optional<JwtBank> findByEmail(String email);
}
