package com.example.ddd_demo.api;

import com.example.ddd_demo.dto.UserDto;
import com.example.ddd_demo.entity.User;
import com.example.ddd_demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserApiController {
    @Autowired
    private UserService userService;

    // 회원가입
    @PostMapping("/user")
    public ResponseEntity<String> signup(@RequestBody UserDto user) throws Exception{
        userService.joinUser(user);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
    }

    // 회원탈퇴
   @DeleteMapping("/user/{userId}")
   public ResponseEntity<String> signout(@RequestHeader(value="Authorization") String token, @PathVariable Long userId) throws Exception{
        userService.deleteUser(userId);
       return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
   }

   // 회원수정
   @PutMapping("/user")
   public ResponseEntity<String> modify(@RequestHeader(value="Authorization") String token, @RequestBody UserDto user) throws Exception{
        userService.modifyUser(user);
       return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
   }

    // 회원정보가져오기
    @GetMapping("/user/{userId}")
    public ResponseEntity<UserDto> getInfo(@RequestHeader(value="Authorization") String token, @PathVariable Long userId) throws Exception{
        return new ResponseEntity<UserDto>(userService.findUser(userId), HttpStatus.OK);
    }

}
