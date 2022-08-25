package ssafy.ddokdi.dto;

import lombok.*;
import ssafy.ddokdi.entity.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeDto {
    // 가독성을 위해 DSV 순서 준수하자.
    private boolean noticeDisplay;
    private boolean noticeSound;
    private boolean noticeVibration;

    public NoticeDto(User user) {
        this.noticeDisplay = user.isNoticeDisplay();
        this.noticeSound = user.isNoticeSound();
        this.noticeVibration = user.isNoticeVibration();
    }
}
