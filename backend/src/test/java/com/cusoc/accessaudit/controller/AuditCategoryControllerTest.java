package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.AccessAuditApplication;
import com.cusoc.accessaudit.entity.AuditCategory;
import com.cusoc.accessaudit.repository.AuditCategoryRepository;
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
public class AuditCategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuditCategoryRepository categoryRepository;

    private AuditCategory testCategory;

    @BeforeEach
    void setUp() {
        if (categoryRepository.count() == 0) {
            testCategory = categoryRepository.save(AuditCategory.builder()
                    .categoryName("Ramps and Entrances")
                    .build());
        } else {
            testCategory = categoryRepository.findAll().get(0);
        }
    }

    @Test
    @WithMockUser(username = "auditor@campus.edu", roles = {"AUDITOR"})
    void testGetAllCategories() throws Exception {
        mockMvc.perform(get("/api/audit-categories")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    @WithMockUser(username = "auditor@campus.edu", roles = {"AUDITOR"})
    void testGetCategoryById() throws Exception {
        mockMvc.perform(get("/api/audit-categories/" + testCategory.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(testCategory.getId()));
    }
}
