package ssafy.ddokdi.dto;


import lombok.*;
import ssafy.ddokdi.entity.Calendar;
import ssafy.ddokdi.enums.PriorityEnum;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoDto {

    private Long id;
    private String title;  // Todo의 제목
    private String datetimeStart;
    private String datetimeEnd;
    private String content;  // Todo의 내용
    private PriorityEnum priority;
    private Long noticeTime;
//    private boolean isPast;

}
