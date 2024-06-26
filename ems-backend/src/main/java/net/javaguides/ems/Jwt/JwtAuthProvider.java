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

    @Override
    public boolean supports(Class<?> authentication) {
        // TODO Auto-generated method stub
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
