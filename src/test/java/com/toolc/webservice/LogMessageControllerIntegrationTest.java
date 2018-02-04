package com.toolc.webservice;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.toolc.appservice.ApplicationUserService;
import com.toolc.appservice.LogMessageService;
import com.toolc.model.ApplicationUser;
import com.toolc.model.LogMessage;
import com.toolc.security.SecurityConstants;
import com.toolc.utils.TestConstants;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import net.minidev.json.JSONObject;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@ActiveProfiles("local")
public class LogMessageControllerIntegrationTest {
    static final String urlPrefix = "/api/logmessage/";
    
    @Autowired private TestRestTemplate restTemplate;
    
    @Autowired LogMessageService logMessageService;
    @Autowired ApplicationUserService applicationUserService;
    
    private static String token;
    private static HttpHeaders headers;
    
    String testUsername = "alteraa@yahoo.com";
    String oldPassword = "password";
    ApplicationUser testUser;
    
    @Before
    public void setup() {
        testUser = applicationUserService.createUser(testUsername,  oldPassword);
        
        token = Jwts.builder()
                .setSubject(TestConstants.DEFAULT_USERNAME)
                .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.JWT_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.JWT_SECRET_KEY.getBytes())
                .compact();
        
        token = "Bearer " + token;
        
        headers = new HttpHeaders();
        headers.add("Authorization", token);
    }
    
    @Test
    public void testCreateLogMessage() {
        final String testMessage = "Test Message " + ThreadLocalRandom.current().nextInt(1000000);
        LogMessage message = new LogMessage();
        message.setLogger("LogMessageControllerIntegration.class");
        message.setLevel("debug");
        message.setMessage(testMessage);
        
        HttpEntity<LogMessage> entity = new HttpEntity<>(message, headers);
        ResponseEntity<JSONObject> response = restTemplate.exchange(urlPrefix, HttpMethod.POST, entity, JSONObject.class);
        
        
        JSONObject json = response.getBody();
        System.out.println(json);
        
        assertEquals(testMessage, json.getAsString("message"));
        
        UUID id = UUID.fromString(json.getAsString("id"));
        
        Optional<LogMessage> checkMessage = logMessageService.findById(id);
        
        assertTrue(checkMessage.isPresent());
        assertEquals(testMessage, checkMessage.get().getMessage());
        
    }

}
