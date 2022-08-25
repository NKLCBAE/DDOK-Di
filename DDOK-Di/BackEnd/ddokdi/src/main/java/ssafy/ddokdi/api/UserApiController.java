package ssafy.ddokdi.api;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ssafy.ddokdi.dto.*;
import ssafy.ddokdi.entity.JwtBank;
import ssafy.ddokdi.entity.User;
import ssafy.ddokdi.enums.RoleEnum;
import ssafy.ddokdi.repository.JwtBankRepository;
import ssafy.ddokdi.repository.UserRepository;
import ssafy.ddokdi.service.AuthService;
import ssafy.ddokdi.service.JwtBankService;
import ssafy.ddokdi.service.UserService;

import javax.validation.Valid;
import java.util.Optional;

// 메모
// 1. 로그인 시 상태를 "Online"으로 변화시켜주기.
@Slf4j
@RestController
public class UserApiController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtBankRepository jwtBankRepository;
    @Autowired
    private JwtBankService jwtBankService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // 로그인
    @ApiOperation(
            value = "로그인"
            , notes = "로그인")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "user"
                            , value = "회원 가입 정보")
            })
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto user){
        Optional<User> userEntity = userRepository.findByEmail(user.getEmail());
        if(userEntity.isEmpty()){
            return new ResponseEntity<String>("no user exist", HttpStatus.NOT_FOUND);
        }

        if(!passwordEncoder.matches(user.getPassword(),userEntity.get().getPassword())){
            return new ResponseEntity<String>("wrong password", HttpStatus.NOT_FOUND);
        }

        // jwt 생성
        String jwt = authService.login(user);

        // jwt를 JwtBank에 저장하고 저장한 코드를 발급받음.
        String ticket = jwtBankService.saveJwtWithTicket(jwt);

        TokenResponseDto tokenResponseDto;
        if (userEntity.get().getUserRole() != RoleEnum.ROLE_ADMIN) {
            // jwt를 상용자 정보와 함께 응답Dto에 저장
            tokenResponseDto = TokenResponseDto.builder()
                    .jwt(jwt)
                    .ticket(ticket)
                    .userId(userEntity.get().getId())
                    .name(userEntity.get().getName())
                    .position(userEntity.get().getPosition())
                    .build();
        } else {
            tokenResponseDto = TokenResponseOfAdminDto.builder()
                    .jwt(jwt)
                    .userId(userEntity.get().getId())
                    .name(userEntity.get().getName())
                    .position(userEntity.get().getPosition())
                    .userRole(userEntity.get().getUserRole().toString())
                    .build();
            }

        return new ResponseEntity<TokenResponseDto>(tokenResponseDto, HttpStatus.OK);
    }



    // 사원증으로 로그인하기
    @ApiOperation(
            value = "사원증 로그인"
            , notes = "사원증 로그인")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "card"
                            , value = "사원증 카드번호")
            })
    @PostMapping("/cardlogin")
    public ResponseEntity<?> cardLogin(@Valid @RequestBody CardLoginDto card){
        Optional<User> opUser = userRepository.findByLoginCardNumber(card.getCardNumber());
        if(opUser.isEmpty()){
            return new ResponseEntity<String>("no user exist", HttpStatus.NOT_FOUND);
        }

        User user = opUser.get();
        String email = user.getEmail();
        System.out.println("이메일까지 얻었습니다 : " + email);

        //
        // jwt 생성
        Optional<JwtBank> opJwt = jwtBankRepository.findByEmail(email);
        if (opJwt.isEmpty()) {
            return new ResponseEntity<String>("need to login first", HttpStatus.NOT_FOUND);
        }

        String jwt = opJwt.get().getJwt();
        System.out.println("토큰까지 얻었습니다");


        // jwt를 JwtBank에 저장하고 저장한 코드를 발급받음.
        String ticket = jwtBankService.saveJwtWithTicket(jwt);
        System.out.println("티켓까지 얻었습니다");


        TokenResponseDto tokenResponseDto;
        if (user.getUserRole() != RoleEnum.ROLE_ADMIN) {
            // jwt를 상용자 정보와 함께 응답Dto에 저장
            tokenResponseDto = TokenResponseDto.builder()
                    .jwt(jwt)
                    .ticket(ticket)
                    .userId(user.getId())
                    .name(user.getName())
                    .position(user.getPosition())
                    .build();
        } else {
            tokenResponseDto = TokenResponseOfAdminDto.builder()
                    .jwt(jwt)
                    .userId(user.getId())
                    .name(user.getName())
                    .position(user.getPosition())
                    .userRole(user.getUserRole().toString())
                    .build();
        }

        return new ResponseEntity<TokenResponseDto>(tokenResponseDto, HttpStatus.OK);
    }



    // 티켓 로그인
    @ApiOperation(
            value = "티켓 로그인"
            , notes = "태블릿에서 4자리 코드(ticket)으로 로그인하는 경우를 처리." +
            "요청으로 4자리 코드를 보내고 응답으로 jwt를 준다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "ticket"
                            , value = "4자리 코드")
            })
    @PostMapping("/login/tablet")
    public ResponseEntity<?> loginTablet(@RequestBody String ticket) throws Exception{
        Optional<JwtBank> jwtEntity = jwtBankRepository.findById(ticket);
        if(jwtEntity.isEmpty()){
            return new ResponseEntity<String>("no user exist", HttpStatus.NOT_FOUND);
        }

        TokenResponseDto tokenResponseDto = TokenResponseDto.builder()
                .jwt(jwtEntity.get().getJwt())
                .build();

        return new ResponseEntity<TokenResponseDto>(tokenResponseDto, HttpStatus.OK);
    }

    // 로그아웃
    @ApiOperation(
            value = "로그아웃"
            , notes = "4자리 코드(ticket)정보를 DB에서 삭제한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "ticket"
                            , value = "4자리 코드")
            })
    @PostMapping("/delete-ticket")
    public ResponseEntity<String> deleteTicket(@RequestBody String ticket) throws Exception{
        jwtBankRepository.deleteById(ticket);

        return new ResponseEntity<String>("Success", HttpStatus.OK);
    }

    // 회원가입
    @ApiOperation(
            value = "회원 가입"
            , notes = "회원정보를 DB에 저장한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "user"
                            , value = "회원 가입 정보")
            })
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody SignUpDto user) throws Exception{
        userService.addUser(user);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
    }




    @ApiOperation(
            value = "이메일 중복 확인",
            notes = "이메일 중복 여부를 확인한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "email",
                            value = "중복 여부를 확인할 이메일")
            })
    @PostMapping("/signup/emailcheck")
    public ResponseEntity<String> checkEmail(@RequestBody EmailDto email) {
        return new ResponseEntity<String>(userService.checkEmail(email), HttpStatus.OK);
    }

    // 회원탈퇴
    @ApiOperation(
            value = "회원 삭제"
            , notes = "회원정보를 DB에서 삭제한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "Authorization"
                            , value = "jwt 토큰")
                    ,
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "사용자 아이디"
                            , example = "0")

            })
   @DeleteMapping("/users/{userId}")
   public ResponseEntity<String> deleteUser(@RequestHeader(value="Authorization") String token, @PathVariable Long userId) throws Exception{
        userService.deleteUser(userId);
       return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
   }

   // 회원수정
   @ApiOperation(
           value = "회원 수정"
           , notes = "회원정보를 수정한다.")
   @ApiImplicitParams(
           {
                   @ApiImplicitParam(
                           name = "Authorization"
                           , value = "jwt 토큰")
                   ,
                   @ApiImplicitParam(
                           name = "user"
                           , value = "사용자 정보 수정")

           })
   @PutMapping("/users/{userId}")
   public ResponseEntity<String> modify(@RequestHeader(value="Authorization") String token, @PathVariable Long userId, @RequestBody UserDto user) throws Exception{
        userService.modifyUser(userId, user);
       return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
   }

    // 회원정보가져오기
    @ApiOperation(
            value = "회원 정보 가져오기"
            , notes = "사용자의 ID를 통해 사용자 정보를 조회한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "사용자 아이디"
                            , example = "0")

            })
    @GetMapping("/users/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long userId) throws Exception{
        return new ResponseEntity<UserDto>(userService.findUser(userId), HttpStatus.OK);
    }

    // 체크아웃 - 원래 자리 notEmpty해제하고 해당 유저 자리 정보 없애기
    @ApiOperation(
            value = "회원 자리 체크아웃"
            , notes = "사용자에게 할당된 자리를 반납한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "Authorization"
                            , value = "jwt 토큰")
                    ,
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "사용자 아이디"
                            , example = "0")

            })
    @PutMapping("/users/{userId}/checkout")
    public ResponseEntity<String> checkout(@RequestHeader(value="Authorization") String token, @PathVariable Long userId) throws Exception{
        userService.checkout(userId);
        return new ResponseEntity<String>("success", HttpStatus.CREATED);
    }


    // 회원 자리 할당(변경)
    // 1. 원래 앉던 자리가 있으면 Empty처리
    // 1. 해당 유저의 Seat_id 콜롱에 새로 할당한 자리 id 넣기
    // 2. 해당 자리를 notEmpty 처리
    @ApiOperation(
            value = "회원 자리 할당(변경)"
            , notes = "이미 자리가 있는 회원일 경우 원래자리를 반납하고 새로운 자리를 할당하며" +
            "자리가 없었던 회원일 경우 바로 새로운 자리를 할당한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "Authorization"
                            , value = "jwt 토큰")
                    ,
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "사용자 아이디"
                            , example = "0")
                    ,
                    @ApiImplicitParam(
                            name = "seatNumber"
                            , value = "자리 번호"
                            , example = "0")
            })
    @PutMapping("/users/{userId}/alloc/{area}/{seatNumber}")
    public ResponseEntity<String> allocSeat(@RequestHeader(value="Authorization") String token, @PathVariable Long userId, @PathVariable Long seatNumber, @PathVariable String area) throws Exception{
        userService.allocSeat(userId, area, seatNumber);
        return new ResponseEntity<String>("success", HttpStatus.CREATED);
    }


}

