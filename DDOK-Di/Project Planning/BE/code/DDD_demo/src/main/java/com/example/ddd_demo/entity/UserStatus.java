package com.example.ddd_demo.entity;

import lombok.*;

import javax.persistence.*;

@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_status")
@Entity
public class UserStatus {

    @Id
    @GeneratedValue
    @Column(name = "user_status_id", nullable = false)
    private Long id;
    @Column(name = "status", nullable = false)
    private String status;
}
