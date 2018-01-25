package com.toolc.model;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class GenericEntity {
    

    UUID id;    
    Date dateCreated = new Date();    
    Date dateUpdated = new Date();    
    Boolean archived = false;
    
    @Id
    @Column(name="id")
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    @Column(name="date_created")
    public Date getDateCreated() {
        return dateCreated;
    }
    
    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }
    
    @Column(name="date_updated")
    public Date getDateUpdated() {
        return dateUpdated;
    }
    
    public void setDateUpdated(Date dateUpdated) {
        this.dateUpdated = dateUpdated;
    }
    
    @Column(name="archived")
    public Boolean getArchived() {
        return archived;
    }
    
    public void setArchived(Boolean archived) {
        this.archived = archived;
    }
    
    
}
