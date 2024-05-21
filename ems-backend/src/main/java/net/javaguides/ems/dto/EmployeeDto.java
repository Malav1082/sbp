package net.javaguides.ems.dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeDto {

    private String empId;
    private String empName;
    private String designation;
    private String department;
    private Date joinedDate;
    private int salary;
    private String addr1;
    private String addr2;
    private String city;
    private String state;
    private String country;
}

