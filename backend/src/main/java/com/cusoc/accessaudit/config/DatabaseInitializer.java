package com.cusoc.accessaudit.config;

import com.cusoc.accessaudit.entity.*;
import com.cusoc.accessaudit.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BuildingRepository buildingRepository;
    private final AuditCategoryRepository auditCategoryRepository;
    private final AuditChecklistRepository auditChecklistRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeUsers();
        initializeBuildings();
        initializeChecklist();
    }

    private void initializeUsers() {
        if (userRepository.count() == 0) {
            // Admin
            userRepository.save(User.builder()
                    .fullName("System Administrator")
                    .email("admin@campus.edu")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .enabled(true)
                    .build());

            // Auditor
            userRepository.save(User.builder()
                    .fullName("Jane Doe (Auditor)")
                    .email("auditor@campus.edu")
                    .password(passwordEncoder.encode("auditor123"))
                    .role(Role.AUDITOR)
                    .enabled(true)
                    .build());

            // Student
            userRepository.save(User.builder()
                    .fullName("John Smith (Student)")
                    .email("student@campus.edu")
                    .password(passwordEncoder.encode("student123"))
                    .role(Role.STUDENT)
                    .enabled(true)
                    .build());

            // Maintenance
            userRepository.save(User.builder()
                    .fullName("Bob Builder (Maintenance)")
                    .email("maintenance@campus.edu")
                    .password(passwordEncoder.encode("maintenance123"))
                    .role(Role.MAINTENANCE)
                    .enabled(true)
                    .build());
        }
    }

    private void initializeBuildings() {
        if (buildingRepository.count() == 0) {
            buildingRepository.save(Building.builder()
                    .buildingName("Main Academic Block")
                    .buildingCode("MAB01")
                    .description("Primary academic building housing lecture halls and classrooms")
                    .location("Central Campus")
                    .numberOfFloors(4)
                    .status("ACTIVE")
                    .build());

            buildingRepository.save(Building.builder()
                    .buildingName("Central Library")
                    .buildingCode("LIB02")
                    .description("Multi-story central university library")
                    .location("North Campus")
                    .numberOfFloors(3)
                    .status("ACTIVE")
                    .build());

            buildingRepository.save(Building.builder()
                    .buildingName("Student Activity Centre")
                    .buildingCode("SAC03")
                    .description("Recreational centre for student activities, clubs and indoor sports")
                    .location("South Campus")
                    .numberOfFloors(2)
                    .status("ACTIVE")
                    .build());
        }
    }

    private void initializeChecklist() {
        if (auditCategoryRepository.count() == 0) {
            // Categories
            AuditCategory physicalCat = auditCategoryRepository.save(AuditCategory.builder()
                    .categoryName("Physical Infrastructure")
                    .build());

            AuditCategory digitalCat = auditCategoryRepository.save(AuditCategory.builder()
                    .categoryName("Digital Resources")
                    .build());

            // Physical checklist items
            auditChecklistRepository.save(AuditChecklist.builder()
                    .category(physicalCat)
                    .question("Is there a step-free entrance or ramp with a handrail to the building?")
                    .maximumScore(10)
                    .build());

            auditChecklistRepository.save(AuditChecklist.builder()
                    .category(physicalCat)
                    .question("Are there accessible restrooms with grab bars on each floor?")
                    .maximumScore(10)
                    .build());

            auditChecklistRepository.save(AuditChecklist.builder()
                    .category(physicalCat)
                    .question("Is there a lift/elevator with braille buttons and audio announcement?")
                    .maximumScore(10)
                    .build());

            auditChecklistRepository.save(AuditChecklist.builder()
                    .category(physicalCat)
                    .question("Are there tactile paths leading to classrooms, offices, and library?")
                    .maximumScore(10)
                    .build());

            // Digital checklist items
            auditChecklistRepository.save(AuditChecklist.builder()
                    .category(digitalCat)
                    .question("Does the building's digital touchscreens/kiosks support keyboard and voice commands?")
                    .maximumScore(10)
                    .build());

            auditChecklistRepository.save(AuditChecklist.builder()
                    .category(digitalCat)
                    .question("Does the local building LMS portal maintain AA contrast ratios?")
                    .maximumScore(10)
                    .build());
        }
    }
}
