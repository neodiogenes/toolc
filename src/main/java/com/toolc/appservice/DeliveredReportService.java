package com.toolc.appservice;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.toolc.appservice.annotation.LogExecutionTime;
import com.toolc.dao.DeliveredReportDAO;
import com.toolc.model.DeliveredReport;
import com.toolc.model.ScheduledReport;
import com.toolc.model.stub.DeliveredReportStub;

@Service 
public class DeliveredReportService {
    @Autowired DeliveredReportDAO dao;
    
    @Autowired ApplicationUserService applicationUserService;
    @Autowired ScheduledReportService scheduledReportService;
    
    @LogExecutionTime    
    @PreAuthorize("authenticated")
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
    
    @PreAuthorize("authenticated")
    @LogExecutionTime
    public List<DeliveredReport> findByOwner() {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        
        return applicationUserService.findByUsername(authentication.getName())
                .map(owner -> dao.findByOwner(owner))
                .orElse(new ArrayList<>());
    }
}   
