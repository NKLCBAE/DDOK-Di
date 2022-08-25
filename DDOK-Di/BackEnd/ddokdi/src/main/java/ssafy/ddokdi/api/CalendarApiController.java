package ssafy.ddokdi.api;


import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.ddokdi.dto.TodoCreateDto;
import ssafy.ddokdi.dto.TodoDto;
import ssafy.ddokdi.entity.Todo;
import ssafy.ddokdi.service.TodoService;

import java.text.ParseException;
import java.util.List;

@RestController
public class CalendarApiController {


    @Autowired
    TodoService todoService;

    @ApiOperation(
            value = "개별 유저 한 달 일정 요청",
            notes = "해당 유저의 특정 년월의 모든 일정을 불러옵니다"
    )
    @GetMapping("/todos/{userId}/{year}/{month}")
    public ResponseEntity<List<TodoDto>> getTodos(@RequestHeader(value="Authorization") String token, @PathVariable Long userId, @PathVariable Long year, @PathVariable Long month) throws Exception {
        return new ResponseEntity<List<TodoDto>>(todoService.getAllTodos(userId, year, month), HttpStatus.OK);
    }


    @ApiOperation(
            value = "개별 유저의 개별 일정 요청",
            notes = "해당 유저의 특정 아이디를 불러옵니다."
    )
    @ApiImplicitParam(
            name = "todoId",
            value = "불러올 todo의 Id. 전체 getTodos로 전체 일정을 조회할 때 알 수 있습니다",
            example = "0"
    )
    @GetMapping("/todo/{userId}/{todoId}")
    public ResponseEntity<TodoDto> getTodo(@PathVariable Long userId, @PathVariable Long todoId) {
        return new ResponseEntity<TodoDto>(todoService.getTodo(todoId), HttpStatus.OK);
    }


    @ApiOperation(
            value = "특정 유저의 개별 일정 만들기 요청",
            notes = "일정을 만듭니다.\n 시작일/종료일을 입력할 때 \"yyyy-mm-dd hh:mm:ss\"의 형식을 꼭 지켜주세요."
    )
    @PostMapping("/todo/{userId}")
    public ResponseEntity<String> createTodo(@RequestHeader(value="Authorization") String token, @RequestBody TodoCreateDto todoCreateDto, @PathVariable Long userId) throws ParseException {
        todoService.createTodo(userId, todoCreateDto);
        return new ResponseEntity<String>("Created", HttpStatus.CREATED);
    }


    @ApiOperation(
            value = "특정 유저의 개별 일정 수정",
            notes = "일정을 수정합니다.\n 시작일/종료일을 입력할 때 \"yyyy-mm-dd hh:mm:ss\"의 형식을 꼭 지켜주세요."
    )
    @PutMapping("/todo/{userId}/{todoId}")
    public ResponseEntity<String> updateTodo(@RequestHeader(value="Authorization") String token, @RequestBody TodoCreateDto todoCreateDto, @PathVariable Long userId, @PathVariable Long todoId) {
        todoService.updateTodo(todoId, todoCreateDto);
        return new ResponseEntity<String>("Updated", HttpStatus.ACCEPTED);
    }


    @ApiOperation(
            value = "특정 유저의 개별 일정 삭제",
            notes = "일정을 삭제합니다."
    )
    @DeleteMapping("/todo/{userId}/{todoId}")
    public ResponseEntity<String> deleteTodo(@RequestHeader(value="Authorization") String token, @PathVariable Long userId, @PathVariable Long todoId) {
        todoService.deleteTodo(todoId);
        return new ResponseEntity<String>("Delete Success", HttpStatus.OK);
    }
}


