package com.example.ddd_demo.service;

import com.example.ddd_demo.dto.UserDto;
import com.example.ddd_demo.entity.User;
import com.example.ddd_demo.entity.UserStatus;
import com.example.ddd_demo.repository.SeatRepository;
import com.example.ddd_demo.repository.UserRepository;
import com.example.ddd_demo.repository.UserStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

// 데이터 수정, 추가는 연관관계 주인으로만 해야한다.
// ex) user Entity를 사용해서 userDeskSetting list를 추가하지 말라.

@Service
public class UserServiceImpl implements  UserService{

    @Autowired
    UserRepository userRepository;
    @Autowired
    SeatRepository seatRepository;
    @Autowired
    UserStatusRepository userStatusRepository;

    @Override
    public void joinUser(UserDto newUser) throws Exception{

        User user = User.builder()
                .accountId(newUser.getAccountId())
                .password(newUser.getPassword())
                .name(newUser.getName())
                .height(newUser.getHeight())
                .email(newUser.getEmail())
                .phoneNumber(newUser.getPhoneNumber())
                .position(newUser.getPosition())
                .employeeNumber(newUser.getEmployeeNumber())
                .noticeDisplay(true)
                .noticeSound(true)
                .noticeVibration(true)
                // 1L : 오프라인, 2L : 온라인, 3L : 다른 용무, 4L : 방해금지
                .userStatus(new UserStatus(1L,"trash"))
             // .userStatus(userStatusRepository.findById(1L).get())
                // 1. user에 userStatus를 넣을때 (id, status) 모두 있는 객체 통째로 넣고 save해야 find할때 잘 가져올 수 있냐
                // 2. 아니면 (id)만 있는 깡통객체를 넣고 save해도 find할때 문제 없냐를 확인하기 위함.
                // 1은 작동 확인. 2도 작동 확인.
                .build();

        userRepository.save(user);
    }
    @Override
    public void deleteUser(Long id) throws Exception{
        userRepository.deleteById(id);
    }
    @Override
    public void modifyUser(UserDto user) throws Exception{

        User newInfo = User.builder()
                .id(user.getId())
                .accountId(user.getAccountId())
                .password(user.getPassword())
                .name(user.getName())
                .height(user.getHeight())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .position(user.getPosition())
                .employeeNumber(user.getEmployeeNumber())
                .build();

        userRepository.save(newInfo);
    }
    @Override
    public UserDto findUser(Long id) throws Exception{
        Optional<User> result = userRepository.findById(id);

        User user = new User();
        if(result.isPresent()){
            user = result.get();
        }

        UserDto info = UserDto.builder()
                .id(user.getId())
                .accountId(user.getAccountId())
                .password(user.getPassword())
                .name(user.getName())
                .height(user.getHeight())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .position(user.getPosition())
                .employeeNumber(user.getEmployeeNumber())
                .userStatus(user.getUserStatus().getStatus())
                .build();

        return info;
    }
}
