package com.cusoc.accessaudit.repository;

import com.cusoc.accessaudit.entity.Evidence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvidenceRepository extends JpaRepository<Evidence, Long> {
    List<Evidence> findByAuditId(Long auditId);
}
