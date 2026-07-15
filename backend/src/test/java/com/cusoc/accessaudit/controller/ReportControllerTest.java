package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.AccessAuditApplication;
import com.cusoc.accessaudit.entity.Building;
import com.cusoc.accessaudit.repository.BuildingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = AccessAuditApplication.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ReportControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BuildingRepository buildingRepository;

    private Building testBuilding;

    @BeforeEach
    void setUp() {
        if (buildingRepository.count() == 0) {
            testBuilding = buildingRepository.save(Building.builder()
                    .buildingName("Test Academic Hall")
                    .buildingCode("TAH01")
                    .description("Test Description")
                    .location("Main Area")
                    .numberOfFloors(2)
                    .status("ACTIVE")
                    .build());
        } else {
            testBuilding = buildingRepository.findAll().get(0);
        }
    }

    @Test
    @WithMockUser(username = "admin@campus.edu", roles = {"ADMIN"})
    void testExportCampusReport() throws Exception {
        mockMvc.perform(get("/api/reports/campus"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                .andExpect(header().string("Content-Disposition", "form-data; name=\"attachment\"; filename=\"campus-accessibility-report.pdf\""));
    }

    @Test
    @WithMockUser(username = "admin@campus.edu", roles = {"ADMIN"})
    void testExportBuildingReport() throws Exception {
        mockMvc.perform(get("/api/reports/building/" + testBuilding.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                .andExpect(header().string("Content-Disposition", "form-data; name=\"attachment\"; filename=\"building-accessibility-report-" + testBuilding.getId() + ".pdf\""));
    }
}
