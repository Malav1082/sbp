package net.javaguides.ems.dto;

import lombok.Getter;
import lombok.Setter;
import net.javaguides.ems.entity.TblUserMaster;

@Setter
@Getter
public class EmployeeUserDto {

    private EmployeeDto employee;
    private TblUserMaster tblUserMaster;
}

