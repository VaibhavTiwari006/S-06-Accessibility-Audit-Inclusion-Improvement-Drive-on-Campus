package com.cusoc.accessaudit.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PilotImprovementRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200)
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 2000)
    private String description;

    @Size(max = 300)
    private String location;

    private BigDecimal estimatedCost;

    private String impactLevel; // LOW, MEDIUM, HIGH

    private String category; // RAMP, SIGNAGE, WASHROOM, DIGITAL, LIGHTING, OTHER
}
