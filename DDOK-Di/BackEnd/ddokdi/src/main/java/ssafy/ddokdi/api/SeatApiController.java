package ssafy.ddokdi.api;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ddokdi.dto.SeatDto;
import ssafy.ddokdi.service.SeatService;

import java.util.List;
import java.util.Map;

@RestController
public class SeatApiController {

    @Autowired
    public SeatService seatService;



    // dummy API
    @GetMapping("/seats/dummy")
    public ResponseEntity<String> getSeats() throws Exception{
        return new ResponseEntity<String>("Hello dummy", HttpStatus.CREATED);
    }


    // 특정 구역 모든 자리 정보 조회
    @ApiOperation(
            value = "구역의 모든 자리 불러오기",
            notes = "구역의 이름을 입력받아 그 구역의 모든 자리를 불러옵니다")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "area",
                            value = "구역 이름",
                            example = "0")
            })
    @GetMapping("/seats/{area}")
    public ResponseEntity<List<SeatDto>> getSeats(@PathVariable String area) throws Exception{
        return new ResponseEntity<List<SeatDto>>(seatService.getSeatAllByArea(area), HttpStatus.CREATED);
    }


    // 특정 자리 정보 조회
    @ApiOperation(
            value = "자리의 정보 불러오기",
            notes = "자리 번호를 입력받아 그 자리의 정보를 불러옵니다")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "seatNumber",
                            value = "자리의 번호",
                            example = "0"
                    )

            })
    @GetMapping("/seats/{area}/{seatNumber}")
    public ResponseEntity<SeatDto> getSeat(@PathVariable String area, @PathVariable Long seatNumber) throws Exception{

        return new ResponseEntity<SeatDto>(seatService.findBySeatNumberAndArea(area, seatNumber), HttpStatus.CREATED);
    }


    // 자리 위치 수정
    @ApiOperation(
            value = "자리 생성 및 수정",
            notes = "아직 없는 자리라면 생성하고, 이미 있는 자리라면 자리의 left position, top position를 수정합니다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "Authorization",
                            value = "JWT 토큰"

                    ),
                    @ApiImplicitParam(
                            name = "seatNumber",
                            value = "자리의 번호",
                            example = "0"
                    ),
                    @ApiImplicitParam(
                            name = "seatDto",
                            value = "위치(left,top) 입력."
                    )
            })
    @PostMapping("/seats/{area}/{seatNumber}")
    public ResponseEntity<String> updateSeat(@RequestHeader(value="Authorization") String token, @PathVariable String area, @PathVariable Long seatNumber, @RequestBody SeatDto seatDto) throws Exception{
        Map<String,String> result =  seatService.updateSeat(area, seatNumber, seatDto);
        return new ResponseEntity<String>(result.get("DETAILS"), HttpStatus.valueOf(result.get("CODE")));
    }

    
    // 자리 삭제
    @ApiOperation(
            value = "자리 삭제",
            notes = "자리의 id로 자리 삭제")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "Authorization",
                            value = "JWT 토큰"

                    ),

                    @ApiImplicitParam(
                            name = "seatNumber",
                            value = "자리의 번호",
                            example = "0"
                    )

            })
    @DeleteMapping ("/seats/{area}/{seatNumber}")
    public ResponseEntity<String> delSeat(@RequestHeader(value="Authorization") String token, @PathVariable String area, @PathVariable Long seatNumber) throws Exception{
        Map<String,String> result = seatService.delSeat(area, seatNumber);
        return new ResponseEntity<String>(result.get("DETAILS"), HttpStatus.OK);
    }




}
