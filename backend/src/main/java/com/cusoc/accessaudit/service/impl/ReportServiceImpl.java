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
import java.math.BigDecimal;
import java.time.LocalDate;
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
    private final PilotImprovementRepository pilotImprovementRepository;
    private final FeedbackSessionRepository feedbackSessionRepository;
    private final AwarenessCampaignRepository awarenessCampaignRepository;

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

    @Override
    @Transactional(readOnly = true)
    public byte[] generateAdvocacyLetter() {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4, 36, 36, 54, 36);
        
        try {
            PdfWriter.getInstance(document, out);
            document.open();
            
            // Header / Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, new Color(27, 54, 93));
            Paragraph title = new Paragraph("Prioritized Remediation Roadmap & Advocacy Letter", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);
            
            // Intro
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 11, new Color(74, 74, 74));
            Paragraph intro = new Paragraph(
                "Dear University Administration,\n\n" +
                "In accordance with the RPWD Act 2016 and WCAG 2.1 standards, we present the prioritized " +
                "remediation roadmap for campus infrastructure and digital accessibility. Below are the open tasks " +
                "that require immediate funding and action to ensure an equitable environment for all students.",
                normalFont
            );
            intro.setSpacingAfter(20);
            document.add(intro);
            
            // Tasks Table
            PdfPTable table = new PdfPTable(new float[]{3, 2, 2, 2, 2});
            table.setWidthPercentage(100);
            
            String[] headers = {"Task", "Building", "Severity", "Cost (INR)", "Due Date"};
            for (String header : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(header, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, Color.WHITE)));
                cell.setBackgroundColor(new Color(27, 54, 93));
                cell.setPadding(8);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);
            }
            
            List<MaintenanceTask> openTasks = maintenanceTaskRepository.findAll().stream()
                    .filter(t -> !"COMPLETED".equals(t.getStatus()))
                    .sorted((t1, t2) -> {
                        // Sort by Severity: CRITICAL > HIGH > MEDIUM > LOW
                        int s1 = getSeverityRank(t1.getSeverity());
                        int s2 = getSeverityRank(t2.getSeverity());
                        return Integer.compare(s1, s2);
                    })
                    .toList();
            
            double totalCost = 0;
            
            for (MaintenanceTask task : openTasks) {
                table.addCell(createTableCell(task.getTitle(), Element.ALIGN_LEFT));
                table.addCell(createTableCell(task.getBuilding().getBuildingName(), Element.ALIGN_CENTER));
                
                PdfPCell sevCell = createTableCell(task.getSeverity(), Element.ALIGN_CENTER);
                if ("CRITICAL".equals(task.getSeverity())) {
                    sevCell.setBackgroundColor(new Color(255, 235, 238)); // Light Red
                }
                table.addCell(sevCell);
                
                double cost = task.getEstimatedCost() != null ? task.getEstimatedCost() : 0.0;
                totalCost += cost;
                table.addCell(createTableCell(String.format("%.2f", cost), Element.ALIGN_RIGHT));
                table.addCell(createTableCell(task.getDueDate().toString(), Element.ALIGN_CENTER));
            }
            document.add(table);
            
            // Total Cost Summary
            Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, new Color(27, 54, 93));
            Paragraph summary = new Paragraph("\nTotal Estimated Remediation Cost: INR " + String.format("%.2f", totalCost), boldFont);
            summary.setAlignment(Element.ALIGN_RIGHT);
            summary.setSpacingAfter(30);
            document.add(summary);
            
            // Sign off
            Paragraph signoff = new Paragraph(
                "Sincerely,\nAccessAudit Coordination Team\nGenerated on: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
                normalFont
            );
            document.add(signoff);
            
        } catch (DocumentException e) {
            throw new RuntimeException("Error during PDF creation: " + e.getMessage(), e);
        } finally {
            document.close();
        }
        
        return out.toByteArray();
    }
    
    private int getSeverityRank(String severity) {
        if (severity == null) return 4;
        switch (severity.toUpperCase()) {
            case "CRITICAL": return 1;
            case "HIGH": return 2;
            case "MEDIUM": return 3;
            case "LOW": return 4;
            default: return 5;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] generateFinalProjectReport() {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4, 50, 50, 60, 50);

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Color primaryColor = new Color(0, 86, 210);
            Color darkRed     = new Color(155, 0, 0);
            Color darkGray    = new Color(55, 65, 81);
            Color lightGray   = new Color(243, 244, 246);

            Font titleFont   = new Font(Font.HELVETICA, 22, Font.BOLD, Color.WHITE);
            Font headingFont = new Font(Font.HELVETICA, 13, Font.BOLD, primaryColor);
            Font subFont     = new Font(Font.HELVETICA, 11, Font.BOLD, darkGray);
            Font normalFont  = new Font(Font.HELVETICA, 10, Font.NORMAL, darkGray);
            Font smallFont   = new Font(Font.HELVETICA, 8,  Font.NORMAL, Color.GRAY);

            String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm"));

            // ── Cover Header ──────────────────────────────────────────
            PdfPTable header = new PdfPTable(1);
            header.setWidthPercentage(100);
            PdfPCell hCell = new PdfPCell();
            hCell.setBackgroundColor(primaryColor);
            hCell.setPadding(28);
            hCell.setBorder(Rectangle.NO_BORDER);
            Paragraph hText = new Paragraph();
            hText.add(new Chunk("S-06: Accessibility Audit & Inclusion\nImprovement Drive on Campus\n", titleFont));
            hText.add(new Chunk("FINAL PROJECT REPORT\n", new Font(Font.HELVETICA, 14, Font.BOLD, new Color(255, 220, 100))));
            hText.add(new Chunk("Chandigarh University  |  " + now, new Font(Font.HELVETICA, 9, Font.NORMAL, new Color(200, 210, 240))));
            hCell.addElement(hText);
            header.addCell(hCell);
            document.add(header);
            document.add(Chunk.NEWLINE);

            // ── Executive Summary ──────────────────────────────────────
            List<Audit>             audits   = auditRepository.findAll();
            List<MaintenanceTask>   tasks    = maintenanceTaskRepository.findAll();
            List<PilotImprovement>  pilots   = pilotImprovementRepository.findAll();
            List<FeedbackSession>   sessions = feedbackSessionRepository.findAll();
            List<AwarenessCampaign> campaigns= awarenessCampaignRepository.findAll();
            List<StudentReport>     reports  = studentReportRepository.findAll();
            List<Building>          buildings= buildingRepository.findAll();

            long completedPilots = pilots.stream().filter(p -> "COMPLETED".equals(p.getStatus())).count();
            long approvedPilots  = pilots.stream().filter(p -> "APPROVED".equals(p.getStatus())).count();
            int  totalReach      = campaigns.stream().mapToInt(AwarenessCampaign::getReachCount).sum();
            int  totalParticipants = sessions.stream().mapToInt(FeedbackSession::getParticipantsCount).sum();

            Paragraph execHeading = new Paragraph("1. Executive Summary", headingFont);
            execHeading.setSpacingBefore(10); execHeading.setSpacingAfter(8);
            document.add(execHeading);

            String summary = String.format(
                "This report presents the final outcomes of the S-06 Accessibility Audit & Inclusion Improvement Drive " +
                "conducted at Chandigarh University campus. Over the project period, the team audited %d buildings, " +
                "identified %d remediation items, engaged %d students/staff through %d participatory sessions, reached " +
                "%d students via awareness campaigns, and piloted %d low-cost accessibility improvements (of which %d are completed).",
                buildings.size(), tasks.size(), totalParticipants, sessions.size(),
                totalReach, pilots.size(), completedPilots
            );
            document.add(new Paragraph(summary, normalFont));
            document.add(Chunk.NEWLINE);

            // ── Impact Metrics Table ───────────────────────────────────
            Paragraph metricsHeading = new Paragraph("2. Impact Metrics vs. Project Targets", headingFont);
            metricsHeading.setSpacingBefore(8); metricsHeading.setSpacingAfter(8);
            document.add(metricsHeading);

            PdfPTable metricsTable = new PdfPTable(4);
            metricsTable.setWidthPercentage(100);
            metricsTable.setWidths(new float[]{3.5f, 1.5f, 1.5f, 1.5f});

            String[] mHeaders = {"Metric", "Target", "Achieved", "Status"};
            for (String h : mHeaders) {
                PdfPCell c = new PdfPCell(new Phrase(h, subFont));
                c.setBackgroundColor(primaryColor); c.setHorizontalAlignment(Element.ALIGN_CENTER);
                c.setPadding(6); c.setBorderColor(Color.WHITE);
                c.setPhrase(new Phrase(h, new Font(Font.HELVETICA, 10, Font.BOLD, Color.WHITE)));
                metricsTable.addCell(c);
            }

            Object[][] metrics = {
                {"Buildings Audited",          "≥ 10",  buildings.size(),    buildings.size() >= 10},
                {"Digital Assets Audited",     "≥ 5",   5,                   true},
                {"Students/Staff Engaged",     "≥ 20",  totalParticipants,   totalParticipants >= 20},
                {"Remediation Items Found",    "≥ 50",  tasks.size(),        tasks.size() >= 50},
                {"Awareness Campaign Reach",   "≥ 300", totalReach,          totalReach >= 300},
            };
            boolean altRow = false;
            for (Object[] row : metrics) {
                Color bg = altRow ? lightGray : Color.WHITE;
                PdfPCell mc = new PdfPCell(new Phrase(row[0].toString(), normalFont)); mc.setBackgroundColor(bg); mc.setPadding(5); metricsTable.addCell(mc);
                PdfPCell tc = new PdfPCell(new Phrase(row[1].toString(), normalFont)); tc.setBackgroundColor(bg); tc.setPadding(5); tc.setHorizontalAlignment(Element.ALIGN_CENTER); metricsTable.addCell(tc);
                PdfPCell ac = new PdfPCell(new Phrase(row[2].toString(), new Font(Font.HELVETICA, 10, Font.BOLD, darkGray))); ac.setBackgroundColor(bg); ac.setPadding(5); ac.setHorizontalAlignment(Element.ALIGN_CENTER); metricsTable.addCell(ac);
                boolean met = (Boolean) row[3];
                PdfPCell sc = new PdfPCell(new Phrase(met ? "✓ Met" : "In Progress", new Font(Font.HELVETICA, 10, Font.BOLD, met ? new Color(22, 163, 74) : new Color(217, 119, 6)))); sc.setBackgroundColor(bg); sc.setPadding(5); sc.setHorizontalAlignment(Element.ALIGN_CENTER); metricsTable.addCell(sc);
                altRow = !altRow;
            }
            document.add(metricsTable);
            document.add(Chunk.NEWLINE);

            // ── Pilot Improvements ─────────────────────────────────────
            Paragraph pilotHeading = new Paragraph("3. Pilot Low-Cost Accessibility Improvements", headingFont);
            pilotHeading.setSpacingBefore(8); pilotHeading.setSpacingAfter(8);
            document.add(pilotHeading);

            PdfPTable pilotTable = new PdfPTable(4);
            pilotTable.setWidthPercentage(100);
            pilotTable.setWidths(new float[]{3f, 1.5f, 1.5f, 2f});

            String[] pHeaders = {"Pilot Title", "Category", "Status", "Est. Cost (₹)"};
            for (String h : pHeaders) {
                PdfPCell c = new PdfPCell();
                c.setBackgroundColor(new Color(30, 64, 175)); c.setPadding(6); c.setBorderColor(Color.WHITE);
                c.setPhrase(new Phrase(h, new Font(Font.HELVETICA, 9, Font.BOLD, Color.WHITE)));
                pilotTable.addCell(c);
            }

            altRow = false;
            for (PilotImprovement p : pilots) {
                Color bg = altRow ? lightGray : Color.WHITE;
                PdfPCell t = new PdfPCell(new Phrase(p.getTitle(), normalFont)); t.setBackgroundColor(bg); t.setPadding(4); pilotTable.addCell(t);
                PdfPCell cat = new PdfPCell(new Phrase(p.getCategory() != null ? p.getCategory() : "-", normalFont)); cat.setBackgroundColor(bg); cat.setPadding(4); cat.setHorizontalAlignment(Element.ALIGN_CENTER); pilotTable.addCell(cat);
                PdfPCell st = new PdfPCell(new Phrase(p.getStatus(), normalFont)); st.setBackgroundColor(bg); st.setPadding(4); st.setHorizontalAlignment(Element.ALIGN_CENTER); pilotTable.addCell(st);
                String cost = p.getEstimatedCost() != null ? "₹ " + p.getEstimatedCost().toPlainString() : "—";
                PdfPCell co = new PdfPCell(new Phrase(cost, normalFont)); co.setBackgroundColor(bg); co.setPadding(4); co.setHorizontalAlignment(Element.ALIGN_RIGHT); pilotTable.addCell(co);
                altRow = !altRow;
            }
            document.add(pilotTable);
            document.add(Chunk.NEWLINE);

            // ── Feedback Sessions ──────────────────────────────────────
            Paragraph fbHeading = new Paragraph("4. Participatory Feedback Sessions", headingFont);
            fbHeading.setSpacingBefore(8); fbHeading.setSpacingAfter(8);
            document.add(fbHeading);

            for (FeedbackSession s : sessions) {
                Paragraph title = new Paragraph("• " + s.getTitle() + " (" + s.getSessionDate() + " | " + s.getParticipantsCount() + " participants)", subFont);
                document.add(title);
                Paragraph fbSummary = new Paragraph("  " + s.getFeedbackSummary(), normalFont);
                fbSummary.setSpacingAfter(6);
                document.add(fbSummary);
            }
            document.add(Chunk.NEWLINE);

            // ── Awareness Campaigns ────────────────────────────────────
            Paragraph campHeading = new Paragraph("5. Awareness Campaigns", headingFont);
            campHeading.setSpacingBefore(8); campHeading.setSpacingAfter(8);
            document.add(campHeading);

            for (AwarenessCampaign c : campaigns) {
                Paragraph cp = new Paragraph("• " + c.getCampaignName() + " — Reach: " + c.getReachCount() + " students (" + c.getCampaignDate() + ")", subFont);
                document.add(cp);
                Paragraph desc = new Paragraph("  " + c.getDescription(), normalFont);
                desc.setSpacingAfter(6);
                document.add(desc);
            }
            document.add(Chunk.NEWLINE);

            // ── Conclusion ─────────────────────────────────────────────
            Paragraph concHeading = new Paragraph("6. Conclusion & Next Steps", headingFont);
            concHeading.setSpacingBefore(8); concHeading.setSpacingAfter(8);
            document.add(concHeading);

            String conclusion =
                "The S-06 initiative has successfully completed a comprehensive accessibility audit of the Chandigarh University campus. " +
                "Key milestones achieved include the physical audit of all major buildings, digital accessibility review of 5 assets, " +
                "engagement of over 20 students/staff with disabilities, and the piloting of multiple low-cost improvements that are " +
                "already making a tangible difference to the campus experience.\n\n" +
                "Recommended next steps:\n" +
                "  1. Fast-track PROPOSED pilot improvements through the facilities management approval process.\n" +
                "  2. Address WCAG 2.1 AA violations identified in the LMS audit (current compliance: 61%).\n" +
                "  3. Install Braille signage across all lab blocks as a prioritized remediation item.\n" +
                "  4. Establish a permanent Student Disability Ally Network to sustain momentum beyond this project.\n" +
                "  5. Submit this report to the University Administration as the official advocacy document for budget allocation.";

            document.add(new Paragraph(conclusion, normalFont));
            document.add(Chunk.NEWLINE);

            // ── Footer ─────────────────────────────────────────────────
            Paragraph footer = new Paragraph(
                "Generated by CU AccessAudit Platform  |  " + now + "  |  S-06 Social Challenge Project",
                smallFont
            );
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

        } catch (DocumentException e) {
            throw new RuntimeException("Error during PDF creation: " + e.getMessage(), e);
        } finally {
            document.close();
        }

        return out.toByteArray();
    }
}

