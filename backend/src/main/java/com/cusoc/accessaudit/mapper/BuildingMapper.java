package com.cusoc.accessaudit.mapper;

import com.cusoc.accessaudit.dto.BuildingRequest;
import com.cusoc.accessaudit.dto.BuildingResponse;
import com.cusoc.accessaudit.entity.Building;
import org.springframework.stereotype.Component;

@Component
public class BuildingMapper {

    public BuildingResponse toResponse(Building building) {
        if (building == null) {
            return null;
        }
        return BuildingResponse.builder()
                .id(building.getId())
                .buildingName(building.getBuildingName())
                .buildingCode(building.getBuildingCode())
                .description(building.getDescription())
                .location(building.getLocation())
                .numberOfFloors(building.getNumberOfFloors())
                .status(building.getStatus())
                .createdAt(building.getCreatedAt())
                .build();
    }

    public Building toEntity(BuildingRequest request) {
        if (request == null) {
            return null;
        }
        return Building.builder()
                .buildingName(request.getBuildingName())
                .buildingCode(request.getBuildingCode())
                .description(request.getDescription())
                .location(request.getLocation())
                .numberOfFloors(request.getNumberOfFloors())
                .status(request.getStatus())
                .build();
    }

    public void updateEntity(BuildingRequest request, Building building) {
        if (request == null || building == null) {
            return;
        }
        building.setBuildingName(request.getBuildingName());
        building.setBuildingCode(request.getBuildingCode());
        building.setDescription(request.getDescription());
        building.setLocation(request.getLocation());
        building.setNumberOfFloors(request.getNumberOfFloors());
        building.setStatus(request.getStatus());
    }
}
