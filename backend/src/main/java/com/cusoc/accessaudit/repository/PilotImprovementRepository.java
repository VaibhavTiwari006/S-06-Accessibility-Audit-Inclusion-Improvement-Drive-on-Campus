package com.cusoc.accessaudit.repository;

import com.cusoc.accessaudit.entity.PilotImprovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PilotImprovementRepository extends JpaRepository<PilotImprovement, Long> {
    List<PilotImprovement> findByProposerEmailOrderByCreatedAtDesc(String email);
    List<PilotImprovement> findByStatusOrderByCreatedAtDesc(String status);
    List<PilotImprovement> findAllByOrderByCreatedAtDesc();
    long countByStatus(String status);
}
