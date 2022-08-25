//package ssafy.ddokdi.entity;
//
//import lombok.*;
//
//import javax.persistence.*;
//
//@ToString
//@Getter
//@Setter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//@Table(name = "user_desk_setting")
//
//public class UserDeskSetting {
//
//    @Id
//    @GeneratedValue
//    @Column(name = "user_desk_setting_id", nullable = false)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "desk_setting_id", nullable = false)
//    private DeskSetting deskSetting;
//
//    @Column(name = "setting_number", nullable = false)
//    private Long settingNumber;
//
//
//
//}
