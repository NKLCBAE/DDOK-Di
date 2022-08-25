package ssafy.ddokdi.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import ssafy.ddokdi.dto.UserForAdminDto;

import ssafy.ddokdi.entity.User;
import ssafy.ddokdi.enums.StatusEnum;
import ssafy.ddokdi.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    UserRepository userRepository;


    @Override
    @Transactional
    public List<UserForAdminDto> findAll() throws NoSuchElementException {
        List<UserForAdminDto> allUserDtoList = new ArrayList();
        List<User> userList = userRepository.findAll();


            for (User user : userList) {
                UserForAdminDto userDto = userDtoBuilder(user);
                allUserDtoList.add(userDto);
            }


        return allUserDtoList;
    }

    @Override
    @Transactional
    public UserForAdminDto getById(Long userId) throws NoSuchElementException {
        Optional<User> opUser = userRepository.findById(userId);
        if (opUser.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User. userId : "+userId);
        }
            UserForAdminDto userDto = userDtoBuilder(opUser.get());

            return userDto ;


    }

    @Override
    @Transactional
    public void modifyUser(Long userId, UserForAdminDto userAdminDto) throws NoSuchElementException {
        Optional<User> opUser = userRepository.findById(userId);
        if (opUser.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User. userId : "+userId);
        }


            User updatedUser = opUser.get();
            updatedUser.setEmail(userAdminDto.getEmail());
            updatedUser.setName(userAdminDto.getName());
            updatedUser.setHeight(userAdminDto.getHeight());
            updatedUser.setPhoneNumber(userAdminDto.getPhoneNumber());
            updatedUser.setPosition(userAdminDto.getPosition());
            updatedUser.setUserStatus(StatusEnum.valueOf(userAdminDto.getUserStatus()));
            userRepository.save(updatedUser);

    }

    private UserForAdminDto userDtoBuilder(User user) {
        UserForAdminDto userDto;

        userDto = UserForAdminDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .height(user.getHeight())
                .phoneNumber(user.getPhoneNumber())
                .position(user.getPosition())
                .userStatus(user.getUserStatus().name())
                .userRole(user.getUserRole().name())
                .build();

        return userDto;
    }
}

