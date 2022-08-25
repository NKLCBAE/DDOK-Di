package com.example.ddd_demo.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.web.bind.annotation.GetMapping;




@Data
@Builder
public class UserDto {
    private Long id;
    private Long accountId;
    private String password;
    private String name;
    private Long height;
    private String email;
    private String phoneNumber;
    private String position;
    private Long employeeNumber;
    private String userStatus;

}
