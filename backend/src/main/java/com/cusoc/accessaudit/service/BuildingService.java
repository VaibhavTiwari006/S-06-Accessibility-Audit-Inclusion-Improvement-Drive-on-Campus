package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.BuildingRequest;
import com.cusoc.accessaudit.dto.BuildingResponse;

import java.util.List;

public interface BuildingService {
    BuildingResponse createBuilding(BuildingRequest request);
    List<BuildingResponse> getAllBuildings();
    BuildingResponse getBuildingById(Long id);
    BuildingResponse updateBuilding(Long id, BuildingRequest request);
    void deleteBuilding(Long id);
}
