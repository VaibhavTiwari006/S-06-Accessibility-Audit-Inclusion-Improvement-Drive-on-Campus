package com.cusoc.accessaudit.repository;

import com.cusoc.accessaudit.entity.MaintenanceTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceTaskRepository extends JpaRepository<MaintenanceTask, Long> {
    List<MaintenanceTask> findByAssigneeId(Long assigneeId);
    List<MaintenanceTask> findByBuildingId(Long buildingId);
    List<MaintenanceTask> findByStatus(String status);
}
