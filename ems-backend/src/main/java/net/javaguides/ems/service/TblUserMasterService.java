//package net.javaguides.ems.service;
//
//import net.javaguides.ems.entity.TblUserMaster;
//import net.javaguides.ems.repository.TblUserMasterRepository;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
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
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    private static final Logger logger = LoggerFactory.getLogger(TblUserMasterService.class);
//
//    public TblUserMaster addUser(TblUserMaster tblUserMaster) {
//        String rawPassword = tblUserMaster.getPassword();
//        String encodedPassword = passwordEncoder.encode(rawPassword);
//        logger.info("Registering user: {}, Raw Password: {}, Encoded Password: {}", tblUserMaster.getName(), rawPassword, encodedPassword);
//        tblUserMaster.setPassword(encodedPassword);
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
//            boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
//
//            logger.info("Raw password: {}", password);
//            logger.info("Encoded password in database: {}", user.getPassword());
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
//        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
//            user.setPassword(passwordEncoder.encode(newPassword));
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
//            user.setPassword(passwordEncoder.encode(newPassword));
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
////package net.javaguides.ems.service;
////
////import net.javaguides.ems.entity.TblUserMaster;
////import net.javaguides.ems.repository.TblUserMasterRepository;
////import org.slf4j.Logger;
////import org.slf4j.LoggerFactory;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.stereotype.Service;
////
////import java.util.Optional;
////
////@Service
////public class TblUserMasterService {
////
////    @Autowired
////    private TblUserMasterRepository tblUserMasterRepository;
////
////    private static final Logger logger = LoggerFactory.getLogger(TblUserMasterService.class);
////
////    public TblUserMaster addUser(TblUserMaster tblUserMaster) {
////        // Store raw password directly
////        return tblUserMasterRepository.save(tblUserMaster);
////    }
////
////    public TblUserMaster getUserByE(TblUserMaster tblUserMaster) {
////        return tblUserMasterRepository.findByName(tblUserMaster.getName());
////    }
////
////    public TblUserMaster getUserByEP(String name, String password) {
////        logger.info("Attempting to authenticate user with name: {}", name);
////
////        TblUserMaster user = this.tblUserMasterRepository.findByName(name);
////
////        if (user != null) {
////            logger.info("User found with name: {}. Checking password...", name);
////            boolean passwordMatches = password.equals(user.getPassword());
////            logger.info("Password match result for user {}: {}", name, passwordMatches);
////
////            if (passwordMatches) {
////                return user;
////            }
////        } else {
////            logger.warn("No user found with name: {}", name);
////        }
////
////        logger.warn("Authentication failed for user with name: {}", name);
////        return null;
////    }
////
////    public boolean resetPassword(String name, String password, String newPassword) {
////        TblUserMaster user = this.tblUserMasterRepository.findByName(name);
////        if (user != null && password.equals(user.getPassword())) {
////            user.setPassword(newPassword);
////            tblUserMasterRepository.save(user);
////            return true;
////        } else {
////            return false;
////        }
////    }
////
////    public boolean forgotPassword(String name, String newPassword) {
////        TblUserMaster user = tblUserMasterRepository.findByName(name);
////        if (user != null) {
////            user.setPassword(newPassword);
////            tblUserMasterRepository.save(user);
////            return true;
////        } else {
////            return false;
////        }
////    }
////
////    public TblUserMaster updateUserProfile(Long userId, String newName, String newMobileNumber) {
////        Optional<TblUserMaster> optionalUser = tblUserMasterRepository.findById(userId);
////        if (optionalUser.isPresent()) {
////            TblUserMaster user = optionalUser.get();
////            user.setName(newName);
////            user.setMobileNumber(newMobileNumber);
////            return tblUserMasterRepository.save(user);
////        } else {
////            return null;
////        }
////    }
////}
//package net.javaguides.ems.service;
//
//import net.javaguides.ems.entity.TblUserMaster;
//import net.javaguides.ems.repository.TblUserMasterRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
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
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    public TblUserMaster addUser(TblUserMaster tblUserMaster) {
//        tblUserMaster.setPassword(passwordEncoder.encode(tblUserMaster.getPassword()));
//        return tblUserMasterRepository.save(tblUserMaster);
//    }
//
//    public TblUserMaster getUserByE(TblUserMaster tblUserMaster) {
//        return tblUserMasterRepository.findByName(tblUserMaster.getName());
//    }
//
//    public TblUserMaster getUserByEP(String name, String password) {
//        TblUserMaster user = tblUserMasterRepository.findByName(name);
//        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
//            return user;
//        } else {
//            return null;
//        }
//    }
//
//    public boolean resetPassword(String name, String password, String new_password) {
//        TblUserMaster u = tblUserMasterRepository.findByName(name);
//        if (u != null && passwordEncoder.matches(password, u.getPassword())) {
//            u.setPassword(passwordEncoder.encode(new_password));
//            tblUserMasterRepository.save(u);
//            return true;
//        } else {
//            return false;
//        }
//    }
//
//    public boolean forgotPassword(String name, String new_password) {
//        TblUserMaster u = tblUserMasterRepository.findByName(name);
//        if (u != null) {
//            u.setPassword(passwordEncoder.encode(new_password));
//            tblUserMasterRepository.save(u);
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
package net.javaguides.ems.service;

import net.javaguides.ems.entity.TblUserMaster;
import net.javaguides.ems.repository.TblUserMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TblUserMasterService implements UserDetailsService {

    @Autowired
    private TblUserMasterRepository tblUserMasterRepository;

    public TblUserMaster addUser(TblUserMaster tblUserMaster) {
        return tblUserMasterRepository.save(tblUserMaster);
    }

    public TblUserMaster getUserByE(TblUserMaster tblUserMaster) {
        return tblUserMasterRepository.findByName(tblUserMaster.getName());
    }

    public TblUserMaster getUserByEP(String name, String password) {
        TblUserMaster user = null;
        try {
            user = this.tblUserMasterRepository.findByNameAndPassword(name, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    public boolean resetPassword(String name, String password, String new_password) {
        TblUserMaster u = this.tblUserMasterRepository.findByNameAndPassword(name, password);
        if (u != null) {
            u.setPassword(new_password);
            tblUserMasterRepository.save(u);
            return true;
        } else {
            return false;
        }
    }

    public boolean forgotPassword(String name, String new_password) {
        TblUserMaster u = tblUserMasterRepository.findByName(name);
        if (u != null) {
            u.setPassword(new_password);
            tblUserMasterRepository.save(u);
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
//
//    public boolean userExistsByName(String name) {
//        return (tblUserMasterRepository.findByName(name) != null);
//    }

    public UserDetails loadUserByUsername(String name) {
        TblUserMaster user = tblUserMasterRepository.findByName(name);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + name);
        }
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getName())
                .password(user.getPassword())
                .roles("USER")
                .build();
    }
}

