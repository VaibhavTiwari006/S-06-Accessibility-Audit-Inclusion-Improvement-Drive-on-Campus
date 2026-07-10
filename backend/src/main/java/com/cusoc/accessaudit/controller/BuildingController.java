package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.dto.BuildingRequest;
import com.cusoc.accessaudit.dto.BuildingResponse;
import com.cusoc.accessaudit.response.ApiResponse;
import com.cusoc.accessaudit.service.BuildingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buildings")
@RequiredArgsConstructor
@Tag(name = "Buildings", description = "Endpoints for managing campus buildings")
@SecurityRequirement(name = "Bearer Authentication")
public class BuildingController {

    private final BuildingService buildingService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Register a new building", description = "Adds a campus building details to the registry. Admin access only.")
    public ResponseEntity<ApiResponse<BuildingResponse>> createBuilding(@Valid @RequestBody BuildingRequest request) {
        BuildingResponse response = buildingService.createBuilding(request);
        ApiResponse<BuildingResponse> apiResponse = ApiResponse.<BuildingResponse>builder()
                .success(true)
                .message("Building registered successfully")
                .data(response)
                .build();
        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all buildings", description = "Retrieves details of all registered campus buildings. Available for all authenticated roles.")
    public ResponseEntity<ApiResponse<List<BuildingResponse>>> getAllBuildings() {
        List<BuildingResponse> buildings = buildingService.getAllBuildings();
        ApiResponse<List<BuildingResponse>> apiResponse = ApiResponse.<List<BuildingResponse>>builder()
                .success(true)
                .message("All buildings retrieved successfully")
                .data(buildings)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get building by ID", description = "Retrieves details of a registered building by ID. Available for all authenticated roles.")
    public ResponseEntity<ApiResponse<BuildingResponse>> getBuildingById(@PathVariable Long id) {
        BuildingResponse building = buildingService.getBuildingById(id);
        ApiResponse<BuildingResponse> apiResponse = ApiResponse.<BuildingResponse>builder()
                .success(true)
                .message("Building details retrieved successfully")
                .data(building)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update building details", description = "Modifies building information like name, floor counts, or status. Admin access only.")
    public ResponseEntity<ApiResponse<BuildingResponse>> updateBuilding(
            @PathVariable Long id,
            @Valid @RequestBody BuildingRequest request) {
        BuildingResponse response = buildingService.updateBuilding(id, request);
        ApiResponse<BuildingResponse> apiResponse = ApiResponse.<BuildingResponse>builder()
                .success(true)
                .message("Building updated successfully")
                .data(response)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete building", description = "Removes a building from the platform registry by ID. Admin access only.")
    public ResponseEntity<ApiResponse<Void>> deleteBuilding(@PathVariable Long id) {
        buildingService.deleteBuilding(id);
        ApiResponse<Void> apiResponse = ApiResponse.<Void>builder()
                .success(true)
                .message("Building deleted successfully")
                .data(null)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
