package com.prioritcare.service;

import com.prioritcare.dto.AppointmentRequest;
import com.prioritcare.entity.Appointment;
import com.prioritcare.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public String getAppointments() {
        List<Appointment> list = appointmentRepository.findAll();
        return "Total Appointments: " + list.size();  // Simplified for now
    }

    public String createAppointment(AppointmentRequest request) {
        Appointment appointment = new Appointment();
        appointment.setDoctorId(request.getDoctorId());
        appointment.setUserId(request.getUserId());
        appointment.setDatetime(request.getDatetime());

        appointmentRepository.save(appointment);
        return "Appointment created successfully!";
    }
}
