package com.toolc.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toolc.model.ApplicationUser;

public interface ApplicationUserDAO extends JpaRepository<ApplicationUser, UUID> {
    
    ApplicationUser findByUsername(String username);

}
