package com.recmain.recordmaintenance.service;

import com.recmain.recordmaintenance.dto.EmployeeDTO;
import com.recmain.recordmaintenance.entities.EmployeeDetail;
import com.recmain.recordmaintenance.entities.EmployeeMaster;
import com.recmain.recordmaintenance.entities.User;
import com.recmain.recordmaintenance.repository.EmployeeDetailRepository;
import com.recmain.recordmaintenance.repository.EmployeeMasterRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

  @Autowired
  private EmployeeMasterRepository employeeMasterRepository;

  @Autowired
  private EmployeeDetailRepository employeeDetailRepository;

  @Autowired
  private ModelMapper modelMapper;

  public EmployeeDTO addEmp(EmployeeDTO ed, User u) {
    EmployeeMaster employeeMaster = modelMapper.map(ed, EmployeeMaster.class);
    employeeMaster.setUser(u);
    EmployeeMaster savedMaster = employeeMasterRepository.save(employeeMaster);

    EmployeeDetail employeeDetail = modelMapper.map(ed, EmployeeDetail.class);
    employeeDetail.setEmpCode(savedMaster.getMastCode());
    employeeDetail.setEmployeeMaster(savedMaster);
    employeeDetailRepository.save(employeeDetail);

    return ed;
  }

  public EmployeeDTO updateEmp(EmployeeDTO ed, User u) {
    EmployeeMaster currempmast = employeeMasterRepository.findByEmpId(
      ed.getEmpId()
    );
    modelMapper.map(ed, currempmast);
    currempmast.setUser(u);
    EmployeeMaster savedMaster = employeeMasterRepository.save(currempmast);

    EmployeeDetail currempdet = employeeDetailRepository.findByEmpCode(
      savedMaster.getMastCode()
    );
    modelMapper.map(ed, currempdet);
    employeeDetailRepository.save(currempdet);

    return ed;
  }

  public void deleteEmp(String empId) {
    EmployeeMaster dm = employeeMasterRepository.findByEmpId(empId);
    employeeDetailRepository.deleteById(dm.getMastCode());
  }

  public List<EmployeeDTO> getAllEmployees() {
    return employeeMasterRepository
      .findAll()
      .stream()
      .map(master -> {
        EmployeeDetail detail = employeeDetailRepository
          .findById(master.getMastCode())
          .orElse(null);
        EmployeeDTO dto = convertToDto(master, detail);
        return dto;
      })
      .collect(Collectors.toList());
  }

  private EmployeeDTO convertToDto(
    EmployeeMaster master,
    EmployeeDetail detail
  ) {
    EmployeeDTO dto = modelMapper.map(master, EmployeeDTO.class);
    modelMapper.map(detail, dto);
    return dto;
  }
}
