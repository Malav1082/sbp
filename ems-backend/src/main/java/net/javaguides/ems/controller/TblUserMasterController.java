package net.javaguides.ems.controller;

import com.fasterxml.jackson.databind.JsonNode;
import net.javaguides.ems.Jwt.JwtUtil;
import net.javaguides.ems.entity.TblUserMaster;
import net.javaguides.ems.service.TblUserMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
//@CrossOrigin("*")
public class TblUserMasterController {

    @Autowired
    public TblUserMasterService tblUserMasterService;

    @Autowired
    private JwtUtil jwtUtil;

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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody TblUserMaster tblUserMaster) {
        TblUserMaster user = tblUserMasterService.getUserByEP(tblUserMaster.getName(), tblUserMaster.getPassword());
        if (user != null) {
            System.out.println(user);
            String jwtToken = jwtUtil.generateToken(user.getName());
            return ResponseEntity.ok(
                    List.of(" Welcome " + user.getName(),user, jwtToken)
                    );
//            HttpHeaders headers = new HttpHeaders();
//            headers.set("Authorization", "Bearer " + jwtToken);
            // return ResponseEntity
            //   .ok(List.of(" Welcome " + user.getName(), u));
//            return ResponseEntity
//                    .ok()
//                    .headers(headers)
//                    .body(List.of("Welcome " + user.getName(), user));
        } else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Credentials!");
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

    @PutMapping("/edit-profile/{userId}")
    public ResponseEntity<String> updateProfile(@RequestBody JsonNode user) {
        Long userId = user.get("userId").asLong();
        String newName = user.get("name").asText();
        String newMobileNumber = user.get("mobileNumber").asText();

        TblUserMaster updatedUser = tblUserMasterService.updateUserProfile(userId, newName, newMobileNumber);
        if (updatedUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body("Profile Updated Successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }
    }
}
