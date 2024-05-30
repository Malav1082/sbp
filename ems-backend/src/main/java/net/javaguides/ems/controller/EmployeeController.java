package net.javaguides.ems.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.dto.EmployeeUserDto;
import net.javaguides.ems.entity.TblUserMaster;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ObjectMapper objectMapper;

//    @GetMapping("/home")
//    public ResponseEntity<?> getEmployees(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size,
//            @RequestParam(defaultValue = "empName") String sortField,
//            @RequestParam(defaultValue = "asc") String sortDirection,
//            @RequestParam(defaultValue = "") String search) {
//
//        System.out.println("page"+page+","+sortField+","+sortDirection+","+search);
//        Page<EmployeeDto> employeesPage = employeeService.getAllEmployees(page, size, sortField, sortDirection, search);
//        return ResponseEntity.status(HttpStatus.OK).body(employeesPage);
//    }

    @GetMapping("/home")
    public ResponseEntity<?> getEmployees() {
        System.out.println("home");
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body((employees != null) ? employees : "null");
    }

    @PostMapping("/home/add")
    public ResponseEntity<?> addEmployee(@RequestBody JsonNode eud) {
        System.out.println("add");
        try {
            if (eud.has("employee") && eud.has("user")) {
                EmployeeDto employeeDTO = objectMapper.treeToValue(eud.get("employee"), EmployeeDto.class);
                System.out.println("eud" + eud);
                TblUserMaster user = objectMapper.treeToValue(eud.get("user"), TblUserMaster.class);

                if (employeeDTO == null) {
                    System.out.println("ed null");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee data is missing");
                }
                if (user == null) {
                    System.out.println("u null");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User data is missing");
                }

                EmployeeDto addedEmployee = employeeService.addEmp(employeeDTO, user);
                if (addedEmployee != null) {
                    return ResponseEntity
                            .status(HttpStatus.CREATED)
                            .body("Employee with emp ID " + addedEmployee.getEmpId() + " added successfully!");
                } else {
                    return ResponseEntity
                            .status(HttpStatus.BAD_REQUEST)
                            .body("Insertion Failed!");
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON structure");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/home/delete/{empId}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("empId") String empId) {
        employeeService.deleteEmp(empId);
        return ResponseEntity.ok("Employee with Emp ID " + empId + " deleted.");
    }

    @PutMapping("/home/update/{empId}")
    public ResponseEntity<?> updateEmployee(@RequestBody EmployeeUserDto employeeUserDTO) {
        System.out.println("employeeUserDTO" + employeeUserDTO);
        try {
            EmployeeDto e = employeeUserDTO.getEmployee();
            TblUserMaster u = employeeUserDTO.getUser();
            System.out.println("user" + u);
            if (employeeService.updateEmp(e, u) != null) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(
                                "Employee with Emp ID " + e.getEmpId() + " updated successfully!"
                        );
            } else {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Insertion Failed!");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
