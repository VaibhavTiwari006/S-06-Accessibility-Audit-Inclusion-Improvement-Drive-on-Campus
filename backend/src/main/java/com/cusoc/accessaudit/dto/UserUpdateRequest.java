package com.cusoc.accessaudit.dto;

import com.cusoc.accessaudit.entity.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    
    @NotBlank(message = "Full name is required")
    private String fullName;
    
    private Role role;
    
    private Boolean enabled;
}
