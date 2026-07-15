package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.StudentReportRequest;
import com.cusoc.accessaudit.dto.StudentReportResponse;
import com.cusoc.accessaudit.dto.StudentReportStatusRequest;

import java.util.List;

public interface StudentReportService {
    StudentReportResponse createReport(StudentReportRequest request, String reporterEmail);
    List<StudentReportResponse> getReports(Long buildingId, String status);
    List<StudentReportResponse> getMyReports(String reporterEmail);
    StudentReportResponse getReportById(Long id, String currentUserEmail);
    StudentReportResponse updateStatus(Long id, StudentReportStatusRequest request);
}
