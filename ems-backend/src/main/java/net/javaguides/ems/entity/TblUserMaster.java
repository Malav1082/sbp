package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="TblUserMaster")
public class TblUserMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "UserID")
    private long userId;

    @Column(name = "UserName")
    private String name;

    @Column(name = "MobileNumber")
    private String mobileNumber;

    @Column(name = "Password")
    private String password;
}
