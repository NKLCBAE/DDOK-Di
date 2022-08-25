package ssafy.ddokdi.entity;

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
public class
Seat {

    @Id
    @GeneratedValue
    @Column(name = "seat_id", nullable = false)
    private Long id;
    @Column(name = "is_full", nullable = false)
    private boolean isFull;
    @Column(name = "seat_number", nullable = false)
    private Long seatNumber;
    @Column(name = "left_pos", nullable = true)
    private Long leftPos;
    @Column(name = "top_pos", nullable = true)
    private Long topPos;
    @Column(name = "is_vertical", nullable = true)
    private boolean isVertical;

    @ManyToOne
    @JoinColumn(name = "area", nullable = false)
    private Area area;
    @OneToOne(mappedBy = "seat")
    private User user;

    // 연관관계 편의 메서드
    public void writeOwner(User owner){
        user = owner;
        owner.setSeat(this);
    }
}
