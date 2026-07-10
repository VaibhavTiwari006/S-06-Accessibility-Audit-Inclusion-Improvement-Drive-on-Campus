package com.cusoc.accessaudit.service.impl;

import com.cusoc.accessaudit.dto.BuildingRequest;
import com.cusoc.accessaudit.dto.BuildingResponse;
import com.cusoc.accessaudit.entity.Building;
import com.cusoc.accessaudit.exception.ResourceNotFoundException;
import com.cusoc.accessaudit.mapper.BuildingMapper;
import com.cusoc.accessaudit.repository.BuildingRepository;
import com.cusoc.accessaudit.service.BuildingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuildingServiceImpl implements BuildingService {

    private final BuildingRepository buildingRepository;
    private final BuildingMapper buildingMapper;

    @Override
    @Transactional
    public BuildingResponse createBuilding(BuildingRequest request) {
        if (buildingRepository.existsByBuildingCode(request.getBuildingCode())) {
            throw new IllegalArgumentException("Building code '" + request.getBuildingCode() + "' is already in use");
        }

        Building building = buildingMapper.toEntity(request);
        Building savedBuilding = buildingRepository.save(building);
        return buildingMapper.toResponse(savedBuilding);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BuildingResponse> getAllBuildings() {
        return buildingRepository.findAll().stream()
                .map(buildingMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BuildingResponse getBuildingById(Long id) {
        Building building = buildingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + id));
        return buildingMapper.toResponse(building);
    }

    @Override
    @Transactional
    public BuildingResponse updateBuilding(Long id, BuildingRequest request) {
        Building building = buildingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + id));

        if (buildingRepository.existsByBuildingCodeAndIdNot(request.getBuildingCode(), id)) {
            throw new IllegalArgumentException("Building code '" + request.getBuildingCode() + "' is already in use by another building");
        }

        buildingMapper.updateEntity(request, building);
        Building updatedBuilding = buildingRepository.save(building);
        return buildingMapper.toResponse(updatedBuilding);
    }

    @Override
    @Transactional
    public void deleteBuilding(Long id) {
        Building building = buildingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + id));
        buildingRepository.delete(building);
    }
}
