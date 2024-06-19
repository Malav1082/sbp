package net.javaguides.ems.service;

import net.javaguides.ems.entity.TblUserMaster;
import net.javaguides.ems.repository.TblUserMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private TblUserMasterRepository tblUserMasterRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        TblUserMaster user = tblUserMasterRepository.findByName(name);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + name);
        }
        return new User(user.getName(), user.getPassword(), Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
