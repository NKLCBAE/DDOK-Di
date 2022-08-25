package ssafy.ddokdi.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import ssafy.ddokdi.entity.QTodo;
import ssafy.ddokdi.entity.Todo;
import ssafy.ddokdi.entity.User;

import java.util.List;

public class TodoRepositoryImpl implements TodoRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public TodoRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    QTodo todo = new QTodo("m"); // 생성되는 JPQL의 별칭을 m으로 한다.

    @Override
    public List<Todo> getTodoByYearAndMonth(User user, Long year, Long month) {

        return queryFactory
                .selectFrom(todo)
                .where(todo.datetimeEnd.month().eq(month.intValue()),
                        todo.datetimeEnd.year().eq(year.intValue()),
                        todo.calendar.user.eq(user))
                .fetch();
    }
}
