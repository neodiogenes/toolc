package com.toolc.dao;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.toolc.model.ApplicationUser;
import com.toolc.model.ScheduledReport;

@Repository
public interface ScheduledReportDAO extends JpaRepository<ScheduledReport, UUID> {

    List<ScheduledReport> findByOwner(ApplicationUser owner);
    
}
