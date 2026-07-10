package com.cusoc.accessaudit.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditChecklistResponse {
    private Long id;
    private String question;
    private int maximumScore;
    private Long categoryId;
    private String categoryName;
}
