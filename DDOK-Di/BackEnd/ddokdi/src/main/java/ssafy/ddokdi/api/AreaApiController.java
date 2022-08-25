package ssafy.ddokdi.api;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ddokdi.dto.EmailDto;
import ssafy.ddokdi.repository.AreaRepository;
import ssafy.ddokdi.service.AreaService;

import java.util.List;
import java.util.Map;

@RestController
public class AreaApiController {
    @Autowired
    private AreaService areaService;

    // 모든 zone 이름 가져오기
    @ApiOperation(
            value = "모든 zone 이름 불러오기",
            notes = "존재하는 모든 zone 이름을 가져온다.")
    @ApiImplicitParams(
            {
            })
    @GetMapping("/zone")
    public ResponseEntity<List<String>> getZones() throws Exception{
        return new ResponseEntity<List<String>>(areaService.getZoneAll(), HttpStatus.OK);
    }

    // 모든 zone 삭제
    @ApiOperation(
            value = "모든 zone 삭제",
            notes = "모든 zone 삭제.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "Authorization"
                            , value = "jwt 토큰")
                    ,
            })
    @DeleteMapping("/zone")
    public ResponseEntity<String> delZones(@RequestHeader(value="Authorization") String token) throws Exception{
        areaService.delZoneAll();
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }


    // zone 추가
    @ApiOperation(
            value = "zone 추가",
            notes = "zone 추가.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "Authorization"
                            , value = "jwt 토큰")
                    ,
                    @ApiImplicitParam(
                            name = "zoneName"
                            , value = "zone 이름")
            })
    @PostMapping("/zone/{zoneName}")
    public ResponseEntity<String> addZone(@RequestHeader(value="Authorization") String token, @PathVariable String zoneName) throws Exception{
        areaService.addZone(zoneName);
        return new ResponseEntity<String>(zoneName, HttpStatus.OK);
    }

    // zone 제거
    @ApiOperation(
            value = "zone 제거",
            notes = "zone 제거.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "Authorization"
                            , value = "jwt 토큰")
                    ,
                    @ApiImplicitParam(
                            name = "zoneName"
                            , value = "zone 이름")
            })
    @DeleteMapping ("/zone/{zoneName}")
    public ResponseEntity<String> delZone(@RequestHeader(value="Authorization") String token, @PathVariable String zoneName) throws Exception{
        Map<String,String> result =  areaService.delZone(zoneName);
        return new ResponseEntity<String>(result.get("DETAILS"), HttpStatus.valueOf(result.get("CODE")));
    }




}
