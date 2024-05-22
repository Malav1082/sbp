package net.javaguides.ems.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.TblUserMaster;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/home")
    public ResponseEntity<?> getEmployees() {
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(employees);
    }

    @PostMapping("/home/add")
    public ResponseEntity<?> addEmployee(@RequestBody JsonNode eud) {
        System.out.println("add");
        try {
            if (eud.has("employee") && eud.has("user")) {
                EmployeeDto employeeDTO = objectMapper.treeToValue(eud.get("employee"), EmployeeDto.class);
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
}

