package com.toolc.appservice;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.toolc.dao.ScheduledReportDAO;
import com.toolc.model.ApplicationUser;
import com.toolc.model.ScheduledReport;
import com.toolc.utils.TestUtils;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles({"local", "test"})
public class ScheduledReportServiceTest {
    
    @Autowired ScheduledReportService service;
    
    @Mock ApplicationUser testUser;
    
    @MockBean ScheduledReportDAO dao;
    
    @MockBean ApplicationUserService applicationUserService;
    
    private static final String sampleFilename = "test-report.pdf";
    
    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        
        testUser = TestUtils.createTestUser("test_user",  "password", applicationUserService.bCryptPasswordEncoder);
        
        List<ScheduledReport> reportList = new ArrayList<>();
        {
            ScheduledReport report = new ScheduledReport();
            report.setId(UUID.randomUUID());
            report.setOwner(testUser);
            report.setName("ScheduledReportServiceTest Report 1");
            report.setDescription("ScheduledReportServiceTest Description");
            report.setScheduleType("weekly");
            report.setDayOfWeek("Wednesday");
            report.setSavedFilename(sampleFilename);
            reportList.add(report);
        }

        {
            ScheduledReport report = new ScheduledReport();
            report.setId(UUID.randomUUID());
            report.setOwner(testUser);
            report.setName("ScheduledReportServiceTest Report 2");
            report.setDescription("ScheduledReportServiceTest Description");
            report.setScheduleType("montly");
            report.setDayOfMonth(15);
            report.setSavedFilename(sampleFilename);
            reportList.add(report);
        }
        
        Mockito.when(dao.findByOwner(testUser)).thenReturn(reportList);
        
        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        Mockito.when(SecurityContextHolder.getContext().getAuthentication().getName()).thenReturn("test_user");
        Mockito.when(applicationUserService.findByUsername("test_user")).thenReturn(Optional.of(testUser));
    }
    
    @Test
    public void testFindByOwner() {        
        List<ScheduledReport> reports = service.findByOwner();        
        assertEquals(2, reports.size());
    }
    
    @Test
    public void testGetFileFromScheduledReport() throws IOException {
        List<ScheduledReport> reports = service.findByOwner();
        assertTrue(reports.size() > 0);
        
        ClassPathResource res = service.getFileFromScheduledReport(reports.get(0));
        
        assertEquals(sampleFilename, res.getFilename());
        
    }

}
