package com.example.ddd_demo.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
@Entity
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id", nullable = false)
    private Long id;
    @Column(name = "account_id", nullable = false)
    private Long accountId;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "height", nullable = true)
    private Long height;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;
    @Column(name = "profile_url", nullable = true)
    private String profileUrl;
    @Column(name = "position", nullable = false)
    private String position;
    @Column(name = "employeeNumber", nullable = false)
    private Long employeeNumber;

    @Column(name = "notice_display", nullable = false)
    private boolean noticeDisplay;
    @Column(name = "notice_sound", nullable = false)
    private boolean noticeSound;
    @Column(name = "notice_vibration", nullable = false)
    private boolean noticeVibration;

    @OneToMany(mappedBy = "user")
    // mappedBy하는 친구는 실제 테이블에 매핑되는(테이블에 구현되는) 친구가 아니므로
    // @JoinColumn을 붙이지 않는다.
    private List<UserDeskSetting> udss = new ArrayList<>();

    //    @Column(name = "seat_id", nullable = true)
    //    private int seatId;
    @OneToOne
    @JoinColumn(name= "seat_id", nullable = true)
    private Seat seat;

    //    @Column(name = "userStatus_id", nullable = false)
    //    private int userStatusId;
    @OneToOne
    @JoinColumn(name= "user_status_id", nullable = true)
    private UserStatus userStatus;

    // 연관관계 편의 메서드
    public void addUserDeskSetting(UserDeskSetting uds){
        udss.add(uds);
        uds.setUser(this);
    }

    // 연관관계 편의 메서드
    public void allocateSeat(Seat alloc){
        seat = alloc;
        alloc.setUser(this);
        alloc.setEmpty(false);
    }


}
