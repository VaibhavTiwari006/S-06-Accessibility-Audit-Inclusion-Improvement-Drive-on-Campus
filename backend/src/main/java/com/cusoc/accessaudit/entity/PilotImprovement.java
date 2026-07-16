package com.cusoc.accessaudit.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pilot_improvements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PilotImprovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", nullable = false, length = 2000)
    private String description;

    @Column(name = "location", length = 300)
    private String location;

    @Column(name = "estimated_cost")
    private BigDecimal estimatedCost;

    @Column(name = "impact_level", length = 50)
    private String impactLevel; // LOW, MEDIUM, HIGH

    @Column(name = "status", nullable = false, length = 50)
    private String status; // PROPOSED, APPROVED, IN_PROGRESS, COMPLETED, REJECTED

    @Column(name = "proposer_name", nullable = false, length = 200)
    private String proposerName;

    @Column(name = "proposer_email", length = 200)
    private String proposerEmail;

    @Column(name = "admin_notes", length = 1000)
    private String adminNotes;

    @Column(name = "category", length = 100)
    private String category; // RAMP, SIGNAGE, WASHROOM, DIGITAL, LIGHTING, OTHER

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.status == null) this.status = "PROPOSED";
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
