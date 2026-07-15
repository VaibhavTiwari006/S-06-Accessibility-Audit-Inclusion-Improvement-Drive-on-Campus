package com.cusoc.accessaudit.mapper;

import com.cusoc.accessaudit.dto.StudentReportResponse;
import com.cusoc.accessaudit.entity.StudentReport;
import org.springframework.stereotype.Component;

@Component
public class StudentReportMapper {

    public StudentReportResponse toResponse(StudentReport report) {
        if (report == null) {
            return null;
        }

        return StudentReportResponse.builder()
                .id(report.getId())
                .buildingId(report.getBuilding() != null ? report.getBuilding().getId() : null)
                .buildingName(report.getBuilding() != null ? report.getBuilding().getBuildingName() : null)
                .reporterId(report.getReporter() != null ? report.getReporter().getId() : null)
                .reporterName(report.getReporter() != null ? report.getReporter().getFullName() : null)
                .description(report.getDescription())
                .locationDetails(report.getLocationDetails())
                .photoUrl(report.getPhotoUrl())
                .status(report.getStatus())
                .adminNotes(report.getAdminNotes())
                .createdAt(report.getCreatedAt())
                .updatedAt(report.getUpdatedAt())
                .build();
    }
}
