
package com.prioritcare.service;

import com.prioritcare.dto.AppointmentRequest;
import com.prioritcare.entity.Appointment;
import com.prioritcare.entity.User;
import com.prioritcare.repository.AppointmentRepository;
import com.prioritcare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private UserRepository userRepository;

    public String getAppointments() {
        List<Appointment> list = appointmentRepository.findAll();
        return "Total Appointments: " + list.size();  // Simplified for now
    }

    public String createAppointment(AppointmentRequest request) {
        Optional<User> doctor = userRepository.findById(request.getDoctorId());
        Optional<User> patient = userRepository.findById(request.getUserId());
        
        if (doctor.isEmpty() || patient.isEmpty()) {
            return "Doctor or patient not found";
        }
        
        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor.get());
        appointment.setPatient(patient.get());
        appointment.setDate(request.getDatetime().split("T")[0]);
        appointment.setTime(request.getDatetime().split("T")[1]);
        appointment.setStatus(Appointment.AppointmentStatus.SCHEDULED);

        appointmentRepository.save(appointment);
        return "Appointment created successfully!";
    }
}
