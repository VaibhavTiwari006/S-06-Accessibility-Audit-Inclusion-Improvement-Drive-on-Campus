package com.cusoc.accessaudit.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "audit_checklists")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditChecklist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question", nullable = false, length = 1000)
    private String question;

    @Column(name = "maximum_score", nullable = false)
    private int maximumScore;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private AuditCategory category;
}
