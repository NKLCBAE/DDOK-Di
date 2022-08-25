package ssafy.ddokdi.entity;


import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "calendar")
@Entity
public class Calendar {


    @Id
    @GeneratedValue
    @Column(name = "calendar_id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "calendar", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Todo> todos;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    public Calendar(User user) {
        this.user = user;
    }
    // 외래키를 캘린더에 두고 user와 1:1 관계 만들어주기




}
