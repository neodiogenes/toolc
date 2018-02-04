package com.toolc.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="user_reset_token")
public class UserResetToken extends GenericEntity {
    
    ApplicationUser user;
    String type;
    Date dateExpires = new Date();
    Date dateValidated = null;
    
    public static final String RESET = "RESET";
    public static final String REGISTER = "REGISTER";
    
    public static enum Types {
            RESET, REGISTER
    }
    
    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    public ApplicationUser getUser() {
        return this.user;
    }    
    public void setUser(ApplicationUser user) {
        this.user = user;
    }
    
    @Column(name="type")
    public String getType() {
        return this.type;
    }
    public void setType(String type){
        this.type = type;
    }
    
    @Column(name="date_expires")
    public Date getDateExpires() {
        return dateExpires;
    }    
    public void setDateExpires(Date dateExpires) {
        this.dateExpires = dateExpires;
    }
    
    @Column(name="date_validated")
    public Date getDateValidated(){
        return this.dateValidated;
    }
    public void setDateValidated(Date dateValidated) {
        this.dateValidated = dateValidated;        
    }
    
}
