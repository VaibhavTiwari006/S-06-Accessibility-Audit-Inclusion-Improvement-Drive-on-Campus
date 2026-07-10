package com.cusoc.accessaudit.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "audit_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_name", nullable = false, unique = true)
    private String categoryName;
}
