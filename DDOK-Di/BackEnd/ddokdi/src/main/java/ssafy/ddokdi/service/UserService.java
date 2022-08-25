package ssafy.ddokdi.service;

import ssafy.ddokdi.dto.EmailDto;
import ssafy.ddokdi.dto.SignUpDto;
import ssafy.ddokdi.dto.UserDto;

public interface UserService {

    public void addUser(SignUpDto user) throws Exception;
    public void deleteUser(Long id) throws Exception;
    public void modifyUser(Long id, UserDto userDto) throws Exception;
    public UserDto findUser(Long id) throws Exception;
    public void checkout(Long id) throws Exception;
    public void allocSeat(Long id, String area, Long seatNumber) throws Exception;
    String checkEmail(EmailDto email);


}
