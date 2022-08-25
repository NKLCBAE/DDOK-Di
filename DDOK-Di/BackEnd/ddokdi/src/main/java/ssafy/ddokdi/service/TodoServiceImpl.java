package ssafy.ddokdi.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.ddokdi.dto.TodoCreateDto;
import ssafy.ddokdi.dto.TodoDto;
import ssafy.ddokdi.entity.Todo;
import ssafy.ddokdi.entity.User;
import ssafy.ddokdi.repository.CalendarRepository;
import ssafy.ddokdi.repository.TodoRepository;
import ssafy.ddokdi.repository.UserRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.util.*;

@Service
public class TodoServiceImpl implements TodoService{

    @Autowired
    TodoRepository todoRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CalendarRepository calendarRepository;



    @Override
    @Transactional
    public List<TodoDto> getAllTodos(Long userId, Long year, Long month) throws NoSuchElementException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User");
        }

        List<Todo> todoList = todoRepository.getTodoByYearAndMonth(user.get(), year, month);
        List<TodoDto> todoDtoList = new ArrayList<>();

        for (Todo todo : todoList) {
            TodoDto todoDto = TodoDto.builder()
                    .id(todo.getId())
                    .title(todo.getTitle())
                    .datetimeStart(todo.getDatetimeStart().toString())
                    .datetimeEnd(todo.getDatetimeEnd().toString())
                    .content(todo.getContent())
                    .noticeTime(todo.getNoticeTime())
                    .priority(todo.getPriority())
                    .build();

            todoDtoList.add(todoDto);
        }

        return todoDtoList;
    }

    @Override
    @Transactional
    public TodoDto getTodo(Long todoId) throws NoSuchElementException{
        Optional<Todo> opTodo = todoRepository.findById(todoId);
        if (opTodo.isEmpty()) {
            throw new NoSuchElementException("Non-Existent Todo");
        }

        Todo todo = opTodo.get();

        return TodoDto.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .datetimeStart(todo.getDatetimeStart().toString())
                .datetimeEnd(todo.getDatetimeEnd().toString())
                .content(todo.getContent())
                .noticeTime(todo.getNoticeTime())
                .priority(todo.getPriority())
                .build();
    }


    @Override
    @Transactional
    public void createTodo(Long userId, TodoCreateDto todoCreateDto) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User");
        }

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Date start;
        Date end;
        try {
            start = formatter.parse(todoCreateDto.getDatetimeStart());
            end = formatter.parse(todoCreateDto.getDatetimeEnd());
        }catch (ParseException e){
            throw new DateTimeException("Invalid Date format");
        }

        if(start.after(end)){
            throw new DateTimeException("End time is being after Start time");
        }
        System.out.println(start);
        System.out.println(end);


        Todo todo;
        try {
            todo = Todo.builder()
                    .title(todoCreateDto.getTitle())
                    .datetimeStart(start)
                    .datetimeEnd(end)
                    .content(todoCreateDto.getContent())
                    .noticeTime(todoCreateDto.getNoticeTime())
                    .priority(todoCreateDto.getPriority())
                    .calendar(user.get().getCalendar())
                    .build();
            todoRepository.save(todo);
            System.out.println("Todo 객체를 저장하였습니다.");

        } catch(Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @Override
    @Transactional
    public void updateTodo(Long todoId, TodoCreateDto todoCreateDto) throws NoSuchElementException {

        Optional<Todo> opTodo = todoRepository.findById(todoId);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        if (opTodo.isEmpty()) {
            throw new NoSuchElementException("Non-Existent Todo");
        }

        Todo todo = opTodo.get();

        try {
        todo = Todo.builder()
                .id(todo.getId())
                .title(todoCreateDto.getTitle())
                .calendar(todo.getCalendar())
                .datetimeStart(formatter.parse(todoCreateDto.getDatetimeStart()))
                .datetimeEnd(formatter.parse(todoCreateDto.getDatetimeEnd()))
                .content(todoCreateDto.getContent())
                .noticeTime(todoCreateDto.getNoticeTime())
                .priority(todoCreateDto.getPriority())
                .build();

        System.out.println("입력된 Todo를 보여드립니다.");
        System.out.println(todo.toString());

        todoRepository.save(todo);

        } catch(Exception e) {
            System.out.println(e.getMessage());
        }
    }


    @Override
    @Transactional
    public void deleteTodo(Long todoId) {
        Optional<Todo> opTodo = todoRepository.findById(todoId);

        if (opTodo.isEmpty()) {
            throw new NoSuchElementException("Non-Existent Todo");
        }

        todoRepository.delete(opTodo.get());

    }


}
