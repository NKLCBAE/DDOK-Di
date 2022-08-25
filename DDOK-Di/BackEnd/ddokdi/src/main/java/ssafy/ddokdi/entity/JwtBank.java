package ssafy.ddokdi.entity;

import lombok.*;

import javax.persistence.*;

@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "jwt_bank", uniqueConstraints = @UniqueConstraint(columnNames={"ticket"}))
@Entity
public class JwtBank {

    @Id
    @Column(name = "ticket", nullable = false)
    private String ticket;
    @Column(name = "jwt", nullable = false)
    private String jwt;
    @Column(name = "email", nullable = false)
    private String email;
}
