package net.javaguides.ems.Jwt;

import net.javaguides.ems.service.TblUserMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

/**
 * JwtAuthProvider
 */
@Component
public class JwtAuthProvider implements AuthenticationProvider {

    @Autowired
    private TblUserMasterService tblUserMasterService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        System.out.println("JwtAuthProvider: authenticate called");
        String token = (String) authentication.getCredentials();
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            if (jwtUtil.validateToken(token)) {
                String name = jwtUtil.getNameFromToken(token);
                UserDetails userDetails = tblUserMasterService.loadUserByUsername(name);
                if (userDetails != null) {
                    return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
                }
            }
        }
        throw new BadCredentialsException("Invalid token");
    }

//    @Override
//    public Authentication authenticate(Authentication authentication)
//            throws AuthenticationException {
//        System.out.println("token0");
//
//        // TODO Auto-generated method stub
//        String token = (String) authentication.getCredentials();
//        if (token != null && token.startsWith("Bearer ")) {
//            System.out.println("token1");
//            token = token.substring(7);
//            if (jwtUtil.validateToken(token)) {
//                String name = jwtUtil.getNameFromToken(token);
//                UserDetails userDetails = tblUserMasterService.loadUserByUsername(name);
//                if (userDetails != null) {
//                    return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
//                }
//            }
//        }
//        throw new BadCredentialsException("Invalid token");
//    }

//         String token = (String) authentication.getCredentials();
//        System.out.println("auth : " + authentication);
//         if (token != null && jwtUtil.validateToken(token) && token.startsWith("Bearer ")) {
//           System.out.println("token");
//           String name = jwtUtil.getNameFromToken(token);
//           if (name != null && tblUserMasterService.userExistsByName(name)) {
//             System.out.println("uptkon");
//             return new UsernamePasswordAuthenticationToken(name, token);
//           }
//         }
//        return new UsernamePasswordAuthenticationToken("e", "token");
//    }
//        // TODO Auto-generated method stub
//        String token = (String) authentication.getCredentials();
//        if (token != null) {
//            String name = jwtUtil.getNameFromToken(token);
//            if (name != null) {
//                // tblUserMasterService.getUserByE(null)
//            }
//        }
//        return null;
//    }

    @Override
    public boolean supports(Class<?> authentication) {
        // TODO Auto-generated method stub
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
