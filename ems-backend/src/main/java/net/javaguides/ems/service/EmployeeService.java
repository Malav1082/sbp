package net.javaguides.ems.service;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.TblEmployeeDetail;
import net.javaguides.ems.entity.TblEmployeeMaster;
import net.javaguides.ems.entity.TblUserMaster;
import net.javaguides.ems.repository.TblEmployeeDetailRepository;
import net.javaguides.ems.repository.TblEmployeeMasterRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public boolean isEmpIdExists(String empId) {
        return employeeMasterRepository.existsByEmpId(empId);
    }

    public EmployeeDto addEmp(EmployeeDto ed, TblUserMaster user) {
        if (ed == null) {
            throw new IllegalArgumentException("EmployeeDto must not be null");
        }
        if (user == null) {
            throw new IllegalArgumentException("User master must not be null");
        }

        System.out.println("Adding Employee: " + ed);
        System.out.println("With User: " + user);

        // Check if empId already exists
        if (isEmpIdExists(ed.getEmpId())) {
            throw new IllegalArgumentException("Employee with empId " + ed.getEmpId() + " already exists");
        }

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

    public void deleteEmp(String empId) {
        try {
            System.out.println("e"+empId);
            TblEmployeeMaster dm = employeeMasterRepository.findByEmpId(empId);
            employeeDetailRepository.deleteById(dm.getMastCode());
        } catch (NumberFormatException e) {
            System.out.println("e"+empId);
            throw new IllegalArgumentException("Invalid employee ID format: " + empId);
        }
    }

    public EmployeeDto updateEmp(EmployeeDto ed, TblUserMaster user) {
        System.out.println("ed" +ed);
        System.out.println("user" +user);

        TblEmployeeMaster currempmast = employeeMasterRepository.findByEmpId(ed.getEmpId());
        modelMapper.map(ed, currempmast);
        currempmast.setTblUserMaster(user);
        TblEmployeeMaster savedMaster = employeeMasterRepository.save(currempmast);

        TblEmployeeDetail currempdet = employeeDetailRepository.findByEmpCode(
                savedMaster.getMastCode()
        );
        modelMapper.map(ed, currempdet);
        employeeDetailRepository.save(currempdet);
        System.out.println(ed);
        return ed;
    }


    public Page<EmployeeDto> getAllEmployees(int page, int size, String sortField, String sortDirection, String search) {
        Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<TblEmployeeMaster> mastersPage;
        if (search != null && !search.isEmpty()) {
            mastersPage = employeeMasterRepository.findByEmpNameContainingIgnoreCase(search, pageable);
        } else {
            mastersPage = employeeMasterRepository.findAll(pageable);
        }

        return mastersPage.map(master -> {
            TblEmployeeDetail detail = employeeDetailRepository.findById(master.getMastCode()).orElse(null);
            return convertToDto(master, detail);
        });
    }

    private EmployeeDto convertToDto(TblEmployeeMaster master, TblEmployeeDetail detail) {
        EmployeeDto dto = modelMapper.map(master, EmployeeDto.class);
        if (detail != null) {
            modelMapper.map(detail, dto);
        }
        return dto;
    }
}