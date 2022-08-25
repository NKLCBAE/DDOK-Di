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
@Table(name = "area", uniqueConstraints = @UniqueConstraint(columnNames={"zone"}))
@Entity
public class Area {
    @Id
    @Column(name = "zone", nullable = false)
    private String zone;

    @OneToMany(mappedBy = "area", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<Seat> seats = new ArrayList<>();

    // seat 추가 연관관계 편의 메서드
    public void addDeskSetting(Seat seat){
        seats.add(seat);
        seat.setArea(this);
    }
}
