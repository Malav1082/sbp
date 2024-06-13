package net.javaguides.ems.config;

import net.javaguides.ems.entity.TblUserMaster;
import net.javaguides.ems.service.TblUserMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class NamePasswordAuth implements AuthenticationProvider {

    @Autowired
    private TblUserMasterService tblUserMasterService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String name = authentication.getName();
        String password = authentication.getCredentials().toString();

        TblUserMaster user = tblUserMasterService.getUserByEP(name, password);

        if (user == null) {
            throw new BadCredentialsException("Invalid username or password");
        }
//        UserDetails userDetails = new User(user.getName(), user.getPassword(), Collections.emptyList());
        return new UsernamePasswordAuthenticationToken(user, password, null);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
