package ssafy.ddokdi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.ddokdi.dto.NoticeDto;
import ssafy.ddokdi.dto.SettingDto;
import ssafy.ddokdi.dto.StatusDto;
import ssafy.ddokdi.entity.DeskSetting;
import ssafy.ddokdi.entity.User;
import ssafy.ddokdi.enums.StatusEnum;
import ssafy.ddokdi.repository.DeskSettingRepository;
import ssafy.ddokdi.repository.UserRepository;

import java.util.*;

@Service
public class SettingServiceImpl implements SettingService {

    @Autowired
    public DeskSettingRepository deskSettingRepository;
    @Autowired
    public UserRepository userRepository;


    @Override
    @Transactional
    public List<SettingDto> getSettingAll(Long userId) {
        // User 데이터 끌어오기
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User");
        }


        List<SettingDto> sdList = new ArrayList<>();

        User user = userOpt.get();

        // User 객체의 필드변수로 존재하는 DeskSetting List를 dto List에 옮겨담기
        for (DeskSetting ds : user.getDeskSettings()) {
            SettingDto sd = SettingDto.builder()
                    .deskIndex(ds.getDeskIndex())
                    .deskHeight(ds.getDeskHeight())
                    .monitorHeight(ds.getMonitorHeight())
                    .build();
            sdList.add(sd);
        }

        return sdList;
    }

    @Override
    @Transactional
    public SettingDto getSettingOne(Long userId, Long deskIndex) {
        // User 데이터 끌어오기
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User");
        }


        SettingDto sd = new SettingDto();
        User user = userOpt.get();

        // 해당 유저가 가진 DeskSetting 중에서 우리가 원하는 deskIndex를 가진 DeskSetting의 데이터를 추출하기
        for (DeskSetting ds : user.getDeskSettings()) {
            if (ds.getDeskIndex() == deskIndex) {
                sd = SettingDto.builder()
                        .deskIndex(ds.getDeskIndex())
                        .deskHeight(ds.getDeskHeight())
                        .monitorHeight(ds.getMonitorHeight())
                        .build();
                break;
            }
        }
        return sd;
    }

    @Override
    @Transactional
    public void setSettingOne(SettingDto setInfo, Long userId, Long deskIndex) throws NoSuchElementException {

        Optional<User> opUser = userRepository.findById(userId);
        if (opUser.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User");
        }


        User user = opUser.get();
        Optional<DeskSetting> opDeskSetting = deskSettingRepository.findByUserAndDeskIndex(user, deskIndex);
        if (opDeskSetting.isEmpty()) {
            throw new NoSuchElementException("No DeskSetting Index " + deskIndex + " for " + user.getName());
        }


        DeskSetting deskSetting = opDeskSetting.get();
        Long id = deskSetting.getId();
        deskSetting = DeskSetting.builder()
                .id(id)
                .deskHeight(setInfo.getDeskHeight())
                .monitorHeight(setInfo.getMonitorHeight())
                .deskIndex(deskIndex)
                .user(User.builder().id(userId).build())
                .build();
        deskSettingRepository.save(deskSetting);

    }


//    @Override
//    public void delSettingOne(Long userId, Long deskIndex) {
//        // User 데이터 가져오기
//        Optional<User> userBaby = userRepository.findById(userId);
//        User user = new User();
//        if (userBaby.isPresent()) {
//            user = userBaby.get();
//
//            // 해당 유저가 가진 DeskSetting 중에서 목표 deskIndex를 가진 DeskSetting의 id를 추출
//            Long targetId = -1L;
//            for (DeskSetting ds : user.getDeskSettings()) {
//                if (Objects.equals(ds.getDeskIndex(), deskIndex)) {
//                    targetId = ds.getId();
//                    break;
//                }
//            }
//
//            // 얻은 DeskSetting의 id로 해당 DeskSetting 삭제
//            deskSettingRepository.deleteById(targetId);
//        }
//    }

    @Override
    @Transactional
    public StatusDto getStatusOne(Long userId) {
        Optional<User> userBaby = userRepository.findById(userId);
        if (userBaby.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User");
        }


        StatusDto sd = new StatusDto();
        User user = userBaby.get();
        // 해당 유저가 가진 Status 정보와 Seat 정보 추출
        sd = StatusDto.builder()
                .status(user.getUserStatus().name())
                .seatId(user.getSeat().getId())
                .area(user.getSeat().getArea().getZone())
                .seatNumber(user.getSeat().getSeatNumber())
                .build();

        return sd;
    }

    @Override
    @Transactional
    public void updateStatusOne(String status, Long userId) {
        Optional<User> userBaby = userRepository.findById(userId);
        if (userBaby.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User");
        }


        User user = userBaby.get();

        // 입력받은 status가 enum에 있는 status인가 확인 후 해당 user에게 반영
        // StatusEnum에 없는 상태이름이 들어온 경우 IlegalArgumentException이 발생.
        // 설명 : valueOf() 메서드는 대소문자를 구분하며 잘못된 문자열과 함께 IlegalArgumentException이 발생합니다.
        try {
            StatusEnum checkStatus = StatusEnum.valueOf(status);
            user.setUserStatus(checkStatus);
            userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("The status is not belong to StatusEnum");
        }
    }

    @Override
    @Transactional
    public NoticeDto getNoticeOne(Long userId) {
        Optional<User> userBaby = userRepository.findById(userId);
        if (userBaby.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User");
        }

        NoticeDto nd = new NoticeDto();
        User user = userBaby.get();
        nd = NoticeDto.builder()
                .noticeDisplay(user.isNoticeDisplay())
                .noticeSound(user.isNoticeSound())
                .noticeVibration(user.isNoticeVibration())
                .build();


        return nd;
    }

    @Override
    @Transactional
    public void updateNoticeOne(NoticeDto notice, Long userId) {
        Optional<User> userBaby = userRepository.findById(userId);
        if (userBaby.isEmpty()) {
            throw new NoSuchElementException("Non-Existent User");
        }

        User user = userBaby.get();

        user.setNoticeDisplay(notice.isNoticeDisplay());
        user.setNoticeSound(notice.isNoticeSound());
        user.setNoticeVibration(notice.isNoticeVibration());

        userRepository.save(user);
    }
}
