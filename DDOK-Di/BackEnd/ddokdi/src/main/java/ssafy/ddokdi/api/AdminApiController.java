package ssafy.ddokdi.api;


import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ddokdi.dto.UserForAdminDto;
import ssafy.ddokdi.service.AdminService;

import java.util.List;

@RestController
public class AdminApiController {

    @Autowired
    AdminService adminService;


    @ApiOperation(
            value = "전체 회원정보 요청"
            , notes = "모든 회원정보를 불러온다")
    @GetMapping("/admin/users")
    // 어드민 페이지에서 회원정보 전체 전송
    public ResponseEntity<List<UserForAdminDto>> getAllUsersForAdmin(@RequestHeader(value="Authorization") String token) throws Exception {
        return new ResponseEntity<List<UserForAdminDto>>(adminService.findAll(), HttpStatus.CREATED);
    }

    @ApiOperation(
            value = "개별 회원 정보 요청"
            , notes = "개별 회원정보를 불러온다")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "정보를 불러올 유저의 아이디"
                            , example = "0")
            })
    @GetMapping("/admin/users/{userId}")
    // 각각의 회원 페이지에서 회원 정보 하나 전송
    public ResponseEntity<UserForAdminDto> getUserByIdForAdmin(@RequestHeader(value="Authorization") String token, @PathVariable Long userId) throws Exception {
        return new ResponseEntity<UserForAdminDto>(adminService.getById(userId), HttpStatus.CREATED);
    }


    @ApiOperation(
            value = "관리자 페이지에서 개별 회원 정보 수정"
            , notes = "개별 회원정보를 수정한다")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "정보를 수정할 유저의 아이디"
                            , example = "0")
            })
    @PutMapping("/admin/users/{userId}")
    // 각각의 회원 페이지에서 회원 정보 하나 업데이트
    public ResponseEntity<String> updateUserInfoByAdmin(@RequestHeader(value="Authorization") String token, @PathVariable Long userId, @RequestBody UserForAdminDto userAdminDto) throws Exception {
        adminService.modifyUser(userId, userAdminDto);
        return new ResponseEntity<String>("Success", HttpStatus.CREATED);
    }

//    public void checkAdmin()

}
