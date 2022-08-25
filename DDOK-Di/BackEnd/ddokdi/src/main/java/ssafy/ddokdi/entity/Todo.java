package ssafy.ddokdi.entity;


import lombok.*;
import ssafy.ddokdi.enums.PriorityEnum;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "todo")
@Entity
public class Todo {
    @Id
    @GeneratedValue
    @Column(name = "todo_id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    // datetime에는 Temporal 어노테이션을 붙여주어야 함
    @Column(name = "datetime_start", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date datetimeStart;

    @Column(name = "todo_datetime_end", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date datetimeEnd;

    @Column(name = "content", nullable = true)
    @Lob
    private String content;  // Todo의 내용

    @Column(name = "priority", nullable = false, columnDefinition = ("varchar(20) default 'NORMAL'")) // 기본값은 todoservice에서 normal로 설정해주자
    @Enumerated(EnumType.STRING)
    private PriorityEnum priority;

    @Column(name = "notice_time", nullable = true)  // 언제 울릴지 시작시간 기준으로 분단위로 적어주기
    private Long noticeTime;


    @ManyToOne  // 어떤 유저의 캘린더에 등록할지 결정
    @JoinColumn(name = "calendar_id", nullable = true)
    private Calendar calendar;









}
