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

