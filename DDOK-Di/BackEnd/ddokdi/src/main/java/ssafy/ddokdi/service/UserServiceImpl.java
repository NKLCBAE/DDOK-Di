package ssafy.ddokdi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ssafy.ddokdi.dto.EmailDto;
import ssafy.ddokdi.dto.SignUpDto;
import ssafy.ddokdi.dto.UserDto;
import ssafy.ddokdi.entity.*;
import ssafy.ddokdi.enums.RoleEnum;
import ssafy.ddokdi.enums.StatusEnum;
import ssafy.ddokdi.exception.UserIsAdminException;
import ssafy.ddokdi.repository.*;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.util.NoSuchElementException;
import java.util.Optional;

// 데이터 수정, 추가는 연관관계 주인으로만 해야한다.

// [필요]
// 1. 예외처리 보충 필요
// 2. @Transactional 필요

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    SeatRepository seatRepository;
    @Autowired
    UserStatusRepository userStatusRepository;
    @Autowired
    DeskSettingRepository deskSettingRepository;
    @Autowired
    CalendarRepository calendarRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    AreaRepository areaRepository;
    @Autowired
    JwtBankRepository jwtBankRepository;


    @Override
    @Transactional
    public void addUser(SignUpDto newUser) throws Exception {
        if (userRepository.findByEmail(newUser.getEmail()).orElse(null) != null) {
            throw new RuntimeException("email already exist ");
        }

        // SignUpDto에 담긴 정보를 User entity에 옮겨 담고 save
        User user = User.builder()
                .email(newUser.getEmail())
                .password(passwordEncoder.encode(newUser.getPassword()))
                .name(newUser.getName())
                .height(newUser.getHeight())
                .phoneNumber(newUser.getPhoneNumber())
                .position(newUser.getPosition())
                .employeeNumber(newUser.getEmployeeNumber())
                .noticeDisplay(true)
                .noticeSound(true)
                .noticeVibration(true)
                // StatusEnum : 오프라인, 온라인, 다른 용무, 방해 금지
                .userStatus(StatusEnum.OffLine)
                .userRole(RoleEnum.ROLE_USER)  // 기본적으로 유저로 가입
                // .userStatus(userStatusRepository.findById(1L).get())
                // 1. user에 userStatus를 넣을때 (id, status) 모두 있는 객체 통째로 넣고 save해야 find할때 잘 가져올 수 있냐
                // 2. 아니면 (id)만 있는 깡통객체를 넣고 save해도 find할때 문제 없냐를 확인하기 위함.
                // 1은 작동 확인. 2도 작동 확인.
                .build();

        userRepository.save(user);
        // 기본 데스크세팅 초기화
        DeskSetting ds = new_desksetting(16.5F, 1L, 1L, user);
        DeskSetting ds2 = new_desksetting(15.8F, 2L, 1L, user);
        DeskSetting ds3 = new_desksetting(15.8F, 3L, 1L, user);

        Calendar calendar = new Calendar(user);
        calendarRepository.save(calendar);
        userRepository.save(user);


    }

    @Override
    @Transactional
    public void deleteUser(Long id) throws Exception {
        Optional<User> opUser = userRepository.findById(id);
        if (opUser.isEmpty()) {
            System.out.println("유저가 없다!!");
            throw new NoSuchElementException("No user has requested id.");
        }
        System.out.println("유저가 있다!!!");
        User user = opUser.get();
        if (user.getSeat() != null) {
            System.out.println("탈퇴할 유저가 자리에 앉아있습니다");
            Seat seat = user.getSeat();
            seat.setFull(false);
            seatRepository.save(seat);
            System.out.println("탈퇴할 유저가 자리에서 나왔습니다");
        } else {
            System.out.println("탈퇴할 유저가 앉은 자리가 없습니다");
        }

        Optional<JwtBank> opJwtBank = jwtBankRepository.findByEmail(user.getEmail());
        if (opJwtBank.isPresent()) {
            jwtBankRepository.deleteAllByEmail(opJwtBank.get().getEmail());
        }

        userRepository.deleteById(id);
        System.out.println("유저를 삭제했습니다");

    }

    @Override
    @Transactional
    public void modifyUser(Long userId, UserDto userDto) {
        Optional<User> userOpt = userRepository.findById(userId);
//        Optional.ofNullable(userRepository.findById(userDto.getId()).orElseThrow(() -> new RuntimeException("" +
//                "no user. id=" + userDto.getId())));

        User userEntity;
        if (userOpt.isPresent()) {
            userEntity = userOpt.get();
            // save했을 때 DB에 이미 동일한 id를 가진 row가 있으면 수정 진행.
            userEntity.setEmail(userDto.getEmail());
//            userEntity.setPassword(passwordEncoder.encode(userDto.getPassword()));
            userEntity.setName(userDto.getName());
            userEntity.setHeight(userDto.getHeight());
            userEntity.setPhoneNumber(userDto.getPhoneNumber());
            userEntity.setPosition(userDto.getPosition());
            userEntity.setEmployeeNumber(userDto.getEmployeeNumber());

            userRepository.save(userEntity);
        } else {
            throw new NoSuchElementException("Non-Existent User");
        }
    }

    @Override
    @Transactional
    public UserDto findUser(Long userId) {
        // 해당 id를 가진 User 데이터 끌어오기
        // User entity 가 Seat entity와 연결되어 있으므로 데이터를 끌어올대 Seat table에서도 데이터를 끌어옴.
        // Optional에 일단 넣는 이유는 데이터 끌어온게 null일때 null exception을 방지하기 위함.
        Optional<User> userBaby = Optional.ofNullable(userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("" +
                "no user. id=" + userId)));
        User user = new User();
        UserDto info = new UserDto();
        // 해당 User가 있을때만 실행
        if (userBaby.isPresent()) {
            user = userBaby.get();

            info = UserDto.builder()
                    .id(user.getId())
                    .email(user.getEmail())
//                    .password(user.getPassword())
                    .name(user.getName())
                    .height(user.getHeight())
                    .phoneNumber(user.getPhoneNumber())
                    .position(user.getPosition())
                    .employeeNumber(user.getEmployeeNumber())
                    .userStatus(user.getUserStatus().name())
                    .build();
        }

        return info;
    }

    @Override
    @Transactional
    public void checkout(Long userId) throws Exception {
        Optional<User> opUser = userRepository.findById(userId);

        // 해당 User가 있을때만 실행
        if (opUser.isEmpty()) {
            throw new NoSuchElementException("No user has requested id.");
        }
        User user = opUser.get();

        // User에게 원래 앉던 자리가 있을때만 실행
        Optional<Seat> pastSeat = Optional.ofNullable(user.getSeat());
        if (pastSeat.isEmpty()) {
            throw new NoSuchElementException("The user has not set on any seat.");
        }

        pastSeat.get().setFull(false);
        user.setSeat(null);
        user.setUserStatus(StatusEnum.OffLine);

        seatRepository.save(pastSeat.get());
        userRepository.save(user);

    }

    @Override
    @Transactional
    public void allocSeat(Long userId, String area, Long seatNumber) throws NoSuchElementException {
        // User 데이터 끌어오기
        Optional<User> opUser = userRepository.findById(userId);
        // 해당 User가 있을때만 실행
        if (opUser.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User");
        }

        User user = opUser.get();

        if (user.getUserRole() == RoleEnum.ROLE_ADMIN) {
            throw new UserIsAdminException("해당 유저는 관리자이므로 자리 배정을 하지 않습니다");
        }

        // User에게 원래 앉던 자리가 있으면 그 자리는 Empty처리
        Optional<Seat> pastSeat = Optional.ofNullable(user.getSeat());
        if (pastSeat.isPresent()) {
            pastSeat.get().setFull(false);
            seatRepository.save(pastSeat.get());
        }

        Optional<Area> opArea = areaRepository.findByZone(area);

        if (opArea.isEmpty()) {
            throw new NoSuchElementException("Non-Existent Area : " + area);
        }
        // 새로 할당할 Seat 데이터 끌어오기
        Optional<Seat> opSeat = seatRepository.findBySeatNumberAndArea(seatNumber, opArea.get());
        if (opSeat.isEmpty()) {
            throw new NoSuchElementException("Non-Existent Seat : " + area + "-" + seatNumber);
        }

        Seat seat = opSeat.get();

        // 이미 할당된 자리이면 할당 거부
        if (seat.isFull() == true) {
            throw new RuntimeException("Already Allocated Seat");
        }

        user.allocateSeat(seat);
        // 변경된 user를 DB에 반영
        userRepository.save(user);
        // seat도 정보가 변했으니 seat도 DB에 반영해준다.
        seatRepository.save(seat);

    }

    @Override
    @Transactional
    public String checkEmail(EmailDto email) {
        Optional<User> user = userRepository.findByEmail(email.getEmail());
        if (user.isPresent()) {
            return "N";
        } else {
            return "Y";
        }
    }

    private DeskSetting new_desksetting(Float deskHeight, Long deskIndex, Long monitorHeight, User user) {
        DeskSetting deskSetting = new DeskSetting();
        deskSetting.setUser(user);
        deskSetting.setDeskIndex(deskIndex);
        deskSetting.setDeskHeight(deskHeight);
        deskSetting.setMonitorHeight(monitorHeight);

        deskSettingRepository.save(deskSetting);

        return deskSetting;
    }
}
