package ssafy.ddokdi.entity;


import lombok.*;

import javax.persistence.*;

@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_role")
@Entity

public class TodoPriority {

    @Id
    @GeneratedValue
    @Column(name = "todo_priority_id", nullable = false)
    private Long id;

    @Column(name = "role", nullable = false)
    private String role;
}
