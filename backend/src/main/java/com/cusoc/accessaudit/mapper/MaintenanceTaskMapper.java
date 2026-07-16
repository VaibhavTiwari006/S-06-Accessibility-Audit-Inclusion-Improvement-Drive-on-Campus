package com.cusoc.accessaudit.mapper;

import com.cusoc.accessaudit.dto.MaintenanceTaskResponse;
import com.cusoc.accessaudit.entity.MaintenanceTask;
import org.springframework.stereotype.Component;

@Component
public class MaintenanceTaskMapper {

    public MaintenanceTaskResponse toResponse(MaintenanceTask task) {
        if (task == null) {
            return null;
        }

        return MaintenanceTaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .severity(task.getSeverity())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .completionNotes(task.getCompletionNotes())
                .completionPhotoUrl(task.getCompletionPhotoUrl())
                .buildingId(task.getBuilding() != null ? task.getBuilding().getId() : null)
                .buildingName(task.getBuilding() != null ? task.getBuilding().getBuildingName() : null)
                .assigneeId(task.getAssignee() != null ? task.getAssignee().getId() : null)
                .assigneeName(task.getAssignee() != null ? task.getAssignee().getFullName() : null)
                .sourceAuditId(task.getSourceAudit() != null ? task.getSourceAudit().getId() : null)
                .sourceReportId(task.getSourceReport() != null ? task.getSourceReport().getId() : null)
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .estimatedCost(task.getEstimatedCost())
                .build();
    }
}
