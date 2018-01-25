package com.toolc.utils;

import java.util.UUID;

import com.toolc.model.ApplicationUser;

public final class TestUtils {

    public static ApplicationUser createTestUser(String username, String password) {
        ApplicationUser user = new ApplicationUser();        
        
        user.setId(UUID.randomUUID());
        user.setUsername(username);
        user.setPassword(password);
        //user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));  
        
        return user;
    }
}
