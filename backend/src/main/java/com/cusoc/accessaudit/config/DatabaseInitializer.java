package com.cusoc.accessaudit.config;

import com.cusoc.accessaudit.entity.*;
import com.cusoc.accessaudit.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
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
                .fullName("Jane Doe (Auditor)")
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
    // BUILDINGS — 12 CU-themed campus buildings
    // ═══════════════════════════════════════════════════════════
    private List<Building> initializeBuildings() {
        Building b1 = buildingRepository.save(Building.builder()
                .buildingName("Main Academic Block")
                .buildingCode("MAB01")
                .description("Primary academic building housing lecture halls, seminar rooms, and faculty offices")
                .location("Central Campus")
                .numberOfFloors(4)
                .status("ACTIVE")
                .build());

        Building b2 = buildingRepository.save(Building.builder()
                .buildingName("Central Library")
                .buildingCode("LIB02")
                .description("Multi-story central university library with reading halls, digital resource centre, and group study rooms")
                .location("North Campus")
                .numberOfFloors(3)
                .status("ACTIVE")
                .build());

        Building b3 = buildingRepository.save(Building.builder()
                .buildingName("Student Activity Centre")
                .buildingCode("SAC03")
                .description("Recreational centre for student activities, clubs, indoor sports, and cultural events")
                .location("South Campus")
                .numberOfFloors(2)
                .status("ACTIVE")
                .build());

        Building b4 = buildingRepository.save(Building.builder()
                .buildingName("Engineering Block - A")
                .buildingCode("ENG04")
                .description("Houses CSE, IT, and ECE departments with computer labs and project rooms")
                .location("West Campus, Block A")
                .numberOfFloors(5)
                .status("ACTIVE")
                .build());

        Building b5 = buildingRepository.save(Building.builder()
                .buildingName("Engineering Block - B")
                .buildingCode("ENG05")
                .description("Houses Mechanical, Civil, and EEE departments with workshops and design studios")
                .location("West Campus, Block B")
                .numberOfFloors(5)
                .status("ACTIVE")
                .build());

        Building b6 = buildingRepository.save(Building.builder()
                .buildingName("Management Block")
                .buildingCode("MBA06")
                .description("School of Business with case study rooms, Bloomberg terminal lab, and conference halls")
                .location("East Campus")
                .numberOfFloors(3)
                .status("ACTIVE")
                .build());

        Building b7 = buildingRepository.save(Building.builder()
                .buildingName("University Health Centre")
                .buildingCode("UHC07")
                .description("Campus medical facility with consultation rooms, pharmacy, and emergency care")
                .location("Central Campus, Near Gate 1")
                .numberOfFloors(2)
                .status("ACTIVE")
                .build());

        Building b8 = buildingRepository.save(Building.builder()
                .buildingName("Boys Hostel Block - H1")
                .buildingCode("BH108")
                .description("Residential hostel for male students with common rooms and laundry facilities")
                .location("Hostel Zone, East")
                .numberOfFloors(6)
                .status("ACTIVE")
                .build());

        Building b9 = buildingRepository.save(Building.builder()
                .buildingName("Girls Hostel Block - H3")
                .buildingCode("GH309")
                .description("Residential hostel for female students with study lounges and recreation area")
                .location("Hostel Zone, West")
                .numberOfFloors(6)
                .status("ACTIVE")
                .build());

        Building b10 = buildingRepository.save(Building.builder()
                .buildingName("Central Cafeteria")
                .buildingCode("CAF10")
                .description("Main campus dining hall serving North Indian, South Indian, and continental cuisine")
                .location("Central Campus, Food Court Area")
                .numberOfFloors(1)
                .status("ACTIVE")
                .build());

        Building b11 = buildingRepository.save(Building.builder()
                .buildingName("Sports Complex")
                .buildingCode("SPT11")
                .description("Olympic-size swimming pool, indoor badminton and basketball courts, gym, and athletics track")
                .location("South Campus, Sports Zone")
                .numberOfFloors(2)
                .status("UNDER_MAINTENANCE")
                .build());

        Building b12 = buildingRepository.save(Building.builder()
                .buildingName("Research & Innovation Centre")
                .buildingCode("RIC12")
                .description("State-of-the-art research labs, incubation centre, and patent office")
                .location("North Campus, Innovation Park")
                .numberOfFloors(4)
                .status("ACTIVE")
                .build());

        return List.of(b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12);
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
    // AUDITS — 8 audits with responses across different buildings
    // ═══════════════════════════════════════════════════════════
    private void initializeAudits(List<User> users, List<Building> buildings, List<AuditChecklist> checklists) {
        // Users: index 2=auditor1, 3=auditor2, 4=auditor3
        User auditor1 = users.get(2);
        User auditor2 = users.get(3);
        User auditor3 = users.get(4);

        // Audit 1 — Main Academic Block (APPROVED, high score)
        Audit a1 = auditRepository.save(Audit.builder()
                .building(buildings.get(0))
                .auditor(auditor1)
                .auditDate(LocalDate.of(2026, 3, 15))
                .status("APPROVED")
                .overallAccessibilityScore(82.5)
                .remarks("Good overall accessibility. Ramps installed recently. Lift buttons need braille upgrade.")
                .build());
        createResponses(a1, checklists, new int[]{9, 8, 6, 7, 8, 9, 7, 8, 6, 9, 7, 8, 6, 7, 9, 8, 7, 8});

        // Audit 2 — Central Library (APPROVED, medium score)
        Audit a2 = auditRepository.save(Audit.builder()
                .building(buildings.get(1))
                .auditor(auditor2)
                .auditDate(LocalDate.of(2026, 4, 2))
                .status("APPROVED")
                .overallAccessibilityScore(68.3)
                .remarks("Library has good digital resources but physical accessibility needs improvement. No tactile paths.")
                .build());
        createResponses(a2, checklists, new int[]{7, 6, 5, 3, 9, 8, 8, 7, 4, 6, 5, 7, 4, 6, 7, 5, 6, 7});

        // Audit 3 — Engineering Block A (IN_PROGRESS)
        Audit a3 = auditRepository.save(Audit.builder()
                .building(buildings.get(3))
                .auditor(auditor1)
                .auditDate(LocalDate.of(2026, 6, 10))
                .status("IN_PROGRESS")
                .overallAccessibilityScore(45.0)
                .remarks("Audit in progress. Multiple labs on upper floors lack elevator access.")
                .build());
        createResponses(a3, checklists, new int[]{5, 4, 3, 2, 6, 5, 4, 5, 3, 4, 3, 5, 2, 4, 5, 3, 4, 5});

        // Audit 4 — Student Activity Centre (APPROVED, good score)
        Audit a4 = auditRepository.save(Audit.builder()
                .building(buildings.get(2))
                .auditor(auditor3)
                .auditDate(LocalDate.of(2026, 2, 20))
                .status("APPROVED")
                .overallAccessibilityScore(75.0)
                .remarks("Generally accessible. Indoor sports area needs wheelchair-friendly modifications.")
                .build());
        createResponses(a4, checklists, new int[]{8, 7, 8, 6, 7, 7, 6, 8, 5, 7, 7, 8, 5, 7, 8, 7, 6, 7});

        // Audit 5 — University Health Centre (APPROVED, excellent score)
        Audit a5 = auditRepository.save(Audit.builder()
                .building(buildings.get(6))
                .auditor(auditor2)
                .auditDate(LocalDate.of(2026, 1, 10))
                .status("APPROVED")
                .overallAccessibilityScore(91.0)
                .remarks("Health Centre is the most accessible building on campus. Exemplary standards.")
                .build());
        createResponses(a5, checklists, new int[]{10, 9, 9, 8, 9, 9, 8, 10, 9, 9, 8, 9, 8, 9, 10, 9, 8, 9});

        // Audit 6 — Boys Hostel H1 (PENDING, low score)
        Audit a6 = auditRepository.save(Audit.builder()
                .building(buildings.get(7))
                .auditor(auditor3)
                .auditDate(LocalDate.of(2026, 5, 5))
                .status("PENDING")
                .overallAccessibilityScore(35.0)
                .remarks("Major accessibility gaps. No ramps, no elevator, communal bathrooms not accessible.")
                .build());
        createResponses(a6, checklists, new int[]{3, 2, 1, 2, 4, 3, 3, 4, 2, 3, 2, 4, 1, 3, 4, 3, 2, 3});

        // Audit 7 — Central Cafeteria (APPROVED)
        Audit a7 = auditRepository.save(Audit.builder()
                .building(buildings.get(9))
                .auditor(auditor1)
                .auditDate(LocalDate.of(2026, 4, 18))
                .status("APPROVED")
                .overallAccessibilityScore(72.0)
                .remarks("Single floor — no elevator issues. Food counters need height adjustment for wheelchair users.")
                .build());
        createResponses(a7, checklists, new int[]{8, 7, 10, 6, 5, 6, 5, 8, 6, 7, 6, 7, 7, 6, 8, 7, 6, 7});

        // Audit 8 — Research & Innovation Centre (IN_PROGRESS)
        Audit a8 = auditRepository.save(Audit.builder()
                .building(buildings.get(11))
                .auditor(auditor2)
                .auditDate(LocalDate.of(2026, 7, 1))
                .status("IN_PROGRESS")
                .overallAccessibilityScore(55.0)
                .remarks("New building — mostly compliant but some lab workbenches are not height-adjustable.")
                .build());
        createResponses(a8, checklists, new int[]{6, 5, 7, 5, 6, 5, 4, 6, 4, 5, 5, 6, 4, 5, 6, 5, 5, 6});
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

