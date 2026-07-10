package com.cusoc.accessaudit.repository;

import com.cusoc.accessaudit.entity.Audit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditRepository extends JpaRepository<Audit, Long> {
    /** All audits for a specific building. */
    List<Audit> findByBuildingId(Long buildingId);
    /** All audits submitted by a specific auditor. */
    List<Audit> findByAuditorId(Long auditorId);
    /** All audits with a given status (e.g., DRAFT, SUBMITTED). */
    List<Audit> findByStatus(String status);
}
