package com.toolc.utils;

import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.toolc.model.ApplicationUser;

public final class TestUtils {

    public static ApplicationUser createTestUser(String username, String password, BCryptPasswordEncoder encoder) {
        ApplicationUser user = new ApplicationUser();        
        
        user.setId(UUID.randomUUID());
        user.setUsername(username);
        user.setPassword(password);
        
        if (encoder != null) {
            user.setPassword(encoder.encode(password));
        }
        
        return user;
    }
}
