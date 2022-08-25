package ssafy.ddokdi.api;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ddokdi.dto.NoticeDto;
import ssafy.ddokdi.dto.SettingDto;
import ssafy.ddokdi.dto.StatusDto;
import ssafy.ddokdi.service.SettingService;

import java.util.List;

@RestController
public class SettingApiController {
    @Autowired
    private SettingService settingService;



    // 특정 유저 데스크 세팅 모두 불러오기
    @ApiOperation(
            value = "회원 데스크 세팅 모두 불러오기"
            , notes = "특정 회원이 저장한 데스크 세팅 모두 불러오기. 다수의 데스크 세팅을 List로 가져옴.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "사용자 아이디"
                            , example = "0")
            })
    @GetMapping("/settings/{userId}/desks")
    public ResponseEntity<List<SettingDto>> getSettings(@PathVariable Long userId) throws Exception{
        return new ResponseEntity<List<SettingDto>>(settingService.getSettingAll(userId), HttpStatus.OK);
    }


    // 특정 유저 특정 데스크 세팅 불러오기
    @ApiOperation(
            value = "회원 데스크 세팅 하나 불러오기"
            , notes = "특정 회원이 저장한 데스크 세팅 하나 불러오기.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "사용자 아이디"
                            , example = "0")
                    ,
                    @ApiImplicitParam(
                            name = "deskIndex"
                            , value = "사용자의 몇번째 세팅"
                            , example = "0")
            })
    @GetMapping("/settings/{userId}/desks/{deskIndex}")
    public ResponseEntity<SettingDto> getSetting(@PathVariable Long userId, @PathVariable Long deskIndex) throws Exception{
        return new ResponseEntity<SettingDto>(settingService.getSettingOne(userId, deskIndex), HttpStatus.OK);
    }


    // 특정 유저 특정 데스크 세팅 저장(수정)
    @ApiOperation(
            value = "회원 데스크 세팅 저장(수정)"
            , notes = "특정 회원의 N번째(deskIndex) 데스크 세팅을 저장. N번째 세팅에 데이터를 수정한다")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "Authorization"
                            , value = "jwt 토큰")
                    ,
                    @ApiImplicitParam(
                            name = "setInfo"
                            , value = "데스크 세팅 정보")
                    ,
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "사용자 아이디"
                            , example = "0")
                    ,
                    @ApiImplicitParam(
                            name = "deskIndex"
                            , value = "사용자의 몇번째 세팅"
                            , example = "0")
            })
    @PutMapping("/settings/{userId}/desks/{deskIndex}")
    public ResponseEntity<String> setSetting(@RequestHeader(value="Authorization") String token, @RequestBody SettingDto setInfo, @PathVariable Long userId, @PathVariable Long deskIndex) throws Exception{
        settingService.setSettingOne(setInfo, userId, deskIndex);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
    }


//
//    // 특정 유저 특정 데스크 세팅 삭제
//    @ApiOperation(
//            value = "회원 데스크 세팅 삭제"
//            , notes = "특정 회원의 N번째(deskIndex) 데스크 세팅을 삭제한다.")
//    @ApiImplicitParams(
//            {
//                    @ApiImplicitParam(
//                            name = "Authorization"
//                            , value = "jwt 토큰")
//                    ,
//                    @ApiImplicitParam(
//                            name = "userId"
//                            , value = "사용자 아이디"
//                            , example = "0")
//                    ,
//                    @ApiImplicitParam(
//                            name = "deskIndex"
//                            , value = "사용자의 몇번째 세팅"
//                            , example = "0")
//            })

//
//    @DeleteMapping("/settings/{userId}/desks/{deskIndex}")
//    public ResponseEntity<String> delSetting(@RequestHeader(value="Authorization") String token, @PathVariable Long userId, @PathVariable Long deskIndex) throws Exception{
//        settingService.delSettingOne(userId, deskIndex);
//        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
//    }



    // 현재 상태 및 자리 정보 불러오기
    @ApiOperation(
            value = "사용자 상태 및 자리 조회"
            , notes = "사용자의 ID를 통해 사용자의 현재 상태와 자리 정보를 불러온다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "사용자 아이디"
                            , example = "0")

            })
    @GetMapping("/settings/{userId}/status")
    public ResponseEntity<StatusDto> getStatus(@PathVariable Long userId) throws Exception{
        return new ResponseEntity<StatusDto>(settingService.getStatusOne(userId), HttpStatus.OK);
    }

    // 현재 상태 정보 수정
    @ApiOperation(
            value = "사용자 상태 수정"
            , notes = "사용자의 ID를 통해 사용자의 상태 정보를 수정한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "Authorization"
                            , value = "jwt 토큰")
                    ,
                    @ApiImplicitParam(
                            name = "status"
                            , value = "사용자 상태 정보(OffLine, OnLine, InOtherWork, DoNotDisturb)")
                    ,
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "사용자 아이디"
                            , example = "0")

            })
    @PostMapping("/settings/{userId}/status")
    public ResponseEntity<String> updateStatus(@RequestHeader(value="Authorization") String token, @RequestBody String status, @PathVariable Long userId) throws Exception{
        settingService.updateStatusOne(status, userId);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
    }

    // 알림 설정 조회
    @GetMapping("/settings/{userId}/notice")
    @ApiOperation(
            value = "사용자 알림 조회"
            , notes = "사용자의 ID를 통해 사용자의 알림 설정 정보를 조회한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "사용자 아이디"
                            , example = "0")

            })
    public ResponseEntity<NoticeDto> getNotice(@PathVariable Long userId) throws Exception{
        return new ResponseEntity<NoticeDto>(settingService.getNoticeOne(userId), HttpStatus.OK);
    }


    // 알림 설정 수정
    @PutMapping("/settings/{userId}/notice")
    @ApiOperation(
            value = "사용자 알림 수정"
            , notes = "사용자의 ID를 통해 사용자의 알림 설정 정보를 수정한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "Authorization"
                            , value = "jwt 토큰")
                    ,
                    @ApiImplicitParam(
                            name = "notice"
                            , value = "사용자 알림 설정 정보(화면 알림, 사운드 알림, 진동 알림")
                    ,
                    @ApiImplicitParam(
                            name = "userId"
                            , value = "사용자 아이디"
                            , example = "0")

            })


    public ResponseEntity<String> updateNotice(@RequestHeader(value="Authorization") String token, @RequestBody NoticeDto notice, @PathVariable Long userId) throws Exception{
        settingService.updateNoticeOne(notice, userId);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.CREATED);
    }

}
