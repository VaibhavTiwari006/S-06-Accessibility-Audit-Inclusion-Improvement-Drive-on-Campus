package com.cusoc.accessaudit.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "audits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Audit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "audit_date", nullable = false)
    private LocalDate auditDate;

    @Column(name = "overall_accessibility_score")
    @Builder.Default
    private double overallAccessibilityScore = 0.0;

    @Column(name = "remarks", length = 2000)
    private String remarks;

    @Column(name = "status", nullable = false)
    @Builder.Default
    private String status = "DRAFT"; // e.g., DRAFT, SUBMITTED

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auditor_id", nullable = false)
    private User auditor;

    @OneToMany(mappedBy = "audit", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<AuditResponse> responses = new ArrayList<>();
}
