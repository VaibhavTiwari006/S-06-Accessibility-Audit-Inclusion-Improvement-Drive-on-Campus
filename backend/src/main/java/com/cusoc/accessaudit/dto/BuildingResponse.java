package com.cusoc.accessaudit.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingResponse {
    private Long id;
    private String buildingName;
    private String buildingCode;
    private String description;
    private String location;
    private int numberOfFloors;
    private String status;
    private LocalDateTime createdAt;
}
