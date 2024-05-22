package net.javaguides.ems.service;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.TblEmployeeDetail;
import net.javaguides.ems.entity.TblEmployeeMaster;
import net.javaguides.ems.entity.TblUserMaster;
import net.javaguides.ems.repository.TblEmployeeDetailRepository;
import net.javaguides.ems.repository.TblEmployeeMasterRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private TblEmployeeMasterRepository employeeMasterRepository;

    @Autowired
    private TblEmployeeDetailRepository employeeDetailRepository;

    @Autowired
    private ModelMapper modelMapper;

    public EmployeeDto addEmp(EmployeeDto ed, TblUserMaster user) {
        if (ed == null) {
            throw new IllegalArgumentException("EmployeeDto must not be null");
        }
        if (user == null) {
            throw new IllegalArgumentException("User master must not be null");
        }

        System.out.println("Adding Employee: " + ed);
        System.out.println("With User: " + user);

        TblEmployeeMaster tblEmployeeMaster = modelMapper.map(ed, TblEmployeeMaster.class);
        tblEmployeeMaster.setTblUserMaster(user);
        TblEmployeeMaster savedMaster = employeeMasterRepository.save(tblEmployeeMaster);
        System.out.println(savedMaster);

        TblEmployeeDetail tblEmployeeDetail = modelMapper.map(ed, TblEmployeeDetail.class);
        tblEmployeeDetail.setEmpCode(savedMaster.getMastCode()); // Set EmpCode from savedMaster's MastCode
        tblEmployeeDetail.setTblEmployeeMaster(savedMaster);

        System.out.println(tblEmployeeDetail);
        employeeDetailRepository.save(tblEmployeeDetail);

        System.out.println("detail Saved");
        return ed;
    }

    public List<EmployeeDto> getAllEmployees() {
        return employeeMasterRepository
                .findAll()
                .stream()
                .map(master -> {
                    TblEmployeeDetail detail = employeeDetailRepository
                            .findById(master.getMastCode())
                            .orElse(null);
                    EmployeeDto dto =convertToDto(master, detail);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    private EmployeeDto convertToDto(TblEmployeeMaster master, TblEmployeeDetail detail) {
        EmployeeDto dto = modelMapper.map(master, EmployeeDto.class);
        if (detail != null) {
            modelMapper.map(detail, dto);
        }
        return dto;
    }
}
