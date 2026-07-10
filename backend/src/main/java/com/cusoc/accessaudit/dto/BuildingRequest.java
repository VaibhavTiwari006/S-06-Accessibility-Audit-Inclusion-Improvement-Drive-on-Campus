package com.cusoc.accessaudit.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingRequest {

    @NotBlank(message = "Building name is required")
    private String buildingName;

    @NotBlank(message = "Building code is required")
    private String buildingCode;

    private String description;

    @NotBlank(message = "Location details are required")
    private String location;

    @Min(value = 1, message = "Number of floors must be at least 1")
    private int numberOfFloors;

    @NotBlank(message = "Status is required")
    private String status;
}
