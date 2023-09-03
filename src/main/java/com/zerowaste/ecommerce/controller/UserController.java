package com.zerowaste.ecommerce.controller;


import com.zerowaste.ecommerce.api.UserRepository;
import com.zerowaste.ecommerce.entity.Users;
import com.zerowaste.ecommerce.exception.ResourceNotFoundException;
import com.zerowaste.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("users/{username}/{password}")
    public int UserLogin(@PathVariable("username") String username,@PathVariable("password") String password){
        int flag = userService.loginValidation(username,password);
        if (flag ==0){
            return 0;
        }
        return flag;
    }

    @GetMapping("users")
    public List<Users> getAllEmployees() {
        return userRepository.findAll();
    }

    @GetMapping("users/{id}")
    public ResponseEntity<Users> getEmployeeById(@PathVariable(value = "id") Long userId)
            throws ResourceNotFoundException {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + userId));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/users")
    public Users createEmployee(@RequestBody Users user) {
        return userRepository.save(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Users> updateEmployee(@PathVariable(value = "id") Long userId,
                                                    @RequestBody Users userDetails) throws ResourceNotFoundException {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));
        user.setFirst_name(userDetails.getFirst_name());
        user.setLast_name(userDetails.getLast_name());
        user.setEmail(userDetails.getEmail());

        final Users updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/employees/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long userId)
            throws ResourceNotFoundException {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }



}
