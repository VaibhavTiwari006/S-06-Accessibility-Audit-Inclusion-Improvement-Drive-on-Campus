package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.AccessAuditApplication;
import com.cusoc.accessaudit.dto.BuildingRequest;
import com.cusoc.accessaudit.entity.Building;
import com.cusoc.accessaudit.repository.BuildingRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = AccessAuditApplication.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class BuildingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Building testBuilding;

    @BeforeEach
    void setUp() {
        buildingRepository.deleteAll();
        testBuilding = buildingRepository.save(Building.builder()
                .buildingName("Main Block")
                .buildingCode("MB01")
                .description("Main administrative and classroom block")
                .location("Central")
                .numberOfFloors(3)
                .status("ACTIVE")
                .build());
    }

    @Test
    @WithMockUser(username = "admin@campus.edu", roles = {"ADMIN"})
    void testCreateBuilding() throws Exception {
        BuildingRequest request = BuildingRequest.builder()
                .buildingName("Science Block")
                .buildingCode("SB02")
                .description("Department of Science")
                .location("East Campus")
                .numberOfFloors(4)
                .status("ACTIVE")
                .build();

        mockMvc.perform(post("/api/buildings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Building registered successfully"))
                .andExpect(jsonPath("$.data.buildingName").value("Science Block"))
                .andExpect(jsonPath("$.data.buildingCode").value("SB02"));
    }

    @Test
    @WithMockUser(username = "student@campus.edu", roles = {"STUDENT"})
    void testGetAllBuildings() throws Exception {
        mockMvc.perform(get("/api/buildings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[0].buildingName").value("Main Block"));
    }

    @Test
    @WithMockUser(username = "student@campus.edu", roles = {"STUDENT"})
    void testGetBuildingById() throws Exception {
        mockMvc.perform(get("/api/buildings/" + testBuilding.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.buildingName").value("Main Block"));
    }

    @Test
    @WithMockUser(username = "admin@campus.edu", roles = {"ADMIN"})
    void testUpdateBuilding() throws Exception {
        BuildingRequest request = BuildingRequest.builder()
                .buildingName("Main Block Updated")
                .buildingCode("MB01")
                .description("Updated Description")
                .location("Central Area")
                .numberOfFloors(3)
                .status("INACTIVE")
                .build();

        mockMvc.perform(put("/api/buildings/" + testBuilding.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.buildingName").value("Main Block Updated"))
                .andExpect(jsonPath("$.data.status").value("INACTIVE"));
    }

    @Test
    @WithMockUser(username = "admin@campus.edu", roles = {"ADMIN"})
    void testDeleteBuilding() throws Exception {
        mockMvc.perform(delete("/api/buildings/" + testBuilding.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Building deleted successfully"));
    }
}
