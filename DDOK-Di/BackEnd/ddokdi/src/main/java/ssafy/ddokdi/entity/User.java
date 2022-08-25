package ssafy.ddokdi.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ssafy.ddokdi.enums.RoleEnum;
import ssafy.ddokdi.enums.StatusEnum;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames={"email"}))
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "height", nullable = true)
    private Long height;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "profile_url", nullable = true)
    private String profileUrl;

    @Column(name = "position", nullable = false)
    private String position;

    @Column(name = "employee_number", nullable = false)
    private Long employeeNumber;

    @Column(name= "user_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusEnum userStatus;

    @Column(name = "user_role", nullable = false)  // 기본은 ROLE_USER
    @Enumerated(EnumType.STRING)
    private RoleEnum userRole;

    @Column(name = "notice_display", nullable = false)
    private boolean noticeDisplay;

    @Column(name = "notice_sound", nullable = false)
    private boolean noticeSound;

    @Column(name = "notice_vibration", nullable = false)
    private boolean noticeVibration;

    @Column(name = "login_card_number", nullable = true)
    private String loginCardNumber;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)  // orphanRemoval은 고아 객체를 삭제하는 옵션
    @Builder.Default
    // mappedBy하는 친구는 실제 테이블에 매핑되는(테이블에 구현되는) 친구가 아니므로
    // @JoinColumn을 붙이지 않는다.
    private List<DeskSetting> deskSettings = new ArrayList<>();

    //    @Column(name = "seat_id", nullable = true)
    //    private int seatId;
    @OneToOne
    @JoinColumn(name= "seat_id", nullable = true)
    private Seat seat;

    // 데스크 세팅 추가 연관관계 편의 메서드
    // 유저에 데스크 세팅을 추가하면 동시에 해당 데스크 세팅에 유저의 정보를 남김.
    public void addDeskSetting(DeskSetting deskSetting){
        deskSettings.add(deskSetting);
        deskSetting.setUser(this);
    }

    @OneToOne(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private Calendar calendar;

    // 자리 할당 연관관계 편의 메서드
    // 유저에 자리할당함과 동시에 그 자리에 유저의 정보를 넣고 notEmpty 처리함.
    public void allocateSeat(Seat alloc){
        seat = alloc;
        alloc.setUser(this);
        alloc.setFull(true);
    }


    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(userRole.name()));
        return authorities;

//        return this.roles.stream()
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
