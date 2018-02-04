package com.toolc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="log_message")
public class LogMessage extends GenericEntity {
    
    String logger;
    String level;
    String message;
    
    @Column(name="logger")
    public String getLogger() {
        return logger;
    }
    public void setLogger(String logger) {
        this.logger = logger;
    }
    
    @Column(name="level")
    public String getLevel() {
        return level;
    }
    public void setLevel(String level) {
        this.level = level.toUpperCase();
    }
    
    @Column(name="message", columnDefinition = "TEXT")
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    
}
