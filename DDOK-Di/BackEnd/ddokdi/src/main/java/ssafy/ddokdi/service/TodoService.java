package ssafy.ddokdi.service;

import org.springframework.http.ResponseEntity;
import ssafy.ddokdi.dto.TodoCreateDto;
import ssafy.ddokdi.dto.TodoDto;
import ssafy.ddokdi.entity.Todo;

import java.text.ParseException;
import java.util.List;

public interface TodoService {

    List<TodoDto> getAllTodos(Long userId, Long year, Long month);

    TodoDto getTodo(Long todoId);

    void updateTodo(Long todoId, TodoCreateDto todoDto);  // 수정 후 수정된 객체 반환해줌

    void createTodo(Long userId, TodoCreateDto todoDto) throws ParseException;  // 생성 후 생성된 객체 반환해줌

    void deleteTodo(Long todoId);  // 삭제 후에는 리턴값 없음


//    List<SeatDto> getSeatAllByArea(String area) throws Exception;
//    SeatDto getById(Long seatId) throws Exception;void addSeat(SeatDto seatDto) throws Exception;
//    void updateSeat(Long seatId, SeatDto seatDto) throws Exception;
//    void delSeat(Long seatId) throws Exception;
}
