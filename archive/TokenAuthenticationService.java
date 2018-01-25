package com.toolc.security;

import static java.util.Collections.emptyList;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class TokenAuthenticationService {
    @Value("${jwt.secret.key}")
    static String secretKey;
    
    static final long EXPIRATIONTIME = 864_000_000;
    static final String TOKEN_PREFIX = "Bearer";
    static final String HEADER_STRING = "Authorization";
    
    static void addAuthentication(HttpServletResponse response, String loginId) {
        String jwt = Jwts
                .builder()
                .setSubject(loginId)
                .claim("roles", "user")
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
        
        response
            .addHeader(HEADER_STRING, TOKEN_PREFIX + " " + jwt);
    }
    
    static Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        
        if (token != null) {
            String loginId = Jwts
                    .parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody()
                    .getSubject();
            
            if (StringUtils.isNotBlank(loginId)) {
                return new UsernamePasswordAuthenticationToken(loginId, null, emptyList());
            }
        }        

        return null;
    }
}
