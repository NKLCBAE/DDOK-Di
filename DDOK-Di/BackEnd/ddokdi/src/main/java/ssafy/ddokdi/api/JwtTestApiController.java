package ssafy.ddokdi.api;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import ssafy.ddokdi.dto.SignUpDto;
import ssafy.ddokdi.repository.UserRepository;
import ssafy.ddokdi.service.AuthService;
import ssafy.ddokdi.service.UserService;
import ssafy.ddokdi.util.TokenProvider;

import java.util.Optional;

@RestController
public class JwtTestApiController {

    @Autowired
    private UserService userService;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    //////////////////////////////////////////////////////////////////////
    ////////////////// 회원가입, 로그인 테스트////////////////////////////////
    // 회원가입/////
    @ApiOperation(

            value = "회원 가입 테스트"
            , notes = "회원정보를 DB에 저장한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "user"
                            , value = "회원 가입 정보")
            })
    @PostMapping("/test/signup")
    public ResponseEntity<String> signupTest(@RequestBody SignUpDto user) throws Exception{
        userService.addUser(user);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
    }
    

    // 인증 테스트 용
    @ApiOperation(
            value = "인증 테스트 용"
            , notes = "인증 테스트 용")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "Authorization"
                            , value = "jwt 토큰")
            })
    @PostMapping("/test/do")
    public ResponseEntity<String> doSomething(@RequestHeader(value="Authorization") String token) throws Exception{

        return new ResponseEntity<String>("jwt success", HttpStatus.OK);
    }


}
