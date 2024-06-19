package net.javaguides.ems.service;

import net.javaguides.ems.entity.TblUserMaster;
import net.javaguides.ems.repository.TblUserMasterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TblUserMasterService {

    @Autowired
    private TblUserMasterRepository tblUserMasterRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(TblUserMasterService.class);

    public TblUserMaster addUser(TblUserMaster tblUserMaster) {
        tblUserMaster.setPassword(passwordEncoder.encode(tblUserMaster.getPassword()));
        return tblUserMasterRepository.save(tblUserMaster);
    }

    public TblUserMaster getUserByE(TblUserMaster tblUserMaster) {
        return tblUserMasterRepository.findByName(tblUserMaster.getName());
    }

    public TblUserMaster getUserByEP(String name, String password) {
        logger.info("Attempting to authenticate user with name: {}", name);

        TblUserMaster user = this.tblUserMasterRepository.findByName(name);

        if (user != null) {
            logger.info("User found with name: {}. Checking password...", name);
            boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
            System.out.println(passwordMatches);
            logger.info("Password match result for user {}: {}", name, passwordMatches);

            if (passwordMatches) {
                return user;
            }
        } else {
            logger.warn("No user found with name: {}", name);
        }

        logger.warn("Authentication failed for user with name: {}", name);
        return null;
    }

    public boolean resetPassword(String name, String password, String newPassword) {
        TblUserMaster user = this.tblUserMasterRepository.findByName(name);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            tblUserMasterRepository.save(user);
            return true;
        } else {
            return false;
        }
    }

    public boolean forgotPassword(String name, String newPassword) {
        TblUserMaster user = tblUserMasterRepository.findByName(name);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(newPassword));
            tblUserMasterRepository.save(user);
            return true;
        } else {
            return false;
        }
    }

    public TblUserMaster updateUserProfile(Long userId, String newName, String newMobileNumber) {
        Optional<TblUserMaster> optionalUser = tblUserMasterRepository.findById(userId);
        if (optionalUser.isPresent()) {
            TblUserMaster user = optionalUser.get();
            user.setName(newName);
            user.setMobileNumber(newMobileNumber);
            return tblUserMasterRepository.save(user);
        } else {
            return null;
        }
    }
}
//package net.javaguides.ems.service;
//
//import net.javaguides.ems.entity.TblUserMaster;
//import net.javaguides.ems.repository.TblUserMasterRepository;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class TblUserMasterService {
//
//    @Autowired
//    private TblUserMasterRepository tblUserMasterRepository;
//
//    private static final Logger logger = LoggerFactory.getLogger(TblUserMasterService.class);
//
//    public TblUserMaster addUser(TblUserMaster tblUserMaster) {
//        // Store raw password directly
//        return tblUserMasterRepository.save(tblUserMaster);
//    }
//
//    public TblUserMaster getUserByE(TblUserMaster tblUserMaster) {
//        return tblUserMasterRepository.findByName(tblUserMaster.getName());
//    }
//
//    public TblUserMaster getUserByEP(String name, String password) {
//        logger.info("Attempting to authenticate user with name: {}", name);
//
//        TblUserMaster user = this.tblUserMasterRepository.findByName(name);
//
//        if (user != null) {
//            logger.info("User found with name: {}. Checking password...", name);
//            boolean passwordMatches = password.equals(user.getPassword());
//            logger.info("Password match result for user {}: {}", name, passwordMatches);
//
//            if (passwordMatches) {
//                return user;
//            }
//        } else {
//            logger.warn("No user found with name: {}", name);
//        }
//
//        logger.warn("Authentication failed for user with name: {}", name);
//        return null;
//    }
//
//    public boolean resetPassword(String name, String password, String newPassword) {
//        TblUserMaster user = this.tblUserMasterRepository.findByName(name);
//        if (user != null && password.equals(user.getPassword())) {
//            user.setPassword(newPassword);
//            tblUserMasterRepository.save(user);
//            return true;
//        } else {
//            return false;
//        }
//    }
//
//    public boolean forgotPassword(String name, String newPassword) {
//        TblUserMaster user = tblUserMasterRepository.findByName(name);
//        if (user != null) {
//            user.setPassword(newPassword);
//            tblUserMasterRepository.save(user);
//            return true;
//        } else {
//            return false;
//        }
//    }
//
//    public TblUserMaster updateUserProfile(Long userId, String newName, String newMobileNumber) {
//        Optional<TblUserMaster> optionalUser = tblUserMasterRepository.findById(userId);
//        if (optionalUser.isPresent()) {
//            TblUserMaster user = optionalUser.get();
//            user.setName(newName);
//            user.setMobileNumber(newMobileNumber);
//            return tblUserMasterRepository.save(user);
//        } else {
//            return null;
//        }
//    }
//}
