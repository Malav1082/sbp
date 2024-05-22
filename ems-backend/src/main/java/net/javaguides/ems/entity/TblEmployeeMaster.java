package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "TblEmployeeMaster")
public class TblEmployeeMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "MastCode")
    private long mastCode;

    @ManyToOne
    @JoinColumn(name = "UserId")
    private TblUserMaster tblUserMaster;

    @Column(name = "EmpID", unique = true)
    private String empId;

    @Column(name = "EmpName")
    private String empName;

    @Column(name = "Designation")
    private String designation;

    @Column(name = "Department")
    private String department;

    @Column(name = "JoinedDate")
    private Date joinedDate;

    @Column(name = "Salary")
    private int salary;
}
