package com.example.ddd_demo.entity;

import lombok.*;

import javax.persistence.*;

@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "seat")
@Entity
public class Seat {

    @Id
    @GeneratedValue
    @Column(name = "seat_id", nullable = false)
    private Long id;
    @Column(name = "is_empty", nullable = false)
    private boolean isEmpty;
    @Column(name = "area", nullable = false)
    private String area;
    @Column(name = "seat_number", nullable = false)
    private Long seatNumber;

    @OneToOne(mappedBy = "seat")
    private User user;

    // 연관관계 편의 메서드
    public void writeOwner(User owner){
        user = owner;
        owner.setSeat(this);
    }
}
