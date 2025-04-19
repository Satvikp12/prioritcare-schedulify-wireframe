
package com.prioritcare.repository;

import com.prioritcare.entity.Appointment;
import com.prioritcare.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByDoctor(User doctor);
    List<Appointment> findByPatient(User patient);
    List<Appointment> findByDoctorAndDate(User doctor, String date);
    List<Appointment> findByStatus(Appointment.AppointmentStatus status);
}
