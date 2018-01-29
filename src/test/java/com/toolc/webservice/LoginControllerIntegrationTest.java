package com.toolc.webservice;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.UUID;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.toolc.appservice.ApplicationUserService;
import com.toolc.appservice.UserResetTokenService;
import com.toolc.model.ApplicationUser;
import com.toolc.model.UserResetToken;
import com.toolc.model.UserValidationObject;

import net.minidev.json.JSONObject;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@ActiveProfiles("local")
public class LoginControllerIntegrationTest {
    static final String urlPrefix = "/api/users/";
    
    @Autowired private TestRestTemplate restTemplate;
    
    @Autowired LoginController controller;

    @Autowired ApplicationUserService applicationUserService;
    @Autowired UserResetTokenService userResetTokenService;
    
    UserResetToken token;
    String testUsername = "alteraa@yahoo.com";
    String oldPassword = "password";
    ApplicationUser testUser;
    
    @Before
    public void setup() {
        testUser = applicationUserService.createUser(testUsername,  oldPassword);
        
        token = userResetTokenService.create(testUser);
    }
    
    
    @Ignore
    @Test
    public void testResetPassword() {
        String url = urlPrefix + "reset";
        
        HttpEntity<String> entity = new HttpEntity<>(testUsername);
        ResponseEntity<JSONObject> response = restTemplate.exchange(url, HttpMethod.POST, entity, JSONObject.class);

        assertTrue((boolean) response.getBody().get("response"));
    }
    
    @Ignore
    @Test
    public void testValidateToken() {
        String url = urlPrefix + "validate/token";
        
        HttpEntity<UUID> entity = new HttpEntity<>(token.getId());
        ResponseEntity<JSONObject> response = restTemplate.exchange(url, HttpMethod.POST, entity, JSONObject.class);
        
        assertTrue((boolean) response.getBody().get("response"));
        
    }
    
    //@Ignore
    @Test
    public void testValidateUser(){
        String url = urlPrefix + "validate/user";
        String newPassword = "123456";
        
        UserValidationObject object = new UserValidationObject();
        object.setId(token.getId());
        object.setUsername(testUsername);
        object.setPassword(newPassword);
        
        HttpEntity<UserValidationObject> entity = new HttpEntity<>(object);
        ResponseEntity<JSONObject> response = restTemplate.exchange(url, HttpMethod.POST, entity, JSONObject.class);
                
        System.out.println(response);
        assertTrue( (boolean) response.getBody().get("response"));
        
        
        ApplicationUser user = applicationUserService.findByUsername(testUsername).get();
        assertFalse(user.getArchived());
        assertTrue(BCrypt.checkpw(newPassword, user.getPassword()));
        
        user.setPassword(applicationUserService.getBCryptPasswordEncoder().encode(oldPassword));
        applicationUserService.update(user);
        
        user = applicationUserService.findByUsername(testUsername).get();
        assertTrue(BCrypt.checkpw(oldPassword, user.getPassword()));
    }
}
