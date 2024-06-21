//////package net.javaguides.ems.jwt;
//////
//////import io.jsonwebtoken.ExpiredJwtException;
//////import io.jsonwebtoken.MalformedJwtException;
//////import jakarta.servlet.FilterChain;
//////import jakarta.servlet.ServletException;
//////import jakarta.servlet.http.HttpServletRequest;
//////import jakarta.servlet.http.HttpServletResponse;
//////import org.slf4j.Logger;
//////import org.slf4j.LoggerFactory;
//////import org.springframework.beans.factory.annotation.Autowired;
//////import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//////import org.springframework.security.core.context.SecurityContextHolder;
//////import org.springframework.security.core.userdetails.UserDetails;
//////import org.springframework.security.core.userdetails.UserDetailsService;
//////import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//////import org.springframework.stereotype.Component;
//////import org.springframework.web.filter.OncePerRequestFilter;
//////
//////import java.io.IOException;
//////
//////@Component
//////public class JwtAuthenticationFilter extends OncePerRequestFilter {
//////
//////    @Autowired
//////    private UserDetailsService userDetailsService;
//////
//////    @Autowired
//////    private JwtHelper jwtHelper;
//////
//////    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
//////
//////    @Override
//////    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//////        String requestTokenHeader = request.getHeader("Authorization");
//////        logger.info(" Header :  {}", requestTokenHeader);
//////        String name = null;
//////        String jwttoken = null;
//////
//////        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
//////            jwttoken = requestTokenHeader.substring(7);
//////            try {
//////                name = this.jwtHelper.getUsernameFromToken(jwttoken);
//////            } catch (IllegalArgumentException e) {
//////                logger.error("Unable to get JWT token", e);
//////            } catch (ExpiredJwtException e) {
//////                logger.error("JWT token has expired", e);
//////            } catch (MalformedJwtException e) {
//////                logger.error("Invalid JWT", e);
//////            }
//////        } else {
//////            if (requestTokenHeader == null) {
//////                logger.warn("JWT Token is missing");
//////            } else {
//////                logger.warn("JWT Token does not begin with Bearer");
//////            }
//////        }
//////
//////        if (name != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//////            UserDetails userDetails = this.userDetailsService.loadUserByUsername(name);
//////            if (this.jwtHelper.validateToken(jwttoken, userDetails)) {
//////                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
//////                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//////                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//////                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//////            }
//////        }
//////
//////        filterChain.doFilter(request, response);
//////    }
//////}
////package net.javaguides.ems.jwt;
////
////import io.jsonwebtoken.ExpiredJwtException;
////import io.jsonwebtoken.MalformedJwtException;
////import jakarta.servlet.FilterChain;
////import jakarta.servlet.ServletException;
////import jakarta.servlet.http.HttpServletRequest;
////import jakarta.servlet.http.HttpServletResponse;
////import org.slf4j.Logger;
////import org.slf4j.LoggerFactory;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
////import org.springframework.security.core.context.SecurityContextHolder;
////import org.springframework.security.core.userdetails.UserDetails;
////import org.springframework.security.core.userdetails.UserDetailsService;
////import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
////import org.springframework.stereotype.Component;
////import org.springframework.web.filter.OncePerRequestFilter;
////
////import java.io.IOException;
////
////@Component
////public class JwtAuthenticationFilter extends OncePerRequestFilter {
////
////    @Autowired
////    private UserDetailsService userDetailsService;
////
////    @Autowired
////    private JwtHelper jwtHelper;
////
////    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
////
////    @Override
////    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
////        String requestTokenHeader = request.getHeader("Authorization");
////        logger.info("Received token header: {}", requestTokenHeader);
////        String username = null;
////        String token = null;
////
////        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
////            token = requestTokenHeader.substring(7);
////            try {
////                username = this.jwtHelper.getUsernameFromToken(token);
////            } catch (IllegalArgumentException e) {
////                logger.error("Unable to get JWT token", e);
////            } catch (ExpiredJwtException e) {
////                logger.error("JWT token has expired", e);
////            } catch (MalformedJwtException e) {
////                logger.error("Invalid JWT", e);
////            } catch (Exception e) {
////                logger.error("Unexpected error during token validation", e);
////            }
////        } else {
////            if (requestTokenHeader == null) {
////                logger.warn("JWT Token is missing");
////            } else {
////                logger.warn("JWT Token does not begin with Bearer");
////            }
////        }
////
////        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
////
////            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
////            if (this.jwtHelper.validateToken(token, userDetails)) {
////                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
////                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
////                SecurityContextHolder.getContext().setAuthentication(authentication);
////                logger.info("Authentication successful for user: {}", username);
////            } else {
////                logger.warn("JWT Token validation failed for user: {}", username);
////            }
////        }
////
////        filterChain.doFilter(request, response);
////    }
////}
package net.javaguides.ems.Jwt;
//
import net.javaguides.ems.service.TblUserMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
//
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Autowired
//    private TblUserMasterService tblUserMasterService;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
//        final String authorizationHeader = request.getHeader("Authorization");
//
//        String username = null;
//        String jwt = null;
//
//        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//            jwt = authorizationHeader.substring(7);
//            username = jwtUtil.getNameFromToken(jwt);
//        }
//
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            UserDetails userDetails = this.tblUserMasterService.loadUserByUsername(username);
//
//            if (jwtUtil.validateToken(jwt)) {
//                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
//                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//            }
//        }
//        chain.doFilter(request, response);
//    }
//}
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private TblUserMasterService tblUserMasterService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.getNameFromToken(jwt);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.tblUserMasterService.loadUserByUsername(username);

            if (jwtUtil.validateToken(jwt)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
