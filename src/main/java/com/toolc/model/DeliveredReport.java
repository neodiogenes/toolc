package com.toolc.model;

import java.io.File;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="delivered_report")
public class DeliveredReport extends GenericEntity {

    ScheduledReport scheduledReport;
    String name;
    String format;
    String delivery;
    File reportFile;
    Date dateDelivered;
    
    @ManyToOne
    @JoinColumn(name="scheduled_report_id")
    public ScheduledReport getScheduledReport() {
        return scheduledReport;
    }
    public void setScheduledReport(ScheduledReport scheduledReport) {
        this.scheduledReport = scheduledReport;
    }
    
    @Column(name="name")
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    @Column(name="format")
    public String getFormat() {
        return format;
    }    
    public void setFormat(String format) {
        this.format = format;
    }
    
    @Column(name="delivery")
    public String getDelivery() {
        return delivery;
    }    
    public void setDelivery(String delivery) {
        this.delivery = delivery;
    }
    
    @Column(name="file")
    public File getReportFile() {
        return reportFile;
    }
    public void setReportFile(File reportFile) {
        this.reportFile = reportFile;
    }
    
    @Column(name="date_delivered")
    public Date getDateDelivered() {
        return dateDelivered;
    }
    public void setDateDelivered(Date dateDelivered) {
        this.dateDelivered = dateDelivered;
    }
}
