package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.BuildingRequest;
import com.cusoc.accessaudit.dto.BuildingResponse;

import java.util.List;

/**
 * BuildingService Interface
 * 
 * Manages the building asset registry data layers:
 * - Creates, reads, updates, and deletes building records.
 * - Restricts editing capabilities to ADMIN and AUDITOR roles.
 */
public interface BuildingService {
    BuildingResponse createBuilding(BuildingRequest request);
    List<BuildingResponse> getAllBuildings();
    BuildingResponse getBuildingById(Long id);
    BuildingResponse updateBuilding(Long id, BuildingRequest request);
    void deleteBuilding(Long id);
}
