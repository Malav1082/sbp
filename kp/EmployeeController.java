package com.recmain.recordmaintenance.controller;

import com.recmain.recordmaintenance.dto.EmployeeDTO;
import com.recmain.recordmaintenance.dto.EmployeeUserDTO;
import com.recmain.recordmaintenance.entities.User;
import com.recmain.recordmaintenance.service.EmployeeService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class EmployeeController {

  @Autowired
  private EmployeeService employeeService;

  @GetMapping("/home")
  public ResponseEntity<?> getEmployees() {
    System.out.println("home");
    List<EmployeeDTO> employees = employeeService.getAllEmployees();
    return ResponseEntity
      .status(HttpStatus.OK)
      .body((employees != null) ? employees : "null");
  }

  @PostMapping("/home/{userid}/add")
  public ResponseEntity<?> addEmployee(
    @RequestBody EmployeeUserDTO employeeUserDTO
  ) {
    try {
      EmployeeDTO e = employeeUserDTO.getEmployee();
      User u = employeeUserDTO.getUser();
      if (employeeService.addEmp(e, u) != null) {
        return ResponseEntity
          .status(HttpStatus.CREATED)
          .body(
            "Employee with Emp ID " + e.getEmpId() + " added successfully!"
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

  @PutMapping("/home/{userid}/update")
  public ResponseEntity<?> updateEmployee(
    @RequestBody EmployeeUserDTO employeeUserDTO
  ) {
    try {
      EmployeeDTO e = employeeUserDTO.getEmployee();
      User u = employeeUserDTO.getUser();
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

  @DeleteMapping("/home/{userid}/delete/{empId}")
  public ResponseEntity<?> deleteEmployee(@PathVariable("empId") String empId) {
    employeeService.deleteEmp(empId);
    return ResponseEntity.ok("Employee with Emp ID " + empId + " deleted.");
  }
}
