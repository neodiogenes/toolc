package com.toolc.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toolc.model.DeliveredReport;

public interface DeliveredReportDAO extends JpaRepository<DeliveredReport, UUID> {

}
