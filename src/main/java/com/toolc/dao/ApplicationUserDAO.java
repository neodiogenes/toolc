package com.toolc.dao;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.toolc.model.ApplicationUser;

public interface ApplicationUserDAO extends JpaRepository<ApplicationUser, UUID> {
    
    ApplicationUser findByUsername(String username);
    ApplicationUser findByUsernameAndArchived(String username, boolean archived);
    
    List<ApplicationUser> findByArchived(Boolean archived);
    
    @Modifying
    @Query("update ApplicationUser user set user.details = ?1 where user.id = ?2")
    int setFixedDetailsFor(String details, UUID id);
}
