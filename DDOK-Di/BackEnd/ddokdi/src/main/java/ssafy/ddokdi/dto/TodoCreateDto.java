package ssafy.ddokdi.dto;

import lombok.*;
import ssafy.ddokdi.enums.PriorityEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoCreateDto {

    private String title;
    private String datetimeStart;
    private String datetimeEnd;
    private String content;  // Todo의 내용
    private PriorityEnum priority;
    private Long noticeTime;

}