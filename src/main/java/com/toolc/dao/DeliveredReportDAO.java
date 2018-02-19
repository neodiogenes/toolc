package com.toolc.dao;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.toolc.model.ApplicationUser;
import com.toolc.model.DeliveredReport;

public interface DeliveredReportDAO extends JpaRepository<DeliveredReport, UUID> {
    
    @Query("select d from DeliveredReport d where d.scheduledReport.owner = ?1")
    List<DeliveredReport> findByOwner(ApplicationUser user);

}
