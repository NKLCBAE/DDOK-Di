package com.example.ddd_demo.entity;

import lombok.*;

import javax.persistence.*;

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
    @Column(name = "desk_height", nullable = false)
    private Long deskHeight;
    @Column(name = "chair_height", nullable = false)
    private Long chairHeight;


}
