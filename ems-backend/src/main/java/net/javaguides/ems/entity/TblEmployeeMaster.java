package net.javaguides.ems.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Date;
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
@ToString
@Table(name = "TblEmployeeMaster")
@Component
public class TblEmployeeMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "MastCode")
    private long mastCode;

    @ManyToOne
    @JoinColumn(name = "User Id")
    private TblUserMaster tblUserMaster;

    @Column(name = "EmpID", unique = true)
    private String empId;

    @JoinColumn(name = "EmpName")
    private String empName;

    @Column(name = "Designation")
    private String designation;

    @Column(name = "Department")
    private String department;

    @Column(name = "Joined Date")
    private Date joinedDate;

    @Column(name = "Salary")
    private int salary;
}
