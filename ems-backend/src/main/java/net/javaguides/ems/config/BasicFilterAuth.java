package net.javaguides.ems.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Base64;

import net.javaguides.ems.service.TblUserMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class BasicFilterAuth extends OncePerRequestFilter {

    @Autowired
    public TblUserMasterService tblUserMasterService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        // TODO Auto-generated method stub
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Basic ")) {
            System.out.println("header"+header);
            // Extract and decode the credentials from the header
            String[] credentials = new String(
                    Base64.getDecoder().decode(header.substring(6))
            )
                    .split(":");
            String name = credentials[0];
            String password = credentials[1];

            System.out.println("filter");
            if (
                    !request.getRequestURI().equals("/login") &&
                            tblUserMasterService.getUserByEP(name, password) == null
            ) {
                System.out.println("error");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
            filterChain.doFilter(request, response);
            return;
        }
    }
}
