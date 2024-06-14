//package net.javaguides.ems.config;
//
//import net.javaguides.ems.entity.TblUserMaster;
//import net.javaguides.ems.service.TblUserMasterService;
//import net.javaguides.ems.util.JwtUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.stereotype.Component;
//
//@Component
//public class NamePasswordAuth implements AuthenticationProvider {
//
//    @Autowired
//    private TblUserMasterService tblUserMasterService;
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Override
//    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//        String name = authentication.getName();
//        String password = authentication.getCredentials().toString();
//
//        TblUserMaster user = tblUserMasterService.getUserByEP(name, password);
//
//        if (user == null) {
//            throw new BadCredentialsException("Invalid username or password");
////        }
//
//        // Generate JWT
//        String token = jwtUtil.generateToken(name);
//
//        // Add the token to the authentication object
//        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, token, null);
//
//        return auth;
//    }
//
//    @Override
//    public boolean supports(Class<?> authentication) {
//        return authentication.equals(UsernamePasswordAuthenticationToken.class);
//    }
//}
