package ssafy.ddokdi.service;

import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.implementation.bind.MethodDelegationBinder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.ddokdi.entity.JwtBank;
import ssafy.ddokdi.repository.JwtBankRepository;
import ssafy.ddokdi.util.TokenProvider;

import java.util.Random;

@Slf4j
@Service
public class JwtBankServiceImpl implements JwtBankService {
    @Autowired
    private JwtBankRepository jwtBankRepository;
    @Autowired
    private TokenProvider tokenProvider;

    @Override
    @Transactional
    public String saveJwtWithTicket(String jwt) {

        // 해당 유저이메일로 이미 생성된 ticket을 모두 삭제
        jwtBankRepository.deleteAllByEmail(tokenProvider.getUserPk(jwt));


        // 난수 생성
        String ticket = randomGen();

        // 중복검사
        int cnt = 0;
        while (jwtBankRepository.findById(ticket).isPresent()) {
            ticket = randomGen();
            cnt++;
            if (cnt >= 10_000) {
                throw new RuntimeException("Cannot find unused ticket number");
            }
        }

        JwtBank jwtBank = JwtBank.builder()
                .ticket(ticket)
                .jwt(jwt)
                .email(tokenProvider.getUserPk(jwt))
                .build();
        jwtBankRepository.save(jwtBank);

        return ticket;


    }

    public static String randomGen() {
        StringBuffer random = new StringBuffer();
        Random rnd = new Random();
        for (int i = 0; i < 4; i++) {
            random.append((rnd.nextInt(10)));
        }
        return random.toString();
    }
}
