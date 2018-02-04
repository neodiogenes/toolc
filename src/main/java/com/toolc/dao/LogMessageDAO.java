package com.toolc.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toolc.model.LogMessage;

public interface LogMessageDAO extends JpaRepository<LogMessage, UUID> {
    

}
