//package net.javaguides.ems.controller;
//
//import com.fasterxml.jackson.databind.JsonNode;
//import net.javaguides.ems.entity.TblUserMaster;
//import net.javaguides.ems.jwt.JwtHelper;
//import net.javaguides.ems.jwt.JwtRequest;
//import net.javaguides.ems.jwt.JwtResponse;
//import net.javaguides.ems.service.TblUserMasterService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//public class TblUserMasterController {
//
//    @Autowired
//    public TblUserMasterService tblUserMasterService;
//
//    @Autowired
//    private UserDetailsService userDetailsService;
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private JwtHelper jwtHelper;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    private static final Logger logger = LoggerFactory.getLogger(TblUserMasterController.class);
//
//    @PostMapping("/register")
//    public ResponseEntity<String> register(@RequestBody TblUserMaster tblUserMaster) {
//        if (tblUserMasterService.getUserByE(tblUserMaster) == null) {
//            // Hash the password before storing
//            String hashedPassword = passwordEncoder.encode(tblUserMaster.getPassword());
//            tblUserMaster.setPassword(hashedPassword);
//
//            TblUserMaster user = tblUserMasterService.addUser(tblUserMaster);
//            return ResponseEntity
//                    .status(HttpStatus.OK)
//                    .body(user.getName() + " Registered Successfully");
//        } else {
//            return ResponseEntity
//                    .status(HttpStatus.CONFLICT)
//                    .body("User Already Exists!");
//        }
//    }
//
////    @PostMapping("/login")
////    public ResponseEntity<?> login(@RequestBody TblUserMaster tblUserMaster) {
////        TblUserMaster user = tblUserMasterService.getUserByEP(tblUserMaster.getName(), tblUserMaster.getPassword());
////        if (user != null) {
////            return ResponseEntity.ok(user);
////        } else {
////            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials!");
////        }
////    }
//
//    @PostMapping("/login")
//    public ResponseEntity<JwtResponse> login(@RequestBody TblUserMaster tblUserMaster) {
//        String username = tblUserMaster.getName();
//        String password = tblUserMaster.getPassword();
//        logger.info("Received login request for username: {}", username);
//
//        try {
//            // Authenticate user
//            TblUserMaster user = tblUserMasterService.getUserByEP(username, password);
//            if (user != null && passwordEncoder.matches(password, user.getPassword())) {
//                // Authentication successful
//                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//                String jwttoken = jwtHelper.generateToken(userDetails);
//
//                JwtResponse response = JwtResponse.builder()
//                        .jwtToken(jwttoken)
//                        .username(userDetails.getUsername())
//                        .errorMessage(null)
//                        .build();
//                logger.info("Authentication successful for username: {}", username);
//                return new ResponseEntity<>(response, HttpStatus.OK);
//            } else {
//                // Authentication failed
//                logger.error("Authentication failed for username: {}", username);
//                JwtResponse response = JwtResponse.builder()
//                        .jwtToken(null)
//                        .username(null)
//                        .errorMessage("Invalid Username or Password")
//                        .build();
//                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
//            }
//        } catch (Exception e) {
//            logger.error("Unexpected error during authentication for username: {} with exception: {}", username, e.getMessage());
//            JwtResponse response = JwtResponse.builder()
//                    .jwtToken(null)
//                    .username(null)
//                    .errorMessage("An unexpected error occurred. Please try again.")
//                    .build();
//            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    private void doAuthenticate(String username, String password) {
//        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password);
//        try {
//            logger.info("Authenticating user: {}", username);
//            authenticationManager.authenticate(authentication);
//            logger.info("Authentication successful for user: {}", username);
//        } catch (BadCredentialsException e) {
//            logger.error("Authentication failed for username: {} with bad credentials", username);
//            throw new BadCredentialsException("Invalid Username or Password !!");
//        } catch (Exception e) {
//            logger.error("Authentication failed for username: {} with exception: {}", username, e.getMessage());
//            throw new RuntimeException("An unexpected error occurred during authentication");
//        }
//    }
//
////    @PostMapping("/login")
////    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {
////        logger.info("Received login request for username: {}", request.getName());
////        try {
////            this.doAuthenticate(request.getName(), request.getPassword());
////            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getName());
////            String jwttoken = this.jwtHelper.generateToken(userDetails);
////
////            JwtResponse response = JwtResponse.builder()
////                    .jwtToken(jwttoken)
////                    .username(userDetails.getUsername())
////                    .errorMessage(null)
////                    .build();
////            logger.info("Authentication successful for username: {}", request.getName());
////            return new ResponseEntity<>(response, HttpStatus.OK);
////        } catch (BadCredentialsException e) {
////            logger.error("Authentication failed for username: {} with exception: {}", request.getName(), e.getMessage());
////            JwtResponse response = JwtResponse.builder()
////                    .jwtToken(null)
////                    .username(null)
////                    .errorMessage("Invalid Username or Password")
////                    .build();
////            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
////        } catch (Exception e) {
////            logger.error("Unexpected error during authentication for username: {} with exception: {}", request.getName(), e.getMessage());
////            JwtResponse response = JwtResponse.builder()
////                    .jwtToken(null)
////                    .username(null)
////                    .errorMessage("An unexpected error occurred. Please try again.")
////                    .build();
////            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
////        }
////    }
////
////    private void doAuthenticate(String name, String password) {
////        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(name, password);
////        try {
////            logger.info("Authenticating user: {}", name);
////            authenticationManager.authenticate(authentication);
////            logger.info("Authentication successful for user: {}", name);
////        } catch (BadCredentialsException e) {
////            logger.error("Authentication failed for username: {} with bad credentials", name);
////            throw new BadCredentialsException("Invalid Username or Password !!");
////        } catch (Exception e) {
////            logger.error("Authentication failed for username: {} with exception: {}", name, e.getMessage());
////            throw new RuntimeException("An unexpected error occurred during authentication");
////        }
////    }
////
////    @ExceptionHandler(BadCredentialsException.class)
////    public ResponseEntity<JwtResponse> exceptionHandler() {
////        JwtResponse response = JwtResponse.builder()
////                .jwtToken(null)
////                .username(null)
////                .errorMessage("Invalid Username or Password")
////                .build();
////        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
////    }
//
//    @PostMapping("/reset-password")
//    public ResponseEntity<String> resetPassword(@RequestBody JsonNode userNewPass) {
//        String name = userNewPass.get("name").asText();
//        String oldPassword = userNewPass.get("password").asText();
//        String newPassword = userNewPass.get("new_password").asText();
//
//        if (tblUserMasterService.resetPassword(name, oldPassword, newPassword)) {
//            return ResponseEntity.status(HttpStatus.OK).body("Password Changed Successfully!");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials!");
//        }
//    }
//
//    @PostMapping("/forgot-password")
//    public ResponseEntity<String> forgotPassword(@RequestBody JsonNode user) {
//        String name = user.get("name").asText();
//        String newPassword = user.get("new_password").asText();
//
//        if (tblUserMasterService.forgotPassword(name, newPassword)) {
//            return ResponseEntity.status(HttpStatus.OK).body("Password Changed Successfully!");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found!");
//        }
//    }
//
//    @PutMapping("/edit-profile/{userId}")
//    public ResponseEntity<String> updateProfile(@RequestBody JsonNode user) {
//        Long userId = user.get("userId").asLong();
//        String newName = user.get("name").asText();
//        String newMobileNumber = user.get("mobileNumber").asText();
//
//        TblUserMaster updatedUser = tblUserMasterService.updateUserProfile(userId, newName, newMobileNumber);
//        if (updatedUser != null) {
//            return ResponseEntity.status(HttpStatus.OK).body("Profile Updated Successfully!");
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
//        }
//    }
//}
////package net.javaguides.ems.controller;
////
////import com.fasterxml.jackson.databind.JsonNode;
////import net.javaguides.ems.entity.TblUserMaster;
////import net.javaguides.ems.jwt.JwtHelper;
////import net.javaguides.ems.jwt.JwtRequest;
////import net.javaguides.ems.jwt.JwtResponse;
////import net.javaguides.ems.service.TblUserMasterService;
////import org.slf4j.Logger;
////import org.slf4j.LoggerFactory;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.http.HttpStatus;
////import org.springframework.http.ResponseEntity;
////import org.springframework.security.authentication.AuthenticationManager;
////import org.springframework.security.authentication.BadCredentialsException;
////import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
////import org.springframework.security.core.userdetails.UserDetails;
////import org.springframework.security.core.userdetails.UserDetailsService;
////import org.springframework.web.bind.annotation.*;
////
////@RestController
////public class TblUserMasterController {
////
////    @Autowired
////    public TblUserMasterService tblUserMasterService;
////
////    @Autowired
////    private UserDetailsService userDetailsService;
////
////    @Autowired
////    private AuthenticationManager authenticationManager;
////
////    @Autowired
////    private JwtHelper jwtHelper;
////
////    private static final Logger logger = LoggerFactory.getLogger(TblUserMasterController.class);
////
////    @PostMapping("/register")
////    public ResponseEntity<String> register(@RequestBody TblUserMaster tblUserMaster) {
////        if (tblUserMasterService.getUserByE(tblUserMaster) == null) {
////            TblUserMaster u = tblUserMasterService.addUser(tblUserMaster);
////            return ResponseEntity
////                    .status(HttpStatus.OK)
////                    .body(u.getName() + " Registered Successfully");
////        } else {
////            return ResponseEntity
////                    .status(HttpStatus.CONFLICT)
////                    .body("User Already Exists!");
////        }
////    }
////
////    @PostMapping("/login")
////    public ResponseEntity<JwtResponse> login(@RequestBody TblUserMaster tblUserMaster) {
////        String username = tblUserMaster.getName();
////        String password = tblUserMaster.getPassword();
////        logger.info("Received login request for username: {}", username);
////
////        try {
////            // Authenticate user
////            TblUserMaster user = tblUserMasterService.getUserByEP(username, password);
////            if (user != null && password.equals(user.getPassword())) {
////                // Authentication successful
////                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
////                String jwttoken = jwtHelper.generateToken(userDetails);
////
////                JwtResponse response = JwtResponse.builder()
////                        .jwtToken(jwttoken)
////                        .username(userDetails.getUsername())
////                        .errorMessage(null)
////                        .build();
////                logger.info("Authentication successful for username: {}", username);
////                return new ResponseEntity<>(response, HttpStatus.OK);
////            } else {
////                // Authentication failed
////                logger.error("Authentication failed for username: {}", username);
////                JwtResponse response = JwtResponse.builder()
////                        .jwtToken(null)
////                        .username(null)
////                        .errorMessage("Invalid Username or Password")
////                        .build();
////                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
////            }
////        } catch (Exception e) {
////            logger.error("Unexpected error during authentication for username: {} with exception: {}", username, e.getMessage());
////            JwtResponse response = JwtResponse.builder()
////                    .jwtToken(null)
////                    .username(null)
////                    .errorMessage("An unexpected error occurred. Please try again.")
////                    .build();
////            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
////        }
////    }
////
////    private void doAuthenticate(String username, String password) {
////        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password);
////        try {
////            logger.info("Authenticating user: {}", username);
////            authenticationManager.authenticate(authentication);
////            logger.info("Authentication successful for user: {}", username);
////        } catch (BadCredentialsException e) {
////            logger.error("Authentication failed for username: {} with bad credentials", username);
////            throw new BadCredentialsException("Invalid Username or Password !!");
////        } catch (Exception e) {
////            logger.error("Authentication failed for username: {} with exception: {}", username, e.getMessage());
////            throw new RuntimeException("An unexpected error occurred during authentication");
////        }
////    }
////
////    @PostMapping("/reset-password")
////    public ResponseEntity<String> resetPassword(@RequestBody JsonNode userNewPass) {
////        String name = userNewPass.get("name").asText();
////        String oldPassword = userNewPass.get("password").asText();
////        String newPassword = userNewPass.get("new_password").asText();
////
////        if (tblUserMasterService.resetPassword(name, oldPassword, newPassword)) {
////            return ResponseEntity.status(HttpStatus.OK).body("Password Changed Successfully!");
////        } else {
////            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials!");
////        }
////    }
////
////    @PostMapping("/forgot-password")
////    public ResponseEntity<String> forgotPassword(@RequestBody JsonNode userNewPass) {
////        String name = userNewPass.get("name").asText();
////        String newPassword = userNewPass.get("new_password").asText();
////        if (tblUserMasterService.forgotPassword(name, newPassword)) {
////            return ResponseEntity.status(HttpStatus.OK).body("Password Changed Successfully!");
////        } else {
////            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials!");
////        }
////    }
////
////    @PutMapping("/updateUserProfile")
////    public ResponseEntity<String> updateUserProfile(@RequestBody JsonNode updateUserProfile) {
////        Long userId = updateUserProfile.get("userId").asLong();
////        String newName = updateUserProfile.get("name").asText();
////        String newMobileNumber = updateUserProfile.get("mobileNumber").asText();
////
////        TblUserMaster updatedUser = tblUserMasterService.updateUserProfile(userId, newName, newMobileNumber);
////
////        if (updatedUser != null) {
////            return ResponseEntity.status(HttpStatus.OK).body("User profile updated successfully!");
////        } else {
////            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
////        }
////    }
////}
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
