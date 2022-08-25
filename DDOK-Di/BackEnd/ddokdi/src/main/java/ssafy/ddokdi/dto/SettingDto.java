package ssafy.ddokdi.dto;

import lombok.*;
import ssafy.ddokdi.entity.DeskSetting;
import ssafy.ddokdi.entity.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SettingDto {

    private Long deskIndex;
    private Float deskHeight;
    private Long monitorHeight;

    public SettingDto(DeskSetting deskSetting) {
        this.deskIndex = deskSetting.getDeskIndex();
        this.deskHeight = deskSetting.getDeskHeight();
        this.monitorHeight = deskSetting.getMonitorHeight();
    }
}
