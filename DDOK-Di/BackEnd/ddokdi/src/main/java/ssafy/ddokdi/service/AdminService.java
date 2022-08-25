package ssafy.ddokdi.service;

import ssafy.ddokdi.dto.UserForAdminDto;

import java.util.List;

public interface AdminService {

    List<UserForAdminDto> findAll() throws Exception;  // 레포지토리에 있는 모든 유저를 불러옴
    UserForAdminDto getById(Long userId) throws Exception;  // id로 유저를 조회함
    void modifyUser(Long userId, UserForAdminDto userAdminDto) throws Exception;  // 유저 정보 수정

}
