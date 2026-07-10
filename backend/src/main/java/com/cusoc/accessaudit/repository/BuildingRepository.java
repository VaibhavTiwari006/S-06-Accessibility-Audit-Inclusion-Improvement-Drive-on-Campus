package com.cusoc.accessaudit.repository;

import com.cusoc.accessaudit.entity.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {
    boolean existsByBuildingCode(String buildingCode);
    boolean existsByBuildingCodeAndIdNot(String buildingCode, Long id);
}
