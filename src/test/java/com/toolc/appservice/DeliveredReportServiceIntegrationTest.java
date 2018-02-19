package com.toolc.appservice;

import static org.junit.Assert.assertTrue;

import java.util.List;

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

import com.toolc.model.DeliveredReport;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles({"local", "app_runner"})
public class DeliveredReportServiceIntegrationTest {

    @Autowired DeliveredReportService service;

    final String testUsername = "alteraa@yahoo.com";
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
    public void testFindByOwner() {
        List<DeliveredReport> reportList = service.findByOwner();
        assertTrue(reportList.size() > 0);
    }

}
