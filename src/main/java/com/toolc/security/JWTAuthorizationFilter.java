package com.toolc.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.google.gson.JsonObject;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
    Log logger = LogFactory.getLog(JWTAuthorizationFilter.class);
    
    public JWTAuthorizationFilter(AuthenticationManager authManager) {
        super(authManager);
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(SecurityConstants.HEADER_STRING);

        if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
        SecurityContextHolder.getContext().setAuthentication(authentication);        
        chain.doFilter(req, res);


    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(SecurityConstants.HEADER_STRING);
        if (token != null) {
            // parse the token.
            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(SecurityConstants.JWT_SECRET_KEY.getBytes())
                        .parseClaimsJws(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
                        .getBody();
                
                String user = claims.getSubject();
                //Date expiration = claims.getExpiration();

                if (user != null) {
                    return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
                }
                
            } catch (ExpiredJwtException e) {
                JsonObject detail = new JsonObject();
                detail.addProperty("token", token);
                detail.addProperty("remoteIp", request.getRemoteAddr());
                JsonObject logJson = new JsonObject();
                logJson.addProperty("action", "failed login attempt: expired token");
                logJson.add("detail", detail);
                logger.info(logJson);

            } catch (UnsupportedJwtException e) {
                JsonObject detail = new JsonObject();
                detail.addProperty("token", token);
                detail.addProperty("remoteIp", request.getRemoteAddr());
                JsonObject logJson = new JsonObject();
                logJson.addProperty("action", "failed login attempt: unsupported token");
                logJson.add("detail", detail);
                logger.info(logJson);
                
            } catch (MalformedJwtException e) {
                JsonObject detail = new JsonObject();
                detail.addProperty("token", token);
                detail.addProperty("remoteIp", request.getRemoteAddr());
                JsonObject logJson = new JsonObject();
                logJson.addProperty("action", "failed login attempt: malformed token");
                logJson.add("detail", detail);
                logger.info(logJson);
                
            } catch (SignatureException e) {
                JsonObject detail = new JsonObject();
                detail.addProperty("token", token);
                detail.addProperty("remoteIp", request.getRemoteAddr());
                JsonObject logJson = new JsonObject();
                logJson.addProperty("action", "failed login attempt: signature exception");
                logJson.add("detail", detail);
                logger.info(logJson);
                
            } catch (IllegalArgumentException e) {
                throw e;
            }
            
            return null;
        }
        return null;
    }   
}
