package com.cusoc.accessaudit.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditResponseItem {
    private Long id;
    private Long checklistId;
    private String checklistQuestion;
    private Integer maximumScore;
    private Long categoryId;
    private String categoryName;
    private int score;
    private String comments;
}
