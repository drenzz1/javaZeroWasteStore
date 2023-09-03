package com.zerowaste.ecommerce.controller;


import com.zerowaste.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:4200")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("user/{username}/{password}")
    public int UserLogin(@PathVariable("username") String username,@PathVariable("password") String password){
        int flag = userService.loginValidation(username,password);
        if (flag ==0){
            return 0;
        }
        return flag;
    }
}
