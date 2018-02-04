package com.toolc.appservice;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.toolc.appservices.annotation.LogExecutionTime;
import com.toolc.dao.ScheduledReportDAO;
import com.toolc.model.ApplicationUser;
import com.toolc.model.ScheduledReport;

@Service
public class ScheduledReportService {

    @Autowired ScheduledReportDAO dao;
    
    @Autowired ApplicationUserService applicationUserService;
    
    @Autowired ResourceLoader resourceLoader;
    
    
    
    @PreAuthorize("authenticated")
    @LogExecutionTime
    public ScheduledReport update(ScheduledReport report) {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        
        report.setDateUpdated(new Date());
        return dao.save(report);
    }
    
    /**
     * 
     * @param owner
     * @param name
     * @param description
     * @param scheduleType
     * @param scheduleDetail
     * @return
     */
    @PreAuthorize("authenticated")
    @LogExecutionTime
    public ScheduledReport create(ApplicationUser owner, String name, String description, String scheduleType, String dayOfWeek, int dayOfMonth, String timeOfDay) {
        
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        
        ScheduledReport report = new ScheduledReport();
        report.setId(UUID.randomUUID());
        report.setOwner(owner);
        report.setName(name);
        report.setDescription(description);
        report.setScheduleType(scheduleType);
        report.setDayOfWeek(dayOfWeek);
        report.setDayOfMonth(dayOfMonth);
        
        
        return create(report);
    }
    
    /**
     * 
     * @param scheduledReport
     * @return
     */
    @PreAuthorize("authenticated")
    @LogExecutionTime
    public ScheduledReport create(ScheduledReport scheduledReport) {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        
        if (scheduledReport.getId() == null) {
            scheduledReport.setId(UUID.randomUUID());
        }
        
        if (scheduledReport.getOwner() == null || scheduledReport.getOwner().getId() == null) {
            applicationUserService.findByUsername(authentication.getName())
                .ifPresent(owner -> scheduledReport.setOwner(owner));
        }
        
        return dao.save(scheduledReport);
    }
    
    /**
     * 
     * @return
     */
    @PreAuthorize("authenticated")
    @LogExecutionTime
    public List<ScheduledReport> findByOwner() {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        
        return applicationUserService.findByUsername(authentication.getName())
                .map(owner -> dao.findByOwner(owner))
                .orElse(new ArrayList<>());
    }
    
    /**
     * 
     * @param id
     * @return
     */
    @PreAuthorize("authenticated")
    @LogExecutionTime
    public Optional<ScheduledReport> findById(UUID id) { 
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        
        return Optional.ofNullable(dao.findOne(id));
    }

    /**
     * 
     * @param report
     * @return
     * @throws IOException
     */
    public ClassPathResource getFileFromScheduledReport(ScheduledReport report) throws IOException {
        
        //Files.readAllBytes(path)
        //File file = new ClassPathResource(report.getSavedFilename()).getFile();
        return new ClassPathResource(report.getSavedFilename());        
    }

    /**
     * 
     * @param id
     * @return
     */
    @PreAuthorize("authenticated")
    @LogExecutionTime
    public boolean deleteById(UUID id) {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        
        dao.delete(id);
        return true;
    }
}
