package com.cusoc.accessaudit.repository;

import com.cusoc.accessaudit.entity.PilotImprovement;
import com.cusoc.accessaudit.entity.PilotUpvote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PilotUpvoteRepository extends JpaRepository<PilotUpvote, Long> {
    
    boolean existsByPilotImprovementAndUserEmail(PilotImprovement pilot, String userEmail);
    
    long countByPilotImprovement(PilotImprovement pilot);
    
    void deleteByPilotImprovementAndUserEmail(PilotImprovement pilot, String userEmail);
}
