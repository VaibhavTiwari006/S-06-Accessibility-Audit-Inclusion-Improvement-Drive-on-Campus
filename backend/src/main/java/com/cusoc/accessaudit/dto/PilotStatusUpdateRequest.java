package com.cusoc.accessaudit.dto;

import lombok.Data;

@Data
public class PilotStatusUpdateRequest {
    private String status;
    private String adminNotes;
}
