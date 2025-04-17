package com.prioritcare.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public String dashboard() {
        return "Admin dashboard data";
    }

    @PostMapping("/schedule")
    public String scheduleDoctor(@RequestBody String scheduleData) {
        return "Doctor scheduled (placeholder)";
    }
}
