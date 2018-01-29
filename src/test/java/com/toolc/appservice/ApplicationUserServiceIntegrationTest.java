package com.toolc.appservice;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.toolc.model.ApplicationUser;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles({"local", "test"})
public class ApplicationUserServiceIntegrationTest {
    
    @Autowired ApplicationUserService service;
    @Autowired BCryptPasswordEncoder bCryptPasswordEncoder;
    
    final String testUsername = "alteraa@yahoo.com";
    final String oldPassword = "password";
    
    @Test
    public void testFindByUsername(){
        ApplicationUser user = service.findByUsername(testUsername).get();
    }
}
