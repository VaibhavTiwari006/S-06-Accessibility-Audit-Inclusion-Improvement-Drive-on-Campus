package com.cusoc.accessaudit.service;

public interface ReportService {
    byte[] generateCampusAccessibilityReport();
    byte[] generateBuildingAccessibilityReport(Long buildingId);
    byte[] generateAdvocacyLetter();
    byte[] generateFinalProjectReport();
}
