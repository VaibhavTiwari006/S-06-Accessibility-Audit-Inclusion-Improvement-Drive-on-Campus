package com.cusoc.accessaudit.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentReportRequest {

    private Long buildingId;

    @NotBlank(message = "Description is required")
    @Size(max = 2000, message = "Description cannot exceed 2000 characters")
    private String description;

    @NotBlank(message = "Location details are required")
    @Size(max = 500, message = "Location details cannot exceed 500 characters")
    private String locationDetails;

    @Size(max = 1000, message = "Photo URL cannot exceed 1000 characters")
    private String photoUrl;
}
