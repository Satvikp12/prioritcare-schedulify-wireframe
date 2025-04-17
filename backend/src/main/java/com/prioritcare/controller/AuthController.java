package com.prioritcare.controller;

import com.prioritcare.dto.LoginRequest;
import com.prioritcare.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return authService.login(request.username, request.password);
    }

    @PostMapping("/register")
    public String register(@RequestBody String user) {
        return "Register logic placeholder";
    }
}
