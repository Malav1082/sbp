package net.javaguides.ems.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TblEmployeeDetail")
@Component
@ToString
public class TblEmployeeDetail {

    @Id
    @Column(name = "EmpCode")
    private long empCode;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "EmpCode")
    private TblEmployeeMaster employeeMaster;

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
