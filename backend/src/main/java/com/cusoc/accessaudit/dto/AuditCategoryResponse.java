package com.cusoc.accessaudit.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditCategoryResponse {
    private Long id;
    private String categoryName;
}
