package net.javaguides.ems.controller;

import com.fasterxml.jackson.databind.JsonNode;
import net.javaguides.ems.service.TblUserMasterService;
import net.javaguides.ems.entity.TblUserMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin("*")
public class TblUserMasterController {

    @Autowired
    public TblUserMasterService tblUserMasterService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody TblUserMaster tblUserMaster) {
        if (tblUserMasterService.getUserByE(tblUserMaster) == null) {
            TblUserMaster u = tblUserMasterService.addUser(tblUserMaster);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(u.getName() + " Registered Successfully");
        } else {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)  // Use 409 Conflict for resource conflict
                    .body("User Already Exists!");
        }
    }

    //    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody TblUserMaster tblUserMaster) {
        TblUserMaster user = tblUserMasterService.getUserByEP(tblUserMaster.getName(), tblUserMaster.getPassword());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials!");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody JsonNode userNewPass) {
        String name = userNewPass.get("name").asText();
        String oldPassword = userNewPass.get("password").asText();
        String newPassword = userNewPass.get("new_password").asText();

        if (tblUserMasterService.resetPassword(name, oldPassword, newPassword)) {
            return ResponseEntity.status(HttpStatus.OK).body("Password Changed Successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials!");
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody JsonNode user) {
        String name = user.get("name").asText();
        String newPassword = user.get("new_password").asText();

        if (tblUserMasterService.forgotPassword(name, newPassword)) {
            return ResponseEntity.status(HttpStatus.OK).body("Password Changed Successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found!");
        }
    }
}
