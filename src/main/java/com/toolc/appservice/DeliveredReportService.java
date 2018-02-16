package com.toolc.appservice;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.toolc.dao.DeliveredReportDAO;
import com.toolc.model.DeliveredReport;
import com.toolc.model.ScheduledReport;
import com.toolc.model.stub.DeliveredReportStub;

@Service 
public class DeliveredReportService {
    @Autowired DeliveredReportDAO dao;
    @Autowired ScheduledReportService scheduledReportService;
    
    
    public DeliveredReport create(DeliveredReportStub reportStub) throws IllegalArgumentException {
        UUID id = UUID.fromString(reportStub.id);
        
        DeliveredReport report = new DeliveredReport();
        report.setName(reportStub.name);
        report.setFormat(reportStub.format);
        report.setDelivery(reportStub.delivery);
        report.setDateDelivered(reportStub.dateDelivered);
        
        return this.create(id, report);
    }
    
    public DeliveredReport create(UUID scheduledReportId, DeliveredReport report) throws IllegalArgumentException {
        if (report.getId() == null){
            report.setId(UUID.randomUUID());
        }
        
        ScheduledReport sReport = scheduledReportService
                .findById(scheduledReportId)
                .orElseThrow(() -> new IllegalArgumentException("Scheduled Report ID is not valid"));
        
        report.setScheduledReport(sReport);
        
        return dao.save(report);
    }
}   
