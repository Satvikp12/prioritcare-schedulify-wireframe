
package com.prioritcare.repository;

import com.prioritcare.entity.Appointment;
import com.prioritcare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctor(User doctor);
    List<Appointment> findByPatient(User patient);
    List<Appointment> findByDoctorAndDate(User doctor, String date);
    List<Appointment> findByStatus(Appointment.AppointmentStatus status);
}
