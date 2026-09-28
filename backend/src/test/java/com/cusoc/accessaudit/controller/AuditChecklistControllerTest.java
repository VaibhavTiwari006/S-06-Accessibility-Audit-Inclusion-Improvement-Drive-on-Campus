package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.AccessAuditApplication;
import com.cusoc.accessaudit.entity.AuditCategory;
import com.cusoc.accessaudit.entity.AuditChecklist;
import com.cusoc.accessaudit.repository.AuditCategoryRepository;
import com.cusoc.accessaudit.repository.AuditChecklistRepository;
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
public class AuditChecklistControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuditCategoryRepository categoryRepository;

    @Autowired
    private AuditChecklistRepository checklistRepository;

    private AuditCategory testCategory;
    private AuditChecklist testChecklist;

    @BeforeEach
    void setUp() {
        if (categoryRepository.count() == 0) {
            testCategory = categoryRepository.save(AuditCategory.builder()
                    .categoryName("Ramps and Entrances")
                    .build());
        } else {
            testCategory = categoryRepository.findAll().get(0);
        }

        if (checklistRepository.count() == 0) {
            testChecklist = checklistRepository.save(AuditChecklist.builder()
                    .question("Is the entrance ramp slope within 1:12 statutory gradient?")
                    .maximumScore(5)
                    .category(testCategory)
                    .standardReference("RPWD Act 2016 / CPWD Section 3.2")
                    .build());
        } else {
            testChecklist = checklistRepository.findAll().get(0);
        }
    }

    @Test
    @WithMockUser(username = "auditor@campus.edu", roles = {"AUDITOR"})
    void testGetAllChecklists() throws Exception {
        mockMvc.perform(get("/api/audit-checklists")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    @WithMockUser(username = "auditor@campus.edu", roles = {"AUDITOR"})
    void testGetChecklistById() throws Exception {
        mockMvc.perform(get("/api/audit-checklists/" + testChecklist.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(testChecklist.getId()));
    }
}
