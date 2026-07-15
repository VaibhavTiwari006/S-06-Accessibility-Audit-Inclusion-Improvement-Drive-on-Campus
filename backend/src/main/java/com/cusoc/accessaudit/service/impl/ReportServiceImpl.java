package com.cusoc.accessaudit.service.impl;

import com.cusoc.accessaudit.entity.*;
import com.cusoc.accessaudit.exception.ResourceNotFoundException;
import com.cusoc.accessaudit.repository.*;
import com.cusoc.accessaudit.service.ReportService;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.awt.Color;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final BuildingRepository buildingRepository;
    private final AuditRepository auditRepository;
    private final MaintenanceTaskRepository maintenanceTaskRepository;
    private final StudentReportRepository studentReportRepository;

    @Override
    @Transactional(readOnly = true)
    public byte[] generateCampusAccessibilityReport() {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4, 36, 36, 54, 36);
        
        try {
            PdfWriter.getInstance(document, out);
            document.open();
            
            // Header / Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, new Color(27, 54, 93));
            Paragraph title = new Paragraph("AccessAudit - Campus Accessibility Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(10);
            document.add(title);
            
            // Subtitle / Date
            Font metaFont = FontFactory.getFont(FontFactory.HELVETICA, 10, Color.GRAY);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            Paragraph meta = new Paragraph("Generated on: " + LocalDateTime.now().format(formatter) + " | RPWD Act 2016 & WCAG 2.1 AA Compliance", metaFont);
            meta.setAlignment(Element.ALIGN_CENTER);
            meta.setSpacingAfter(20);
            document.add(meta);
            
            // Brief Intro
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 11, new Color(74, 74, 74));
            Paragraph intro = new Paragraph(
                "This document provides a summary of audited physical and digital accessibility conditions of campus buildings. " +
                "Scores are evaluated based on standard audits checking for ramps, washrooms, lifts, tactile paths, signage, and digital systems compliance.",
                normalFont
            );
            intro.setSpacingAfter(20);
            document.add(intro);
            
            // Metrics / Overview Cards Table
            PdfPTable statsTable = new PdfPTable(3);
            statsTable.setWidthPercentage(100);
            statsTable.setSpacingAfter(20);
            
            List<Building> buildings = buildingRepository.findAll();
            List<Audit> audits = auditRepository.findAll();
            
            double avgScore = audits.stream()
                    .filter(a -> "APPROVED".equals(a.getStatus()))
                    .mapToDouble(Audit::getOverallAccessibilityScore)
                    .average()
                    .orElse(0.0);
            
            statsTable.addCell(createStatsCell("Total Buildings Audited", String.valueOf(buildings.size())));
            statsTable.addCell(createStatsCell("Approved Audits", String.valueOf(audits.stream().filter(a -> "APPROVED".equals(a.getStatus())).count())));
            statsTable.addCell(createStatsCell("Average Compliance Score", String.format("%.2f%%", avgScore)));
            document.add(statsTable);
            
            // Section Title
            Font sectionFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, new Color(27, 54, 93));
            Paragraph sectionTitle = new Paragraph("Audited Buildings Summary", sectionFont);
            sectionTitle.setSpacingAfter(10);
            document.add(sectionTitle);
            
            // Buildings Table
            PdfPTable table = new PdfPTable(new float[]{3, 2, 2, 2, 2});
            table.setWidthPercentage(100);
            
            // Table Header
            String[] headers = {"Building Name", "Location", "Type", "Floors", "Latest Score"};
            for (String header : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(header, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, Color.WHITE)));
                cell.setBackgroundColor(new Color(27, 54, 93));
                cell.setPadding(8);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);
            }
            
            for (Building building : buildings) {
                table.addCell(createTableCell(building.getBuildingName(), Element.ALIGN_LEFT));
                table.addCell(createTableCell(building.getLocation(), Element.ALIGN_CENTER));
                table.addCell(createTableCell(building.getStatus(), Element.ALIGN_CENTER));
                table.addCell(createTableCell(String.valueOf(building.getNumberOfFloors()), Element.ALIGN_CENTER));
                
                // Get latest score for the building
                List<Audit> bAudits = auditRepository.findByBuildingId(building.getId());
                Optional<Audit> latestApproved = bAudits.stream()
                        .filter(a -> "APPROVED".equals(a.getStatus()))
                        .findFirst();
                
                if (latestApproved.isPresent()) {
                    double score = latestApproved.get().getOverallAccessibilityScore();
                    String scoreText = String.format("%.1f%%", score);
                    PdfPCell scoreCell = new PdfPCell(new Phrase(scoreText, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, getScoreColor(score))));
                    scoreCell.setPadding(8);
                    scoreCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(scoreCell);
                } else {
                    PdfPCell scoreCell = new PdfPCell(new Phrase("N/A", FontFactory.getFont(FontFactory.HELVETICA, 10, Color.GRAY)));
                    scoreCell.setPadding(8);
                    scoreCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(scoreCell);
                }
            }
            
            document.add(table);
            
        } catch (DocumentException e) {
            throw new RuntimeException("Error during PDF creation: " + e.getMessage(), e);
        } finally {
            document.close();
        }
        
        return out.toByteArray();
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] generateBuildingAccessibilityReport(Long buildingId) {
        Building building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + buildingId));
                
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4, 36, 36, 54, 36);
        
        try {
            PdfWriter.getInstance(document, out);
            document.open();
            
            // Header / Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, new Color(27, 54, 93));
            Paragraph title = new Paragraph("Building Accessibility Audit Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(5);
            document.add(title);
            
            // Subtitle
            Font subtitleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, new Color(74, 74, 74));
            Paragraph sub = new Paragraph(building.getBuildingName(), subtitleFont);
            sub.setAlignment(Element.ALIGN_CENTER);
            sub.setSpacingAfter(10);
            document.add(sub);
            
            // Metadata
            Font metaFont = FontFactory.getFont(FontFactory.HELVETICA, 10, Color.GRAY);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            Paragraph meta = new Paragraph("Generated on: " + LocalDateTime.now().format(formatter) + " | Code: " + building.getBuildingCode(), metaFont);
            meta.setAlignment(Element.ALIGN_CENTER);
            meta.setSpacingAfter(20);
            document.add(meta);
            
            // Info block
            PdfPTable infoTable = new PdfPTable(2);
            infoTable.setWidthPercentage(100);
            infoTable.setSpacingAfter(20);
            
            infoTable.addCell(createInfoCell("Location", building.getLocation()));
            infoTable.addCell(createInfoCell("Floors", String.valueOf(building.getNumberOfFloors())));
            infoTable.addCell(createInfoCell("Description", building.getDescription() != null ? building.getDescription() : "N/A"));
            infoTable.addCell(createInfoCell("Status", building.getStatus()));
            document.add(infoTable);
            
            // Audits section
            List<Audit> audits = auditRepository.findByBuildingId(buildingId);
            Optional<Audit> latestApproved = audits.stream()
                    .filter(a -> "APPROVED".equals(a.getStatus()))
                    .findFirst();
            
            if (latestApproved.isPresent()) {
                Audit audit = latestApproved.get();
                
                Font sectionFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, new Color(27, 54, 93));
                Paragraph sectionTitle = new Paragraph(String.format("Latest Approved Audit Details (Score: %.2f%%)", audit.getOverallAccessibilityScore()), sectionFont);
                sectionTitle.setSpacingAfter(10);
                document.add(sectionTitle);
                
                // Score card representation
                PdfPTable scoreTable = new PdfPTable(1);
                scoreTable.setWidthPercentage(100);
                scoreTable.setSpacingAfter(15);
                
                double score = audit.getOverallAccessibilityScore();
                PdfPCell scoreCell = new PdfPCell(new Paragraph(String.format("Accessibility Score: %.1f%%", score), FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, Color.WHITE)));
                scoreCell.setBackgroundColor(getScoreColor(score));
                scoreCell.setPadding(10);
                scoreCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                scoreTable.addCell(scoreCell);
                document.add(scoreTable);
                
                // Audit info details
                Font valueFont = FontFactory.getFont(FontFactory.HELVETICA, 11, new Color(74, 74, 74));
                Paragraph auditInfo = new Paragraph(
                    "Auditor: " + audit.getAuditor().getFullName() + " | Date: " + audit.getAuditDate() + "\n" +
                    "Remarks: " + (audit.getRemarks() != null ? audit.getRemarks() : "No remarks provided."),
                    valueFont
                );
                auditInfo.setSpacingAfter(20);
                document.add(auditInfo);
                
                // Checklist Responses
                Paragraph checklistTitle = new Paragraph("Detailed Audit Responses", sectionFont);
                checklistTitle.setSpacingAfter(10);
                document.add(checklistTitle);
                
                PdfPTable responseTable = new PdfPTable(new float[]{1, 5, 2, 2});
                responseTable.setWidthPercentage(100);
                
                String[] respHeaders = {"#", "Category & Question", "Score", "Notes"};
                for (String header : respHeaders) {
                    PdfPCell cell = new PdfPCell(new Phrase(header, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, Color.WHITE)));
                    cell.setBackgroundColor(new Color(27, 54, 93));
                    cell.setPadding(8);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    responseTable.addCell(cell);
                }
                
                List<AuditResponse> responses = audit.getResponses();
                int idx = 1;
                for (AuditResponse resp : responses) {
                    responseTable.addCell(createTableCell(String.valueOf(idx++), Element.ALIGN_CENTER));
                    
                    String qText = "[" + resp.getChecklist().getCategory().getCategoryName() + "]\n" + resp.getChecklist().getQuestion();
                    responseTable.addCell(createTableCell(qText, Element.ALIGN_LEFT));
                    
                    String scoreText = resp.getScore() + " / " + resp.getChecklist().getMaximumScore();
                    responseTable.addCell(createTableCell(scoreText, Element.ALIGN_CENTER));
                    
                    responseTable.addCell(createTableCell(resp.getComments() != null ? resp.getComments() : "", Element.ALIGN_LEFT));
                }
                document.add(responseTable);
            } else {
                Font valueFont = FontFactory.getFont(FontFactory.HELVETICA, 11, new Color(74, 74, 74));
                Paragraph noAudit = new Paragraph("No approved accessibility audit reports available for this building.", valueFont);
                noAudit.setSpacingAfter(20);
                document.add(noAudit);
            }
            
        } catch (DocumentException e) {
            throw new RuntimeException("Error during PDF creation: " + e.getMessage(), e);
        } finally {
            document.close();
        }
        
        return out.toByteArray();
    }
    
    private PdfPCell createStatsCell(String title, String value) {
        PdfPCell cell = new PdfPCell();
        cell.setPadding(10);
        cell.setBackgroundColor(new Color(245, 245, 245));
        cell.setBorderColor(new Color(220, 220, 220));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        
        Paragraph pTitle = new Paragraph(title, FontFactory.getFont(FontFactory.HELVETICA, 10, Color.GRAY));
        pTitle.setAlignment(Element.ALIGN_CENTER);
        cell.addElement(pTitle);
        
        Paragraph pValue = new Paragraph(value, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, new Color(27, 54, 93)));
        pValue.setAlignment(Element.ALIGN_CENTER);
        pValue.setSpacingBefore(5);
        cell.addElement(pValue);
        
        return cell;
    }
    
    private PdfPCell createInfoCell(String label, String value) {
        PdfPCell cell = new PdfPCell();
        cell.setPadding(8);
        cell.setBorder(Rectangle.NO_BORDER);
        
        Paragraph pLabel = new Paragraph(label, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, new Color(27, 54, 93)));
        cell.addElement(pLabel);
        
        Paragraph pValue = new Paragraph(value, FontFactory.getFont(FontFactory.HELVETICA, 11, new Color(74, 74, 74)));
        cell.addElement(pValue);
        
        return cell;
    }
    
    private PdfPCell createTableCell(String text, int alignment) {
        PdfPCell cell = new PdfPCell(new Phrase(text, FontFactory.getFont(FontFactory.HELVETICA, 9, new Color(74, 74, 74))));
        cell.setPadding(8);
        cell.setHorizontalAlignment(alignment);
        cell.setBorderColor(new Color(230, 230, 230));
        return cell;
    }
    
    private Color getScoreColor(double score) {
        if (score >= 80.0) {
            return new Color(46, 125, 50); // Success Green
        } else if (score >= 50.0) {
            return new Color(239, 108, 0); // Warning Orange
        } else {
            return new Color(198, 40, 40); // Danger Red
        }
    }
}
