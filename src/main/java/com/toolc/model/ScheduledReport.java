package com.toolc.model;

import java.net.URI;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="scheduled_report")
public class ScheduledReport extends GenericEntity {

    ApplicationUser owner;
    String name;
    String description;
    URI url;
    String format;
    String delivery;
    String scheduleType;
    String savedFilename;
    String dayOfWeek = "Monday";
    int dayOfMonth = 1;
    
    public static final String DAILY = "DAILY";
    public static final String WEEKLY = "WEEKLY";
    public static final String MONTHLY = "MONTHLY";
    public static final String EMAIL = "EMAIL";
    public static final String LINK = "LINK";
    
    public static enum scheduleTypes {
        DAILY, WEEKLY, MONTHLY
    };
    
    //@Transient
    //String scheduleDetail;
    
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
    
    //@Column(name="schedule_detail", columnDefinition = "TEXT")
/*    public String getScheduleDetail() {
        return scheduleDetail;
    }    
    public void setScheduleDetail(String scheduleDetail) {
        this.scheduleDetail = scheduleDetail;
    }*/

    @Column(name="url")
    public URI getUrl() {
        return this.url;
    }    
    public void setUrl(URI url) {
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
    

    
    
}
