package com.toolc.webservice;

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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.toolc.appservice.UserResetTokenService;
import com.toolc.model.ApplicationUser;
import com.toolc.model.UserResetToken;
import com.toolc.utils.TestUtils;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@ActiveProfiles("local")
public class LoginControllerTest {
    static final String urlPrefix = "/api/users/";
    
    @Autowired private TestRestTemplate restTemplate;
    
    @Autowired LoginController controller;
    
    @Autowired UserResetTokenService userResetTokenService;
    
    UserResetToken token;
    String testUsername = "alteraa@yahoo.com";
    
    @Before
    public void setup() {
        ApplicationUser testUser = TestUtils.createTestUser(testUsername,  "password");
        testUser = controller.create(testUser);
        
        token = userResetTokenService.create(testUser);
    }
    
    
    @Ignore
    @Test
    public void testResetPassword() {
        String url = urlPrefix + "reset";
        
        HttpEntity<String> entity = new HttpEntity<>(testUsername);
        ResponseEntity<Boolean> response = restTemplate.exchange(url, HttpMethod.POST, entity, Boolean.class);
        
        assertTrue(response.getBody());
    }
    
    @Test
    public void testValidateToken() {
        String url = urlPrefix + "validate";
        
        HttpEntity<UUID> entity = new HttpEntity<>(token.getId());
        ResponseEntity<Boolean> response = restTemplate.exchange(url, HttpMethod.POST, entity, Boolean.class);
        
        assertTrue(response.getBody());
        
    }
    
}
