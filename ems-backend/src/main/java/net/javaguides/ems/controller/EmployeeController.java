package net.javaguides.ems.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.dto.EmployeeUserDto;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<?> getEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<EmployeeDto> employeesPage = employeeService.getAllEmployees(page, size);
        System.out.println(" page " +page + " size " +size);
        return ResponseEntity.status(HttpStatus.OK).body(employeesPage);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addEmployee(@RequestBody EmployeeUserDto employeeUserDto) {
        System.out.println("add");
        try {
            EmployeeDto employeeDTO = employeeUserDto.getEmployee();

            if (employeeDTO == null) {
                System.out.println("ed null");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee data is missing");
            }

            EmployeeDto addedEmployee = employeeService.addEmp(employeeDTO);
            if (addedEmployee != null) {
                return ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body("Employee with emp ID " + addedEmployee.getEmpId() + " added successfully!");
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

    @DeleteMapping("/delete/{empId}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("empId") String empId) {
        employeeService.deleteEmp(empId);
        return ResponseEntity.ok("Employee with Emp ID " + empId + " deleted.");
    }

    @PutMapping("/update/{empId}")
    public ResponseEntity<?> updateEmployee(@RequestBody EmployeeUserDto employeeUserDTO) {
        System.out.println("employeeUserDTO" + employeeUserDTO);
        try {
            EmployeeDto e = employeeUserDTO.getEmployee();
            if (employeeService.updateEmp(e) != null) {
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
