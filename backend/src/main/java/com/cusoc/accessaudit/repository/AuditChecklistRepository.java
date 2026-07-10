package com.cusoc.accessaudit.repository;

import com.cusoc.accessaudit.entity.AuditChecklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditChecklistRepository extends JpaRepository<AuditChecklist, Long> {
    /** Find all checklist items belonging to a given category. */
    List<AuditChecklist> findByCategoryId(Long categoryId);
    /** Check if a question already exists within the same category. */
    boolean existsByQuestionAndCategoryId(String question, Long categoryId);
    boolean existsByQuestionAndCategoryIdAndIdNot(String question, Long categoryId, Long id);
}
