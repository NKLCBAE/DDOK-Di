package ssafy.ddokdi.repository;

import ssafy.ddokdi.entity.Todo;
import ssafy.ddokdi.entity.User;

import java.util.List;

public interface TodoRepositoryCustom {
    List<Todo> getTodoByYearAndMonth(User user, Long year, Long month);
}
