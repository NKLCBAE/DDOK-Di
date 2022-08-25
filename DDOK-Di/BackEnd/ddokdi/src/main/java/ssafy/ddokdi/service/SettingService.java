package ssafy.ddokdi.service;


import ssafy.ddokdi.dto.NoticeDto;
import ssafy.ddokdi.dto.SettingDto;
import ssafy.ddokdi.dto.StatusDto;

import java.util.List;

public interface SettingService {

    public List<SettingDto> getSettingAll(Long userId);
    public SettingDto getSettingOne(Long userId, Long deskIndex);
    public void setSettingOne(SettingDto setInfo, Long userId, Long deskIndex);
//    public void delSettingOne(Long userId, Long deskIndex);
    public StatusDto getStatusOne(Long userId);
    public void updateStatusOne(String status, Long userId);
    public NoticeDto getNoticeOne(Long userId);
    public void updateNoticeOne(NoticeDto notice, Long userId);
}
