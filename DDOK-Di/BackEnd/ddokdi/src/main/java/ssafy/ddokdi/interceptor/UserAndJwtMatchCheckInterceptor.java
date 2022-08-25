package ssafy.ddokdi.interceptor;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import ssafy.ddokdi.entity.User;
import ssafy.ddokdi.exception.UserAndJwtMismatchException;
import ssafy.ddokdi.repository.UserRepository;
import ssafy.ddokdi.util.TokenProvider;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
public class UserAndJwtMatchCheckInterceptor implements HandlerInterceptor {

    @Value("${jwt.secret}")
    private String secret;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenProvider tokenProvider;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // JWT 검증을 수행하는 Interceptor에 Request의 Method가 preFlight 용 OPTIONS일 경우, 검증을 수행하지 않는다.
        // Cors 에러 방지용
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }

        log.info("@@ UserAndJwtMatchCheckInterceptor catch request @@");
        String jwt = request.getHeader("Authorization");

        String jwtEmail = tokenProvider.getUserPk(jwt);

        Map<String, String> pathVariables = (Map<String, String>) request
                .getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        Long userId = Long.valueOf(pathVariables.get("userId"));

        Optional<User> opUser = userRepository.findById(userId);
        if(opUser.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User");
        }
        User user = opUser.get();
        String userEmail = user.getEmail();

        if(!jwtEmail.equals(userEmail)){
            throw new UserAndJwtMismatchException("userId and Jwt information are not matched");
        }

        return true;
    }


}
