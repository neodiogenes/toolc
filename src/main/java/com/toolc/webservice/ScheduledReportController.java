package com.toolc.webservice;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toolc.appservice.ApplicationUserService;
import com.toolc.appservice.ScheduledReportService;
import com.toolc.model.ScheduledReport;

@RestController
@RequestMapping("/api/reports")
public class ScheduledReportController {
    
    @Autowired
    ApplicationUserService applicationUserService;
    
    @Autowired
    ScheduledReportService scheduledReportService;
    
    /**
     * Returns all reports assigned to the given logged-in user
     * 
     * @return
     */
    @GetMapping("/all")
    public List<ScheduledReport> getAllScheduledReports() {       
        return scheduledReportService.findByOwner();
    }
    
    /**
     * 
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public ScheduledReport getScheduledReportById(@PathVariable("id") UUID id) {        
        return scheduledReportService.findById(id)
                .orElse(null);
    }
    
    /**
     * 
     * @param id
     * @param report
     * @return ScheduledReport
     */
    @PutMapping("/{id}")
    public ScheduledReport updateScheduledReport(@PathVariable("id") UUID id, @RequestBody ScheduledReport report) {        
        return scheduledReportService.update(report);
    }
    
    /**
     * 
     * @param report
     * @return ScheduledReport
     */
    @PostMapping("/")
    public ScheduledReport createScheduledReport(@RequestBody ScheduledReport report) {        
        return scheduledReportService.create(report);
    }
    
    /**
     * 
     * @param id
     * @return boolean
     */
    @DeleteMapping("/{id}")
    public boolean deleteScheduledReportById(@PathVariable("id") UUID id) {
        return scheduledReportService.deleteById(id);
    }
    
    /**
     * 
     * @param id
     * @param response
     * @return ResponseEntity
     */
    @GetMapping("/file/{id}")
    public ResponseEntity<InputStreamResource> getReportFile(@PathVariable("id") UUID id, HttpServletResponse response){
        
        return scheduledReportService.findById(id)
            .map(report -> {
                String filename = report.getId().toString() + "_" + (new Date()).getTime() + "."  + report.getFormat().toLowerCase();
                
                try {
                    ClassPathResource documentBody = scheduledReportService.getFileFromScheduledReport(report);
                    
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
                    headers.add("Pragma", "no-cache");
                    headers.add("Expires", "0");
                    headers.add("Content-disposition", "attachment; filename="+ filename);

                    return ResponseEntity
                            .ok()
                            .headers(headers)
                            .contentLength(documentBody.contentLength())
                            .contentType(MediaType.parseMediaType("application/pdf"))
                            .body(new InputStreamResource(documentBody.getInputStream()));
                } catch (IOException e) {
                    e.printStackTrace();
                    return new ResponseEntity<InputStreamResource>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            })
            .orElse(new ResponseEntity<InputStreamResource>(HttpStatus.BAD_REQUEST));
    }
    
}
