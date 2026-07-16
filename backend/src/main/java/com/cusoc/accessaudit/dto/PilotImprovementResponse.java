package com.cusoc.accessaudit.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PilotImprovementResponse {
    private Long id;
    private String title;
    private String description;
    private String location;
    private BigDecimal estimatedCost;
    private String impactLevel;
    private String status;
    private String proposerName;
    private String proposerEmail;
    private String adminNotes;
    private String category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Engagement features
    private long upvotes;
    private boolean hasUpvoted;
}
