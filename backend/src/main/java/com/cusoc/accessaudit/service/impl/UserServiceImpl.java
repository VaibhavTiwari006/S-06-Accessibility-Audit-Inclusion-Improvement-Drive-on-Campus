package com.cusoc.accessaudit.service.impl;

import com.cusoc.accessaudit.dto.UserResponse;
import com.cusoc.accessaudit.dto.UserUpdateRequest;
import com.cusoc.accessaudit.entity.Role;
import com.cusoc.accessaudit.entity.User;
import com.cusoc.accessaudit.exception.ResourceNotFoundException;
import com.cusoc.accessaudit.mapper.UserMapper;
import com.cusoc.accessaudit.repository.UserRepository;
import com.cusoc.accessaudit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return userMapper.toResponse(user);
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UserUpdateRequest request, String currentUserEmail) {
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Logged in user not found"));

        User targetUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // Check authority: Only ADMIN can update other users, or user can update themselves
        if (!targetUser.getId().equals(currentUser.getId()) && currentUser.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("You do not have permission to update this user profile");
        }

        // Apply basic modifications
        targetUser.setFullName(request.getFullName());

        // Administrative updates: Only ADMIN can change role or change enabled status
        if (currentUser.getRole() == Role.ADMIN) {
            if (request.getRole() != null) {
                targetUser.setRole(request.getRole());
            }
            if (request.getEnabled() != null) {
                targetUser.setEnabled(request.getEnabled());
            }
        }

        User updatedUser = userRepository.save(targetUser);
        return userMapper.toResponse(updatedUser);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
    }
}
