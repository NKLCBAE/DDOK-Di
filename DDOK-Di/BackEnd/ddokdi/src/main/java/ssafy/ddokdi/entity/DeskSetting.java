package ssafy.ddokdi.entity;

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
@Table(name = "desk_setting")
@Entity
public class DeskSetting {
    @Id
    @GeneratedValue
    @Column(name = "desk_setting_id", nullable = false)
    private Long id;
    @Column(name = "desk_height", nullable = true)
    private Float deskHeight;
    @Column(name = "monitor_height", nullable = true)
    private Long monitorHeight;
    @Column(name = "desk_index", nullable = true)
    private Long deskIndex;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;



}
