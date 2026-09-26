package com.cusoc.accessaudit.config;

import com.cusoc.accessaudit.entity.*;
import com.cusoc.accessaudit.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@Profile("!test")
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BuildingRepository buildingRepository;
    private final AuditCategoryRepository auditCategoryRepository;
    private final AuditChecklistRepository auditChecklistRepository;
    private final AuditRepository auditRepository;
    private final StudentReportRepository studentReportRepository;
    private final MaintenanceTaskRepository maintenanceTaskRepository;
    private final FeedbackSessionRepository feedbackSessionRepository;
    private final AwarenessCampaignRepository awarenessCampaignRepository;
    private final PilotImprovementRepository pilotImprovementRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            List<User> users = initializeUsers();
            List<Building> buildings = initializeBuildings();
            List<AuditChecklist> checklists = initializeChecklist();
            initializeAudits(users, buildings, checklists);
            initializeStudentReports(users, buildings);
            initializeMaintenanceTasks(users, buildings);
            initializeFeedbackSessions();
            initializeAwarenessCampaigns();
            initializePilotImprovements();
        }
    }

    // ═══════════════════════════════════════════════════════════
    // USERS — 12 seed users across all roles
    // ═══════════════════════════════════════════════════════════
    private List<User> initializeUsers() {
        User admin = userRepository.save(User.builder()
                .fullName("Dr. Rajesh Sharma (Admin)")
                .email("admin@campus.edu")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .enabled(true)
                .build());

        User admin2 = userRepository.save(User.builder()
                .fullName("Prof. Meena Gupta (Admin)")
                .email("meena.gupta@campus.edu")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .enabled(true)
                .build());

        User auditor1 = userRepository.save(User.builder()
                .fullName("Vaibhav Tiwari")
                .email("auditor@campus.edu")
                .password(passwordEncoder.encode("auditor123"))
                .role(Role.AUDITOR)
                .enabled(true)
                .build());

        User auditor2 = userRepository.save(User.builder()
                .fullName("Priya Singh (Auditor)")
                .email("priya.singh@campus.edu")
                .password(passwordEncoder.encode("auditor123"))
                .role(Role.AUDITOR)
                .enabled(true)
                .build());

        User auditor3 = userRepository.save(User.builder()
                .fullName("Amit Verma (Auditor)")
                .email("amit.verma@campus.edu")
                .password(passwordEncoder.encode("auditor123"))
                .role(Role.AUDITOR)
                .enabled(true)
                .build());

        User student1 = userRepository.save(User.builder()
                .fullName("John Smith (Student)")
                .email("student@campus.edu")
                .password(passwordEncoder.encode("student123"))
                .role(Role.STUDENT)
                .enabled(true)
                .build());

        User student2 = userRepository.save(User.builder()
                .fullName("Ananya Kapoor (Student)")
                .email("ananya.kapoor@campus.edu")
                .password(passwordEncoder.encode("student123"))
                .role(Role.STUDENT)
                .enabled(true)
                .build());

        User student3 = userRepository.save(User.builder()
                .fullName("Rahul Mehta (Student)")
                .email("rahul.mehta@campus.edu")
                .password(passwordEncoder.encode("student123"))
                .role(Role.STUDENT)
                .enabled(true)
                .build());

        User student4 = userRepository.save(User.builder()
                .fullName("Simran Kaur (Student)")
                .email("simran.kaur@campus.edu")
                .password(passwordEncoder.encode("student123"))
                .role(Role.STUDENT)
                .enabled(true)
                .build());

        User maint1 = userRepository.save(User.builder()
                .fullName("Bob Builder (Maintenance)")
                .email("maintenance@campus.edu")
                .password(passwordEncoder.encode("maintenance123"))
                .role(Role.MAINTENANCE)
                .enabled(true)
                .build());

        User maint2 = userRepository.save(User.builder()
                .fullName("Suresh Kumar (Maintenance)")
                .email("suresh.kumar@campus.edu")
                .password(passwordEncoder.encode("maintenance123"))
                .role(Role.MAINTENANCE)
                .enabled(true)
                .build());

        User maint3 = userRepository.save(User.builder()
                .fullName("Deepak Yadav (Maintenance)")
                .email("deepak.yadav@campus.edu")
                .password(passwordEncoder.encode("maintenance123"))
                .role(Role.MAINTENANCE)
                .enabled(true)
                .build());

        return List.of(admin, admin2, auditor1, auditor2, auditor3,
                student1, student2, student3, student4,
                maint1, maint2, maint3);
    }

    // ═══════════════════════════════════════════════════════════
    // BUILDINGS — 29 Real Chandigarh University Campus Buildings
    // ═══════════════════════════════════════════════════════════
    private List<Building> initializeBuildings() {
        String[][] buildingData = {
            {"Zakir A", "ZakirA", "Zakir Husain Block A - Academic & lecture halls", "South-West Campus, Zakir Zone", "5"},
            {"Zakir B", "ZakirB", "Zakir Husain Block B - Academic & lecture halls", "South-West Campus, Zakir Zone", "5"},
            {"Zakir C", "ZakirC", "Zakir Husain Block C - Academic & lecture halls", "South-West Campus, Zakir Zone", "5"},
            {"NC 1", "NC1", "Nek Chand Block 1 - Academic complex & labs", "North Campus, Academic Complex", "6"},
            {"NC 2", "NC2", "Nek Chand Block 2 - Academic complex & labs", "North Campus, Academic Complex", "6"},
            {"NC 3", "NC3", "Nek Chand Block 3 - Academic complex & labs", "North Campus, Academic Complex", "6"},
            {"NC 4", "NC4", "Nek Chand Block 4 - Academic complex & labs", "North Campus, Academic Complex", "6"},
            {"NC 5", "NC5", "Nek Chand Block 5 - Academic complex & labs", "North Campus, Academic Complex", "6"},
            {"D1", "D1", "D Block 1 - Central Academic Ring", "Central Academic Ring, Block D", "4"},
            {"D2", "D2", "D Block 2 - Central Academic Ring", "Central Academic Ring, Block D", "4"},
            {"D3", "D3", "D Block 3 - Central Academic Ring", "Central Academic Ring, Block D", "4"},
            {"D4", "D4", "D Block 4 - Central Academic Ring", "Central Academic Ring, Block D", "4"},
            {"D5", "D5", "D Block 5 - Central Academic Ring", "Central Academic Ring, Block D", "4"},
            {"D6", "D6", "D Block 6 - Central Academic Ring", "Central Academic Ring, Block D", "4"},
            {"D7", "D7", "D Block 7 - Central Academic Ring", "Central Academic Ring, Block D", "4"},
            {"D8", "D8", "D Block 8 - Central Academic Ring", "Central Academic Ring, Block D", "4"},
            {"DD1", "DD1", "DD Block 1 - East Campus Extension Wing", "East Campus, Extension Wing", "3"},
            {"DD2", "DD2", "DD Block 2 - East Campus Extension Wing", "East Campus, Extension Wing", "3"},
            {"C1", "C1", "C Block 1 - Central Academic Ring", "Central Academic Ring, Block C", "4"},
            {"C2", "C2", "C Block 2 - Central Academic Ring", "Central Academic Ring, Block C", "4"},
            {"C3", "C3", "C Block 3 - Central Academic Ring", "Central Academic Ring, Block C", "4"},
            {"B1", "B1", "B Block 1 - West Academic Ring", "West Academic Ring, Block B", "4"},
            {"B2", "B2", "B Block 2 - West Academic Ring", "West Academic Ring, Block B", "4"},
            {"B3", "B3", "B Block 3 - West Academic Ring", "West Academic Ring, Block B", "4"},
            {"B4", "B4", "B Block 4 - West Academic Ring", "West Academic Ring, Block B", "4"},
            {"B5", "B5", "B Block 5 - West Academic Ring", "West Academic Ring, Block B", "4"},
            {"A1", "A1", "A Block 1 - Main Administrative & Academic Wing", "Main Administrative & Academic Wing, Block A", "5"},
            {"A2", "A2", "A Block 2 - Main Administrative & Academic Wing", "Main Administrative & Academic Wing, Block A", "5"},
            {"A3", "A3", "A Block 3 - Main Administrative & Academic Wing", "Main Administrative & Academic Wing, Block A", "5"}
        };

        List<Building> buildings = new java.util.ArrayList<>();
        for (String[] data : buildingData) {
            buildings.add(buildingRepository.save(Building.builder()
                    .buildingName(data[0])
                    .buildingCode(data[1])
                    .description(data[2])
                    .location(data[3])
                    .numberOfFloors(Integer.parseInt(data[4]))
                    .status("ACTIVE")
                    .build()));
        }
        return buildings;
    }

    // ═══════════════════════════════════════════════════════════
    // AUDIT CATEGORIES & CHECKLIST — 5 categories, 18 questions
    // ═══════════════════════════════════════════════════════════
    private List<AuditChecklist> initializeChecklist() {
        // Category 1: Physical Infrastructure
        AuditCategory physicalCat = auditCategoryRepository.save(AuditCategory.builder()
                .categoryName("Physical Infrastructure")
                .build());

        AuditChecklist c1 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(physicalCat)
                .question("Is there a step-free entrance or ramp with a handrail to the building?")
                .maximumScore(10)
                .standardReference("RPWD Act 2016, Sec 40; WCAG 2.1 1.4")
                .build());
        AuditChecklist c2 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(physicalCat)
                .question("Are there accessible restrooms with grab bars on each floor?")
                .maximumScore(10)
                .standardReference("RPWD Act 2016, Sec 42")
                .build());
        AuditChecklist c3 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(physicalCat)
                .question("Is there a lift/elevator with braille buttons and audio announcement?")
                .maximumScore(10)
                .standardReference("RPWD Act 2016, Sec 41")
                .build());
        AuditChecklist c4 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(physicalCat)
                .question("Are there tactile paths leading to classrooms, offices, and library?")
                .maximumScore(10)
                .standardReference("RPWD Act 2016, Sec 40")
                .build());

        // Category 2: Digital Accessibility
        AuditCategory digitalCat = auditCategoryRepository.save(AuditCategory.builder()
                .categoryName("Digital Resources")
                .build());

        AuditChecklist c5 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(digitalCat)
                .question("Does the building's digital kiosks/touchscreens support keyboard and voice commands?")
                .maximumScore(10)
                .standardReference("WCAG 2.1 2.1 (Keyboard Accessible)")
                .build());
        AuditChecklist c6 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(digitalCat)
                .question("Does the local building LMS portal maintain WCAG AA contrast ratios?")
                .maximumScore(10)
                .standardReference("WCAG 2.1 1.4.3 (Contrast Minimum)")
                .build());
        AuditChecklist c7 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(digitalCat)
                .question("Are screen reader compatible computers available in all labs?")
                .maximumScore(10)
                .build());

        // Category 3: Signage & Wayfinding
        AuditCategory signageCat = auditCategoryRepository.save(AuditCategory.builder()
                .categoryName("Signage & Wayfinding")
                .build());

        AuditChecklist c8 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(signageCat)
                .question("Are all directional signs at an appropriate height and in high-contrast, large fonts?")
                .maximumScore(10)
                .build());
        AuditChecklist c9 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(signageCat)
                .question("Is there braille signage on all room doors and at corridor junctions?")
                .maximumScore(10)
                .build());
        AuditChecklist c10 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(signageCat)
                .question("Are emergency exits clearly marked with luminescent and tactile indicators?")
                .maximumScore(10)
                .build());

        // Category 4: Emergency Preparedness
        AuditCategory emergencyCat = auditCategoryRepository.save(AuditCategory.builder()
                .categoryName("Emergency Preparedness")
                .build());

        AuditChecklist c11 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(emergencyCat)
                .question("Is there an evacuation plan specifically addressing persons with disabilities?")
                .maximumScore(10)
                .build());
        AuditChecklist c12 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(emergencyCat)
                .question("Are fire alarms equipped with both visual strobes and audible alerts?")
                .maximumScore(10)
                .build());
        AuditChecklist c13 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(emergencyCat)
                .question("Are evacuation chairs or area-of-rescue assistance available on upper floors?")
                .maximumScore(10)
                .build());

        // Category 5: Inclusive Facilities
        AuditCategory inclusiveCat = auditCategoryRepository.save(AuditCategory.builder()
                .categoryName("Inclusive Facilities")
                .build());

        AuditChecklist c14 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(inclusiveCat)
                .question("Is there a sensory/quiet room available for neurodiverse students?")
                .maximumScore(10)
                .build());
        AuditChecklist c15 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(inclusiveCat)
                .question("Are drinking water stations at wheelchair-accessible height?")
                .maximumScore(10)
                .build());
        AuditChecklist c16 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(inclusiveCat)
                .question("Are there reserved seating areas in lecture halls for students with mobility impairments?")
                .maximumScore(10)
                .build());
        AuditChecklist c17 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(inclusiveCat)
                .question("Is an induction loop system installed in main auditoriums and seminar halls?")
                .maximumScore(10)
                .build());
        AuditChecklist c18 = auditChecklistRepository.save(AuditChecklist.builder()
                .category(inclusiveCat)
                .question("Are gender-neutral and accessible changing facilities available?")
                .maximumScore(10)
                .build());

        return List.of(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18);
    }

    // ═══════════════════════════════════════════════════════════
    // AUDITS — Comprehensive RPWD Act 2016 audits for all 29 buildings
    // ═══════════════════════════════════════════════════════════
    private void initializeAudits(List<User> users, List<Building> buildings, List<AuditChecklist> checklists) {
        User auditor = users.get(2); // Vaibhav Tiwari

        double[] scores = {
            57.2, 57.2, 57.2, // Zakir A, B, C
            63.3, 61.2, 63.3, 63.3, 63.3, // NC 1..5
            74.8, 74.8, 74.8, 74.8, 74.8, 74.8, 74.8, 74.8, // D1..D8
            41.6, 41.6, // DD1..DD2
            79.7, 79.7, 60.3, // C1..C3
            59.8, 59.8, 59.8, 59.8, 59.8, // B1..B5
            96.7, 96.7, 96.7  // A1..A3
        };

        LocalDate[] auditDates = {
            LocalDate.of(2026, 7, 6),  // Zakir A
            LocalDate.of(2026, 7, 9),  // Zakir B
            LocalDate.of(2026, 7, 14), // Zakir C
            LocalDate.of(2026, 7, 18), // NC 1
            LocalDate.of(2026, 7, 23), // NC 2
            LocalDate.of(2026, 7, 28), // NC 3
            LocalDate.of(2026, 8, 2),  // NC 4
            LocalDate.of(2026, 8, 6),  // NC 5
            LocalDate.of(2026, 8, 10), // D1
            LocalDate.of(2026, 8, 12), // D2
            LocalDate.of(2026, 8, 14), // D3
            LocalDate.of(2026, 8, 17), // D4
            LocalDate.of(2026, 8, 19), // D5
            LocalDate.of(2026, 8, 21), // D6
            LocalDate.of(2026, 8, 24), // D7
            LocalDate.of(2026, 8, 26), // D8
            LocalDate.of(2026, 8, 28), // DD1
            LocalDate.of(2026, 8, 31), // DD2
            LocalDate.of(2026, 9, 3),  // C1
            LocalDate.of(2026, 9, 7),  // C2
            LocalDate.of(2026, 9, 10), // C3
            LocalDate.of(2026, 9, 12), // B1
            LocalDate.of(2026, 9, 15), // B2
            LocalDate.of(2026, 9, 17), // B3
            LocalDate.of(2026, 9, 19), // B4
            LocalDate.of(2026, 9, 21), // B5
            LocalDate.of(2026, 9, 22), // A1
            LocalDate.of(2026, 9, 24), // A2
            LocalDate.of(2026, 9, 26)  // A3
        };

        for (int i = 0; i < buildings.size(); i++) {
            Building b = buildings.get(i);
            double score = i < scores.length ? scores[i] : 68.0;
            LocalDate auditDate = i < auditDates.length ? auditDates[i] : LocalDate.of(2026, 8, 15);
            String status = score >= 50.0 ? "APPROVED" : "PENDING";
            String remarks = String.format("RPWD Act 2016 compliance audit for %s (%s). Evaluated compliance: %.1f%%.",
                    b.getBuildingName(), b.getLocation(), score);

            Audit audit = auditRepository.save(Audit.builder()
                    .building(b)
                    .auditor(auditor)
                    .auditDate(auditDate)
                    .status(status)
                    .overallAccessibilityScore(score)
                    .remarks(remarks)
                    .build());

            int base = (int) Math.round(score / 10.0);
            int[] checklistScores = new int[checklists.size()];
            for (int k = 0; k < checklists.size(); k++) {
                checklistScores[k] = Math.min(10, Math.max(1, base + ((k % 3) - 1)));
            }
            createResponses(audit, checklists, checklistScores);
        }
    }

    /** Helper to create AuditResponse entries for every checklist item in an audit. */
    private void createResponses(Audit audit, List<AuditChecklist> checklists, int[] scores) {
        String[] comments = {
                "Ramp condition checked", "Restroom grab bars inspected", "Elevator assessed",
                "Tactile paths checked", "Kiosk accessibility tested", "LMS contrast checked",
                "Screen readers tested", "Sign height measured", "Braille signs checked",
                "Emergency exit signs inspected", "Evacuation plan reviewed", "Fire alarm tested",
                "Evacuation chair availability checked", "Sensory room checked", "Water station height measured",
                "Reserved seating verified", "Induction loop tested", "Changing room inspected"
        };
        for (int i = 0; i < checklists.size() && i < scores.length; i++) {
            AuditResponse response = AuditResponse.builder()
                    .audit(audit)
                    .checklist(checklists.get(i))
                    .score(scores[i])
                    .comments(comments[i])
                    .build();
            audit.getResponses().add(response);
        }
        auditRepository.save(audit);
    }

    // ═══════════════════════════════════════════════════════════
    // STUDENT REPORTS — 12 accessibility issue reports
    // ═══════════════════════════════════════════════════════════
    private void initializeStudentReports(List<User> users, List<Building> buildings) {
        // Students: index 5=student1, 6=student2, 7=student3, 8=student4
        User s1 = users.get(5);
        User s2 = users.get(6);
        User s3 = users.get(7);
        User s4 = users.get(8);

        studentReportRepository.save(StudentReport.builder()
                .description("The ramp near Gate 2 entrance of Engineering Block A has a steep gradient that makes it dangerous for wheelchair users, especially during rain when it gets slippery.")
                .locationDetails("Ground floor, Gate 2 entrance")
                .building(buildings.get(3))
                .reporter(s1)
                .status("SUBMITTED")
                .build());

        studentReportRepository.save(StudentReport.builder()
                .description("The elevator in Central Library is frequently out of order. It has been non-functional for the past 2 weeks, forcing wheelchair users to skip the 3rd-floor reference section.")
                .locationDetails("Central Library, main elevator shaft")
                .building(buildings.get(1))
                .reporter(s2)
                .status("IN_PROGRESS")
                .adminNotes("Elevator repair contractor contacted. ETA 5 business days.")
                .build());

        studentReportRepository.save(StudentReport.builder()
                .description("No braille signage on any of the room doors in Engineering Block B. Visually impaired students cannot find their classrooms independently.")
                .locationDetails("All floors, Engineering Block B")
                .building(buildings.get(4))
                .reporter(s3)
                .status("SUBMITTED")
                .build());

        studentReportRepository.save(StudentReport.builder()
                .description("The drinking water cooler near the canteen is too high for wheelchair users. Need a lower tap option.")
                .locationDetails("Ground floor, near Central Cafeteria entrance")
                .building(buildings.get(9))
                .reporter(s4)
                .status("RESOLVED")
                .adminNotes("Lower tap installed on 2026-03-20. Verified by maintenance team.")
                .build());

        studentReportRepository.save(StudentReport.builder()
                .description("Fire alarm in Girls Hostel H3 only has an audible siren. Hearing-impaired students on the 4th floor cannot be alerted during emergencies.")
                .locationDetails("4th floor common area, Girls Hostel H3")
                .building(buildings.get(8))
                .reporter(s2)
                .status("IN_PROGRESS")
                .adminNotes("Visual strobe alarms ordered. Installation scheduled for next week.")
                .build());

        studentReportRepository.save(StudentReport.builder()
                .description("The main door of the Management Block is extremely heavy and does not have an automatic opener. Students using crutches struggle to open it.")
                .locationDetails("Main entrance, Management Block")
                .building(buildings.get(5))
                .reporter(s1)
                .status("SUBMITTED")
                .build());

        studentReportRepository.save(StudentReport.builder()
                .description("Computer Lab 3 in Engineering Block A has fixed-height desks only. No adjustable workstations for wheelchair users.")
                .locationDetails("3rd floor, Lab 303, Engineering Block A")
                .building(buildings.get(3))
                .reporter(s3)
                .status("SUBMITTED")
                .build());

        studentReportRepository.save(StudentReport.builder()
                .description("The sports complex swimming pool area has no wheelchair ramp for entry. The changing rooms also lack accessible facilities.")
                .locationDetails("Ground floor, swimming pool entrance")
                .building(buildings.get(10))
                .reporter(s4)
                .status("IN_PROGRESS")
                .adminNotes("Part of the ongoing renovation project. Expected completion by Aug 2026.")
                .build());

        studentReportRepository.save(StudentReport.builder()
                .description("Tactile floor markers in Main Academic Block lobby are worn out and barely detectable. Visually impaired students have reported tripping hazards.")
                .locationDetails("Ground floor lobby, Main Academic Block")
                .building(buildings.get(0))
                .reporter(s2)
                .status("RESOLVED")
                .adminNotes("Tactile markers replaced with new stainless-steel indicators on 2026-05-10.")
                .build());

        studentReportRepository.save(StudentReport.builder()
                .description("The parking lot near the Research Centre has no designated accessible parking spots. Wheelchair users have to travel a long distance from regular spots.")
                .locationDetails("Outdoor parking lot, Research & Innovation Centre")
                .building(buildings.get(11))
                .reporter(s1)
                .status("SUBMITTED")
                .build());

        studentReportRepository.save(StudentReport.builder()
                .description("Boys Hostel H1 has no elevator at all. Students with temporary injuries (fractured legs, etc.) cannot access upper floors.")
                .locationDetails("Entire building, Boys Hostel H1")
                .building(buildings.get(7))
                .reporter(s3)
                .status("SUBMITTED")
                .build());

        studentReportRepository.save(StudentReport.builder()
                .description("The auditorium in the Student Activity Centre has all fixed seating with no wheelchair-accessible viewing positions. Events are inaccessible.")
                .locationDetails("Auditorium, 1st floor, Student Activity Centre")
                .building(buildings.get(2))
                .reporter(s4)
                .status("IN_PROGRESS")
                .adminNotes("Architectural review underway. 10 accessible seats being planned for front rows.")
                .build());
    }

    // ═══════════════════════════════════════════════════════════
    // MAINTENANCE TASKS — 10 tasks linked to audits and reports
    // ═══════════════════════════════════════════════════════════
    private void initializeMaintenanceTasks(List<User> users, List<Building> buildings) {
        // Maintenance users: index 9=maint1, 10=maint2, 11=maint3
        User m1 = users.get(9);
        User m2 = users.get(10);
        User m3 = users.get(11);

        maintenanceTaskRepository.save(MaintenanceTask.builder()
                .title("Install braille buttons in MAB elevator")
                .description("Replace existing lift buttons with braille-embossed buttons and add audio floor announcement system in the Main Academic Block elevator.")
                .building(buildings.get(0))
                .assignee(m1)
                .status("OPEN")
                .severity("HIGH")
                .priority("HIGH")
                .dueDate(LocalDate.of(2026, 8, 1))
                .estimatedCost(450.0)
                .build());

        maintenanceTaskRepository.save(MaintenanceTask.builder()
                .title("Repair Central Library elevator")
                .description("Fix the non-functional elevator in Central Library. Motor replacement and safety inspection required.")
                .building(buildings.get(1))
                .assignee(m2)
                .status("IN_PROGRESS")
                .severity("CRITICAL")
                .priority("HIGH")
                .dueDate(LocalDate.of(2026, 7, 25))
                .estimatedCost(12000.0)
                .build());

        maintenanceTaskRepository.save(MaintenanceTask.builder()
                .title("Install braille signage in Engg Block B")
                .description("Install braille room number plates on all classroom and lab doors across all 5 floors of Engineering Block B.")
                .building(buildings.get(4))
                .assignee(m3)
                .status("OPEN")
                .severity("MEDIUM")
                .priority("MEDIUM")
                .dueDate(LocalDate.of(2026, 9, 1))
                .estimatedCost(320.0)
                .build());

        maintenanceTaskRepository.save(MaintenanceTask.builder()
                .title("Install automatic door opener at MBA Block")
                .description("Fit automatic push-button door opener on the main entrance of the Management Block to assist students with mobility impairments.")
                .building(buildings.get(5))
                .assignee(m1)
                .status("OPEN")
                .severity("MEDIUM")
                .priority("MEDIUM")
                .dueDate(LocalDate.of(2026, 8, 15))
                .estimatedCost(1800.0)
                .build());

        maintenanceTaskRepository.save(MaintenanceTask.builder()
                .title("Install visual fire alarms in Girls Hostel H3")
                .description("Install visual strobe fire alarm indicators on all floors of Girls Hostel H3 alongside existing audible alarms.")
                .building(buildings.get(8))
                .assignee(m2)
                .status("IN_PROGRESS")
                .severity("HIGH")
                .priority("HIGH")
                .dueDate(LocalDate.of(2026, 7, 30))
                .estimatedCost(4500.0)
                .build());

        maintenanceTaskRepository.save(MaintenanceTask.builder()
                .title("Build wheelchair ramp for Sports Complex pool")
                .description("Construct a gentle-gradient wheelchair ramp from the main entrance of Sports Complex to the swimming pool area.")
                .building(buildings.get(10))
                .assignee(m3)
                .status("IN_PROGRESS")
                .severity("HIGH")
                .priority("HIGH")
                .dueDate(LocalDate.of(2026, 8, 30))
                .estimatedCost(8500.0)
                .build());

        maintenanceTaskRepository.save(MaintenanceTask.builder()
                .title("Add accessible parking spots at Research Centre")
                .description("Mark and construct 4 designated accessible parking spots near the main entrance of the Research & Innovation Centre.")
                .building(buildings.get(11))
                .assignee(m1)
                .status("OPEN")
                .severity("MEDIUM")
                .priority("MEDIUM")
                .dueDate(LocalDate.of(2026, 8, 10))
                .estimatedCost(1200.0)
                .build());

        maintenanceTaskRepository.save(MaintenanceTask.builder()
                .title("Install adjustable desks in Engg Block A Lab 303")
                .description("Replace 5 fixed-height workstations with height-adjustable desks in Computer Lab 303, Engineering Block A.")
                .building(buildings.get(3))
                .assignee(m2)
                .status("OPEN")
                .severity("MEDIUM")
                .priority("MEDIUM")
                .dueDate(LocalDate.of(2026, 9, 15))
                .estimatedCost(2500.0)
                .build());

        maintenanceTaskRepository.save(MaintenanceTask.builder()
                .title("Repaint tactile floor markers in MAB lobby")
                .description("Completed: Replaced worn tactile markers in Main Academic Block lobby with stainless-steel raised-dot indicators.")
                .building(buildings.get(0))
                .assignee(m3)
                .status("COMPLETED")
                .severity("MEDIUM")
                .priority("MEDIUM")
                .dueDate(LocalDate.of(2026, 5, 10))
                .estimatedCost(450.0)
                .completionNotes("Installed 24 stainless-steel tactile indicators covering the full lobby path. Verified by accessibility team.")
                .build());

        maintenanceTaskRepository.save(MaintenanceTask.builder()
                .title("Lower water cooler at Cafeteria")
                .description("Completed: Installed an additional lower-height tap on the water cooler near Central Cafeteria entrance for wheelchair users.")
                .building(buildings.get(9))
                .assignee(m1)
                .status("COMPLETED")
                .severity("LOW")
                .priority("LOW")
                .dueDate(LocalDate.of(2026, 3, 20))
                .estimatedCost(150.0)
                .completionNotes("Dual-height water cooler installed. Both taps functional and tested.")
                .build());
        // Generate 40 additional tasks to reach exactly 50 total remediation items
        String[] titles = {
            "Install grab bars in restrooms", "Widen doorway access", "Fix uneven pavement", "Add braille signage to rooms", "Install anti-slip floor mats",
            "Adjust desk heights in labs", "Install automatic door openers", "Repair elevator audio system", "Add visual alarm strobes", "Relocate light switches",
            "Install handrails on ramps", "Provide adjustable podiums", "Fix contrast on digital displays", "Add tactile warning strips", "Replace heavy doors",
            "Install accessible water coolers", "Lower fire alarm pulls", "Clear obstruction from hallways", "Provide accessible parking signs", "Fix ramp gradient",
            "Install stair nosing", "Add wheelchair seating in auditorium", "Provide portable ramps", "Install sensory friendly lighting", "Fix cracked sidewalk",
            "Add audio description headsets", "Provide sign language interpreter screen", "Lower lab sink height", "Install accessible toilet seats", "Add emergency call buttons",
            "Repair curb cuts", "Add braille library directories", "Provide large print materials", "Install screen reader software", "Add captioning to video displays",
            "Repair accessible shower stall", "Widen cafeteria aisles", "Install lower service counter", "Provide accessible gym equipment", "Fix uneven threshold"
        };
        String[] statuses = {"OPEN", "IN_PROGRESS", "OPEN", "OPEN", "OPEN"};
        String[] priorities = {"HIGH", "MEDIUM", "LOW", "MEDIUM", "HIGH"};
        
        for (int i = 0; i < 40; i++) {
            maintenanceTaskRepository.save(MaintenanceTask.builder()
                    .title(titles[i] + " - Area " + (i + 1))
                    .description("Accessibility remediation: " + titles[i] + " required to meet RPWD Act 2016 standards.")
                    .building(buildings.get(i % buildings.size()))
                    .assignee(i % 3 == 0 ? m1 : (i % 3 == 1 ? m2 : m3))
                    .status(statuses[i % statuses.length])
                    .severity(priorities[i % priorities.length])
                    .priority(priorities[i % priorities.length])
                    .dueDate(LocalDate.of(2026, 9 + (i % 4), (i % 28) + 1))
                    .estimatedCost(200.0 + (i * 50))
                    .build());
        }
    }

    // ═══════════════════════════════════════════════════════════
    // FEEDBACK SESSIONS — Participatory sessions with students
    // ═══════════════════════════════════════════════════════════
    private void initializeFeedbackSessions() {
        feedbackSessionRepository.save(FeedbackSession.builder()
                .title("Campus Accessibility Feedback Workshop")
                .sessionDate(LocalDate.of(2026, 4, 15))
                .participantsCount(25)
                .feedbackSummary("Students highlighted the need for more tactile paths in the library and better digital accessibility for the LMS.")
                .build());

        feedbackSessionRepository.save(FeedbackSession.builder()
                .title("Hostel Infrastructure Review with Students")
                .sessionDate(LocalDate.of(2026, 5, 20))
                .participantsCount(18)
                .feedbackSummary("Major concerns raised regarding the lack of elevator in Boys Hostel H1 and need for visual alarms in Girls Hostel H3.")
                .build());
    }

    // ═══════════════════════════════════════════════════════════
    // AWARENESS CAMPAIGNS — Campus wide awareness
    // ═══════════════════════════════════════════════════════════
    private void initializeAwarenessCampaigns() {
        awarenessCampaignRepository.save(AwarenessCampaign.builder()
                .campaignName("Disability Awareness Week 2026")
                .campaignDate(LocalDate.of(2026, 2, 10))
                .reachCount(450)
                .description("A week-long campaign across the campus to promote inclusive culture, ending with a student pledge.")
                .build());
    }

    // ============================================================
    // PILOT IMPROVEMENTS — Low-cost accessibility improvement proposals
    // ============================================================
    private void initializePilotImprovements() {
        pilotImprovementRepository.save(PilotImprovement.builder()
                .title("Tactile Floor Strips in Library Main Aisle")
                .description("Install bright yellow tactile floor strips along the main aisle of the Central Library to assist visually impaired students in navigating between sections independently.")
                .location("Central Library, Ground Floor")
                .estimatedCost(new java.math.BigDecimal("2500.00"))
                .impactLevel("HIGH")
                .category("SIGNAGE")
                .status("APPROVED")
                .proposerName("Arjun Sharma")
                .proposerEmail("student1@cu.edu.in")
                .adminNotes("Approved by facilities management. Installation scheduled for Week 5.")
                .build());

        pilotImprovementRepository.save(PilotImprovement.builder()
                .title("Accessible Parking Bay near Main Auditorium")
                .description("Designate and mark two parking bays nearest to the Main Auditorium entrance exclusively for people with mobility impairments, with appropriate signage and ramp access.")
                .location("Main Auditorium Parking, Block A")
                .estimatedCost(new java.math.BigDecimal("800.00"))
                .impactLevel("HIGH")
                .category("RAMP")
                .status("IN_PROGRESS")
                .proposerName("Priya Nair")
                .proposerEmail("student2@cu.edu.in")
                .adminNotes("Work order raised. Paint and signage procurement under way.")
                .build());

        pilotImprovementRepository.save(PilotImprovement.builder()
                .title("Braille Signage on Lab Doors")
                .description("Add Braille labels to all laboratory doors in Block A and Block B so visually impaired students can identify rooms independently without assistance.")
                .location("Block A & Block B Labs")
                .estimatedCost(new java.math.BigDecimal("1200.00"))
                .impactLevel("MEDIUM")
                .category("SIGNAGE")
                .status("PROPOSED")
                .proposerName("Rahul Verma")
                .proposerEmail("student3@cu.edu.in")
                .adminNotes(null)
                .build());

        pilotImprovementRepository.save(PilotImprovement.builder()
                .title("Adjustable-Height Study Desks in LT-1")
                .description("Install 5 height-adjustable desks in Lecture Theatre 1 to accommodate wheelchair users and students with varying height requirements for comfortable learning.")
                .location("Lecture Theatre 1 (LT-1)")
                .estimatedCost(new java.math.BigDecimal("15000.00"))
                .impactLevel("HIGH")
                .category("OTHER")
                .status("PROPOSED")
                .proposerName("Meera Iyer")
                .proposerEmail("student1@cu.edu.in")
                .adminNotes(null)
                .build());

        pilotImprovementRepository.save(PilotImprovement.builder()
                .title("Visual Fire Alarm Strobes in Washrooms")
                .description("Install visual strobe light fire alarms inside all accessible washrooms so hearing-impaired students are immediately alerted during emergencies.")
                .location("All Campus Washrooms")
                .estimatedCost(new java.math.BigDecimal("6000.00"))
                .impactLevel("HIGH")
                .category("WASHROOM")
                .status("APPROVED")
                .proposerName("Kiran Das")
                .proposerEmail("student2@cu.edu.in")
                .adminNotes("Critical safety improvement. Cleared by safety committee. Procurement started.")
                .build());

        pilotImprovementRepository.save(PilotImprovement.builder()
                .title("LMS Screen Reader Compatibility Audit")
                .description("Conduct a thorough WCAG 2.1 AA audit of the university LMS to identify and fix elements incompatible with screen readers (NVDA/JAWS), benefiting visually impaired students.")
                .location("Digital - University LMS")
                .estimatedCost(new java.math.BigDecimal("0.00"))
                .impactLevel("HIGH")
                .category("DIGITAL")
                .status("COMPLETED")
                .proposerName("Ananya Singh")
                .proposerEmail("student3@cu.edu.in")
                .adminNotes("Completed by the IT team. 12 WCAG AA violations fixed. Report attached.")
                .build());

        pilotImprovementRepository.save(PilotImprovement.builder()
                .title("Improved Lighting at Admin Block Ramp")
                .description("The ramp leading to the Admin Block is poorly lit at night, creating a hazard for wheelchair users and students with low vision. Install motion-sensor LED lighting along the ramp handrail.")
                .location("Admin Block, Main Entrance Ramp")
                .estimatedCost(new java.math.BigDecimal("3500.00"))
                .impactLevel("MEDIUM")
                .category("LIGHTING")
                .status("PROPOSED")
                .proposerName("Rohan Mehta")
                .proposerEmail("student1@cu.edu.in")
                .adminNotes(null)
                .build());
    }
}

