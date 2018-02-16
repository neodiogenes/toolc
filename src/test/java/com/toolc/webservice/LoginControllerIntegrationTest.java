package com.toolc.webservice;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
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
import com.toolc.security.SecurityConstants;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
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

    private static String token;
    private static HttpHeaders headers;
    
    String testUsername = "alteraa@yahoo.com";
    String oldPassword = "password";
    ApplicationUser testUser;
    
    boolean setupComplete = false;
    
    @Before
    public void setup() {
        
        if (!setupComplete) {
            testUser = applicationUserService.findByUsername(testUsername)
                    .orElseGet(() -> applicationUserService.createUser(testUsername,  oldPassword));
            
            assertNotNull(testUser);
            
            token = Jwts.builder()
                    .setSubject(testUsername)
                    .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.JWT_EXPIRATION_TIME))
                    .signWith(SignatureAlgorithm.HS512, SecurityConstants.JWT_SECRET_KEY.getBytes())
                    .compact();
            
            token = "Bearer " + token;
            headers = new HttpHeaders();
            headers.add("Authorization", token);
            
            setupComplete = true;
        }
    }
    
    @Test
    public void testRegister(){
        String url = urlPrefix + "register";
        
        String rUsername = "percival@aol.com";
        String rPassword = "password";
        
        JSONObject json = new JSONObject();
        json.put("username", rUsername);
        json.put("password", rPassword);
        
        HttpEntity<JSONObject> entity = new HttpEntity<>(json);
        ResponseEntity<JSONObject> response = restTemplate.exchange(url, HttpMethod.POST, entity, JSONObject.class);

        System.out.println(response);
        assertEquals(rUsername, response.getBody().get("username"));
        
        Optional<ApplicationUser> checkUser = applicationUserService.findByUsername(rUsername);
        assertTrue(checkUser.isPresent());
        assertEquals(rUsername, checkUser.get().getUsername());
        assertTrue(checkUser.get().getArchived());
    }
    
    
    @Test
    public void testResetPasswordandValidateToken() {
        assertNotNull(testUser);
        
        {
            String url = urlPrefix + "reset";
        
            HttpEntity<String> entity = new HttpEntity<>(testUsername);
            ResponseEntity<JSONObject> response = restTemplate.exchange(url, HttpMethod.POST, entity, JSONObject.class);

            assertTrue((boolean) response.getBody().get("response"));
        }
        
        Optional<UserResetToken> oToken = this.userResetTokenService.findByUser(testUser);
        assertTrue(oToken.isPresent());
        
        {
            String url = urlPrefix + "validate/token";
            
            HttpEntity<UUID> entity = new HttpEntity<>(oToken.get().getId());
            ResponseEntity<JSONObject> response = restTemplate.exchange(url, HttpMethod.POST, entity, JSONObject.class);
            
            assertTrue((boolean) response.getBody().get("response"));
        }
    }
    
    @Test
    public void testValidateUser(){
        String url = urlPrefix + "validate/user";
        String newPassword = "123456";
        
        UserResetToken token = this.userResetTokenService.findByUser(testUser)
                .orElseGet(() -> this.userResetTokenService.create(testUser, UserResetToken.Types.RESET));
        assertNotNull(token);
        
        UserValidationObject object = new UserValidationObject();
        object.setId(token.getId());
        object.setUsername(testUsername);
        object.setPassword(newPassword);
        
        HttpEntity<UserValidationObject> entity = new HttpEntity<>(object);
        ResponseEntity<JSONObject> response = restTemplate.exchange(url, HttpMethod.POST, entity, JSONObject.class);
                
        System.out.println(response);
        assertTrue( (boolean) response.getBody().get("response"));
        
        //Check the new password has been saved
        ApplicationUser user = applicationUserService.findByUsername(testUsername).get();
        assertFalse(user.getArchived());
        assertTrue(BCrypt.checkpw(newPassword, user.getPassword()));
        
        //Reset the password value and check it's been reset
        user.setPassword(applicationUserService.getBCryptPasswordEncoder().encode(oldPassword));
        applicationUserService.update(user);        
        user = applicationUserService.findByUsername(testUsername).get();
        assertTrue(BCrypt.checkpw(oldPassword, user.getPassword()));
    }
    
    @Test
    public void testUpdateDetails() {
        String url = urlPrefix + "/details";
        JSONObject detailJson = new JSONObject();
        detailJson.put("ftpPort", "21");
        detailJson.put("ftpLogin", "FooBart");
        detailJson.put("ftpPassword", "123456");
        {                      
            HttpEntity<String> entity = new HttpEntity<>(detailJson.toJSONString(), headers);
            ResponseEntity<JSONObject> response = restTemplate.exchange(url, HttpMethod.PUT, entity, JSONObject.class);            
            assertEquals("1", response.getBody().getAsString("response"));
        }
        {
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<JSONObject> response = restTemplate.exchange(url, HttpMethod.GET, entity, JSONObject.class);
            assertEquals(detailJson, response.getBody());
        }
    }
}
