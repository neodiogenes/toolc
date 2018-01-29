package com.toolc.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name="application_user")
public class ApplicationUser extends GenericEntity {

    String displayName;    
    String username;    
    UUID companyId;    
    String password;  

    
    @Column(name="display_name")
    public String getDisplayName() {
        return displayName;
    }
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    @Column(name="username", unique=true)
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    @Column(name="company_id")
    public UUID getCompanyId() {
        return companyId;
    }
    public void setCompanyId(UUID companyId) {
        this.companyId = companyId;
    }

    @JsonIgnore
    @Column(name="password")
    public String getPassword() {
        return password;
    }
    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }    
}
