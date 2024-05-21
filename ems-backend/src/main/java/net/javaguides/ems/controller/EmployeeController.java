package net.javaguides.ems.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.TblEmployeeMaster;
import net.javaguides.ems.entity.TblUserMaster;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/home")
    public ResponseEntity<?> getEmployees() {
        System.out.println("home");
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body((employees != null) ? employees : "null");
    }

    @PostMapping("/home/{userid}/add")
    public ResponseEntity<?> addEmployee(@RequestBody JsonNode eud) {
        try {
            EmployeeDto employeeDTO = objectMapper.treeToValue(eud.get("employee"), EmployeeDto.class);
            TblUserMaster user = objectMapper.treeToValue(eud.get("user"), TblUserMaster.class); // Corrected this line
            System.out.println("add method");
            System.out.println("ed: " + employeeDTO);
            System.out.println("u: " + user);
            if (employeeService.addEmp(employeeDTO, user) != null) {
                return ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(
                                "Employee with emp ID " +
                                        employeeDTO.getEmpId() +
                                        " added successfully!"
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

