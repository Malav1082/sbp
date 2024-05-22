package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "TblEmployeeDetail")
public class TblEmployeeDetail {

    @Id
    @Column(name = "EmpCode")
    private Long empCode;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "EmpCode")
    private TblEmployeeMaster tblEmployeeMaster;

    @Column(name = "AddressLine1")
    private String addr1;

    @Column(name = "AddressLine2")
    private String addr2;

    @Column(name = "City")
    private String city;

    @Column(name = "State")
    private String state;

    @Column(name = "Country")
    private String country;
}
