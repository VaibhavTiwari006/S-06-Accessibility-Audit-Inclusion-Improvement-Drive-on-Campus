package com.cusoc.accessaudit.config;

import com.cusoc.accessaudit.entity.Building;
import com.cusoc.accessaudit.entity.Role;
import com.cusoc.accessaudit.entity.User;
import com.cusoc.accessaudit.repository.BuildingRepository;
import com.cusoc.accessaudit.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;

@Component
@Profile("!test")
public class DatabaseSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseSeeder.class);

    private final UserRepository userRepository;
    private final BuildingRepository buildingRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository, BuildingRepository buildingRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.buildingRepository = buildingRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedBuildings();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            logger.info("Seeding users...");
            
            User admin = new User();
            admin.setFullName("Admin User");
            admin.setEmail("admin@campus.edu");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setEnabled(true);

            User auditor = new User();
            auditor.setFullName("Campus Auditor");
            auditor.setEmail("auditor@campus.edu");
            auditor.setPassword(passwordEncoder.encode("auditor123"));
            auditor.setRole(Role.AUDITOR);
            auditor.setEnabled(true);

            User maintenance = new User();
            maintenance.setFullName("Maintenance Team");
            maintenance.setEmail("maintenance@campus.edu");
            maintenance.setPassword(passwordEncoder.encode("maintenance123"));
            maintenance.setRole(Role.MAINTENANCE);
            maintenance.setEnabled(true);
            
            User student = new User();
            student.setFullName("Student User");
            student.setEmail("student@campus.edu");
            student.setPassword(passwordEncoder.encode("student123"));
            student.setRole(Role.STUDENT);
            student.setEnabled(true);

            userRepository.saveAll(Arrays.asList(admin, auditor, maintenance, student));
            logger.info("Users seeded successfully.");
        }
    }

    private void seedBuildings() {
        if (buildingRepository.count() == 0) {
            logger.info("Seeding buildings...");

            Building b1 = new Building();
            b1.setBuildingName("Main Academic Block");
            b1.setBuildingCode("MAB");
            b1.setDescription("Central academic building with main lecture halls.");
            b1.setLocation("Central Campus");
            b1.setNumberOfFloors(4);
            b1.setStatus("ACTIVE");

            Building b2 = new Building();
            b2.setBuildingName("Library Annex");
            b2.setBuildingCode("LIB-A");
            b2.setDescription("Quiet study spaces and computer labs.");
            b2.setLocation("North Campus");
            b2.setNumberOfFloors(2);
            b2.setStatus("ACTIVE");

            Building b3 = new Building();
            b3.setBuildingName("Student Center");
            b3.setBuildingCode("STU-C");
            b3.setDescription("Cafeteria, recreation, and student organization offices.");
            b3.setLocation("South Campus");
            b3.setNumberOfFloors(3);
            b3.setStatus("ACTIVE");

            buildingRepository.saveAll(Arrays.asList(b1, b2, b3));
            logger.info("Buildings seeded successfully.");
        }
    }
}
