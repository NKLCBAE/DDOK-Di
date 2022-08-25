package com.example.ddd_demo.service;

import com.example.ddd_demo.dto.UserDto;
import com.example.ddd_demo.entity.User;

public interface UserService {

    public void joinUser(UserDto user) throws Exception;
    public void deleteUser(Long id) throws Exception;
    public void modifyUser(UserDto user) throws Exception;
    public UserDto findUser(Long id) throws Exception;

}
