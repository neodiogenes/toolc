package com.toolc.appservice;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.toolc.dao.DeliveredReportDAO;
import com.toolc.model.DeliveredReport;
import com.toolc.model.ScheduledReport;
import com.toolc.model.stub.DeliveredReportStub;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles({"local", "test"})
public class DeliveredReportServiceTest {
    
    @Autowired DeliveredReportService service;
    
    @Mock private DeliveredReport report;
    @Mock private DeliveredReportStub stub;
    @Mock private ScheduledReport scheduledReport;
    
    @MockBean private DeliveredReportDAO dao;
    
    @MockBean private ScheduledReportService scheduledReportService;
    
    UUID scheduledReportId;
    boolean setupComplete = false;
    
    @Before
    public void setup() {
        if (!setupComplete) {
            scheduledReportId = UUID.randomUUID();
            scheduledReport = new ScheduledReport();
            scheduledReport.setId(scheduledReportId);
            scheduledReport.setName("Test Scheduled Report");
            scheduledReport.setFormat(ScheduledReport.PDF);
            scheduledReport.setDelivery(ScheduledReport.EMAIL);
            scheduledReport.setScheduleType(ScheduledReport.DAILY);
            
            Mockito.when(dao.save(Mockito.any(DeliveredReport.class)))
                .thenAnswer(i -> i.getArgumentAt(0, DeliveredReport.class));
            
            Mockito.when(scheduledReportService.findById(Mockito.any(UUID.class)))
                .thenReturn(Optional.empty());
            Mockito.when(scheduledReportService.findById(scheduledReport.getId())).thenReturn(Optional.of(scheduledReport));
            
            setupComplete = true;
        }
    }

    
    @Test
    public void testCreate() {
        report = new DeliveredReport();
        report.setFormat(ScheduledReport.PDF);
        report.setDelivery(ScheduledReport.EMAIL);
        report.setName(scheduledReport.getName());
        report.setDateDelivered(new Date());
        
        {            
            report = service.create(scheduledReportId, report);
            assertNotNull(report.getScheduledReport());
            assertEquals(scheduledReportId, report.getScheduledReport().getId());
        }
        
        {            
            try {
                report = service.create(UUID.randomUUID(), report);
                fail("Failed to catch illegal argument");
                
            } catch (IllegalArgumentException e) {
                assertNotNull(e);
            }
        }
    }
    
    @Test
    public void testCreateFromStub() {
        stub = new DeliveredReportStub();
        stub.id = scheduledReportId.toString();
        stub.format = ScheduledReport.PDF;
        stub.delivery = ScheduledReport.EMAIL;
        stub.name = scheduledReport.getName();
        stub.dateDelivered = new Date();
        
        {            
            report = service.create(stub);
            assertNotNull(report.getScheduledReport());
            assertEquals(scheduledReportId, report.getScheduledReport().getId());
        }
    }

    
    @Ignore
    @Test
    public void ignore() {        
    }
}
