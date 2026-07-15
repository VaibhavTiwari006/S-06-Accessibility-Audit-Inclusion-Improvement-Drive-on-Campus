package com.cusoc.accessaudit.repository;

import com.cusoc.accessaudit.entity.StudentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentReportRepository extends JpaRepository<StudentReport, Long> {
    List<StudentReport> findByReporterId(Long reporterId);
    List<StudentReport> findByBuildingId(Long buildingId);
    List<StudentReport> findByStatus(String status);
}
