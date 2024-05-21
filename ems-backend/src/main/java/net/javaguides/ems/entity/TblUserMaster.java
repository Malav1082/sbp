package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="TblUserMaster")
public class TblUserMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private long userId;

    @Column(name = "UserName", nullable = false)
    private String name;

    @Column(name = "MobileNumber", nullable = false)
    private String mobileNumber;

    @Column(name = "Password", nullable = false)
    private String password;

}
