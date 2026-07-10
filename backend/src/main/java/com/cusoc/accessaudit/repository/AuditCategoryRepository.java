package com.cusoc.accessaudit.repository;

import com.cusoc.accessaudit.entity.AuditCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditCategoryRepository extends JpaRepository<AuditCategory, Long> {
    boolean existsByCategoryName(String categoryName);
    boolean existsByCategoryNameAndIdNot(String categoryName, Long id);
}
