package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.UserResponse;
import com.cusoc.accessaudit.dto.UserUpdateRequest;

import java.util.List;

public interface UserService {
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    UserResponse updateUser(Long id, UserUpdateRequest request, String currentUserEmail);
    void deleteUser(Long id);
}
