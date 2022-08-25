package ssafy.ddokdi.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.text.ParseException;
import java.time.DateTimeException;
import java.util.NoSuchElementException;

@ControllerAdvice
@Slf4j
public class ExceptionHandler {
    // 날짜 규격에 맞지 않는 입력이 들어왔을때
    @org.springframework.web.bind.annotation.ExceptionHandler(ParseException.class)
    public ResponseEntity<String> handleParseException(ParseException e) {
        log.error("ParseException", e);
        log.error(e.getMessage());
        log.error(e.getLocalizedMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // 시작시간이 종료시간보다 뒤일때
    @org.springframework.web.bind.annotation.ExceptionHandler(DateTimeException.class)
    public ResponseEntity<String> handleDateTimeException(DateTimeException e) {
        log.error("DateTimeException", e);
        log.error(e.getMessage());
        log.error(e.getLocalizedMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // user, todo 등 원하는 대상이 없을때
    @org.springframework.web.bind.annotation.ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException e) {
        log.error("NoSuchElementException", e);
        log.error(e.getMessage());
        log.error(e.getLocalizedMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    // 이미 할당된 자리, 이미 존재하는 이메일을 사용하는 등 사용자가 규칙을 위반할때
    @org.springframework.web.bind.annotation.ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        log.error("RuntimeException", e);
        log.error(e.getMessage());
        log.error(e.getLocalizedMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
