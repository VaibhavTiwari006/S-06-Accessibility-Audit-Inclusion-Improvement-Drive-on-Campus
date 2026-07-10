package com.cusoc.accessaudit.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Represents a single checklist item response within an Audit.
 * Each AuditResponse records the score and comments for one AuditChecklist question.
 */
@Entity
@Table(name = "audit_responses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Score awarded for this checklist item (0 to checklist.maximumScore). */
    @Column(name = "score", nullable = false)
    @Builder.Default
    private int score = 0;

    /** Optional auditor notes for this specific checklist item. */
    @Column(name = "comments", length = 2000)
    private String comments;

    /** The audit this response belongs to. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "audit_id", nullable = false)
    private Audit audit;

    /** The checklist question this response answers. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checklist_id", nullable = false)
    private AuditChecklist checklist;
}
