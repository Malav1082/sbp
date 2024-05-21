package net.javaguides.ems.service;

import java.util.List;
import java.util.stream.Collectors;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.TblEmployeeDetail;
import net.javaguides.ems.entity.TblEmployeeMaster;
import net.javaguides.ems.entity.TblUserMaster;
import net.javaguides.ems.repository.TblEmployeeDetailRepository;
import net.javaguides.ems.repository.TblEmployeeMasterRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private TblEmployeeMasterRepository employeeMasterRepository;

    @Autowired
    private TblEmployeeDetailRepository employeeDetailRepository;

    @Autowired
    private ModelMapper modelMapper;

    public EmployeeDto addEmp(EmployeeDto ed, TblUserMaster u) {
        // Ensure TblUserMaster object is not null
        if (u == null) {
            throw new IllegalArgumentException("User master must not be null");
        }

        // Map EmployeeDto to TblEmployeeMaster
        TblEmployeeMaster tblEmployeeMaster = modelMapper.map(ed, TblEmployeeMaster.class);
        tblEmployeeMaster.setTblUserMaster(u);  // Set the user master

        // Save TblEmployeeMaster entity
        TblEmployeeMaster savedMaster = employeeMasterRepository.save(tblEmployeeMaster);

        // Map EmployeeDto to TblEmployeeDetail
        TblEmployeeDetail tblEmployeeDetail = modelMapper.map(ed, TblEmployeeDetail.class);
        tblEmployeeDetail.setEmpCode(savedMaster.getMastCode());
        tblEmployeeDetail.setEmployeeMaster(savedMaster);

        // Save TblEmployeeDetail entity
        employeeDetailRepository.save(tblEmployeeDetail);

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
                    return convertToDto(master, detail);
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
