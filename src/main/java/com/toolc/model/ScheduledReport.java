package com.toolc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="scheduled_report", 
    indexes = {@Index(name = "idx_scheduledreport_type",  columnList="schedule_type", unique = false)})

public class ScheduledReport extends GenericEntity {

    ApplicationUser owner;
    String name;
    String description;
    String url;
    String format;
    String delivery;
    String scheduleType;
    String savedFilename;
    String dayOfWeek = "Monday";
    int dayOfMonth = 1;
    String filters;
    String emails;
    
    public static final String DAILY = "DAILY";
    public static final String WEEKLY = "WEEKLY";
    public static final String MONTHLY = "MONTHLY";
    public static final String YEARLY = "YEARLY";
    public static final String EMAIL = "EMAIL";
    public static final String LINK = "LINK";
    public static final String API = "API";
    public static final String FTP = "FTP";
    public static final String SFTP = "SFTP";
    public static final String PDF = "PDF";
    public static final String PNG = "PNG";
    public static final String CSV = "CSV";
    public static final String TXT = "TXT";
    
    public static enum ScheduleType {
        DAILY, WEEKLY, MONTHLY, YEARLY
    };
    
    public static enum ScheduleDelivery {
        EMAIL, LINK, FTP, API, SFTP
    };
    
    public static enum ScheduleFormat {
        PDF, PNG, CSV, TXT
    }
    
        
    @ManyToOne
    @JoinColumn(name="owner_id")
    public ApplicationUser getOwner() {
        return this.owner;
    }    
    public void setOwner(ApplicationUser owner) {
        this.owner = owner;
    }
    
    @Column(name="name")
    public String getName() {
        return name;
    }    
    public void setName(String name) {
        this.name = name;
    }
    
    @Column(name="description")
    public String getDescription() {
        return description;
    }    
    public void setDescription(String description) {
        this.description = description;
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

    @Column(name="schedule_type")
    public String getScheduleType() {
        return scheduleType;
    }    
    public void setScheduleType(String scheduleType) {
        this.scheduleType = scheduleType;
    }

    @Column(name="url")
    public String getUrl() {
        return this.url;
    }    
    public void setUrl(String url) {
        this.url = url;
    }
    
    @Column(name="saved_filename") 
    public String getSavedFilename(){
        return this.savedFilename;
    }
    public void setSavedFilename(String savedFilename) {
        this.savedFilename = savedFilename;
    }
    
    @Column(name="day_of_week")
    public String getDayOfWeek() {
        return dayOfWeek;
    }
    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    @Column(name="day_of_month")
    public int getDayOfMonth() {
        return dayOfMonth;
    }
    public void setDayOfMonth(int dayOfMonth) {
        this.dayOfMonth = dayOfMonth;
    }
    
    @Column(name="filters", columnDefinition = "TEXT")
    public String getFilters(){
        return this.filters;
    }
    public void setFilters(String filters){
        this.filters = filters;
    }
    
    @Column(name="emails", columnDefinition = "TEXT")
    public String getEmails() {
        return emails;
    }
    public void setEmails(String emails) {
        this.emails = emails;
    }
}
