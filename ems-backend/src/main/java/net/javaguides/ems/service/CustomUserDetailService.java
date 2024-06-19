////package net.javaguides.ems.service;
////
////import net.javaguides.ems.entity.TblUserMaster;
////import net.javaguides.ems.repository.TblUserMasterRepository;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.security.core.userdetails.UserDetails;
////import org.springframework.security.core.userdetails.UserDetailsService;
////import org.springframework.security.core.userdetails.UsernameNotFoundException;
////import org.springframework.stereotype.Service;
////
////@Service
////public class CustomUserDetailService implements UserDetailsService {
////
////    @Autowired
////    private TblUserMasterRepository tblUserMasterRepository;
////
////    @Override
////    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
////        TblUserMaster user = tblUserMasterRepository.findByName(username);
////        if (user == null) {
////            throw new UsernameNotFoundException("User not found with username: " + username);
////        }
////        return org.springframework.security.core.userdetails.User.builder()
////                .username(user.getName())
////                .password(user.getPassword())
////                .roles("USER")
////                .build();
////    }
////}
//package net.javaguides.ems.service;
//
//import net.javaguides.ems.entity.TblUserMaster;
//import net.javaguides.ems.repository.TblUserMasterRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//
//@Service
//public class CustomUserDetailService implements UserDetailsService {
//
//    @Autowired
//    private TblUserMasterRepository tblUserMasterRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        TblUserMaster user = tblUserMasterRepository.findByName(username);
//        if (user == null) {
//            throw new UsernameNotFoundException("User not found with username: " + username);
//        }
//        return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(), new ArrayList<>());
//    }
//}
