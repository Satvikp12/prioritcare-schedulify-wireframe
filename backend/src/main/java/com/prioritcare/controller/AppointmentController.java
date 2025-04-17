package com.prioritcare.controller;

import com.prioritcare.dto.AppointmentRequest;
import com.prioritcare.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public String getAppointments() {
        return appointmentService.getAppointments();
    }

    @PostMapping
    public String createAppointment(@RequestBody AppointmentRequest request) {
        return appointmentService.createAppointment(request);
    }
}
