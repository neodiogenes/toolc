package com.toolc.appservice;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.toolc.model.ApplicationUser;

import net.minidev.json.JSONObject;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles({"local", "app_runner"})
public class ApplicationUserServiceIntegrationTest {
    
    @Autowired ApplicationUserService service;
    
    final String testUsername = "alteraa@yahoo.com";
    final String oldPassword = "password";
    
    boolean setupComplete = false;
    @Before
    public void setup() {
        if (!setupComplete) {
            MockitoAnnotations.initMocks(this);
            
            Authentication authentication = Mockito.mock(Authentication.class);
            SecurityContext securityContext = Mockito.mock(SecurityContext.class);
            
            Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
            SecurityContextHolder.setContext(securityContext);
            Mockito.when(SecurityContextHolder.getContext().getAuthentication().getName()).thenReturn(testUsername);
            
            setupComplete = true;
        }
    }
    
    @Test
    public void testFindByUsername(){
        Optional<ApplicationUser> oUser = service.findByUsername(testUsername);
        assertTrue(oUser.isPresent());
        assertEquals(testUsername, oUser.get().getUsername());
        
    }
    
    @Test
    public void testUpdateDetails(){
        JSONObject detailJson = new JSONObject();
        detailJson.put("ftpPort", "21");
        detailJson.put("ftpLogin", "FooBart");
        detailJson.put("ftpPassword", "123456");
        
        int returnValue = service.updateDetails(detailJson.toJSONString());
        assertTrue(returnValue > 0);
        
        Optional<ApplicationUser> oUser = service.findByUsername(testUsername);
        assertEquals(detailJson.toJSONString(), oUser.get().getDetails());
    }
}
