
import { Appointment, Doctor, Notification, Patient, User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Admin User",
    email: "admin@prioritycare.com",
    role: "admin",
  },
  {
    id: "user2",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@prioritycare.com",
    role: "doctor",
  },
  {
    id: "user3",
    name: "John Smith",
    email: "john.smith@email.com",
    role: "patient",
  },
  {
    id: "user4",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    role: "patient",
  },
];

export const mockDoctors: Doctor[] = [
  {
    id: "doc1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "doc2",
    name: "Dr. Michael Chen",
    specialty: "Pediatrics",
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: "doc3",
    name: "Dr. Elizabeth Taylor",
    specialty: "Neurology",
    availability: ["Monday", "Tuesday", "Wednesday"],
  },
  {
    id: "doc4",
    name: "Dr. Robert Williams",
    specialty: "Orthopedics",
    availability: ["Thursday", "Friday", "Saturday"],
  },
];

export const mockPatients: Patient[] = [
  {
    id: "pat1",
    name: "John Smith",
    email: "john.smith@email.com",
    medicalHistory: "Hypertension, Diabetes Type 2",
    priorityLevel: "high",
  },
  {
    id: "pat2",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    priorityLevel: "medium",
  },
  {
    id: "pat3",
    name: "Michael Rodriguez",
    email: "michael.r@email.com",
    priorityLevel: "low",
  },
  {
    id: "pat4",
    name: "Sophia Kim",
    email: "sophia.kim@email.com",
    medicalHistory: "Asthma",
    priorityLevel: "high",
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "apt1",
    patientId: "pat1",
    patientName: "John Smith",
    doctorId: "doc1",
    doctorName: "Dr. Sarah Johnson",
    date: "2023-08-15",
    time: "09:00 AM",
    status: "scheduled",
    priorityLevel: "high",
    notes: "Follow-up on recent lab results",
  },
  {
    id: "apt2",
    patientId: "pat2",
    patientName: "Emma Davis",
    doctorId: "doc2",
    doctorName: "Dr. Michael Chen",
    date: "2023-08-16",
    time: "10:30 AM",
    status: "scheduled",
    priorityLevel: "medium",
  },
  {
    id: "apt3",
    patientId: "pat3",
    patientName: "Michael Rodriguez",
    doctorId: "doc3",
    doctorName: "Dr. Elizabeth Taylor",
    date: "2023-08-14",
    time: "02:00 PM",
    status: "completed",
    priorityLevel: "low",
  },
  {
    id: "apt4",
    patientId: "pat4",
    patientName: "Sophia Kim",
    doctorId: "doc4",
    doctorName: "Dr. Robert Williams",
    date: "2023-08-17",
    time: "11:15 AM",
    status: "scheduled",
    priorityLevel: "high",
    notes: "Initial consultation",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "not1",
    userId: "user3",
    message: "Reminder: Your appointment with Dr. Sarah Johnson is tomorrow at 9:00 AM",
    read: false,
    date: "2023-08-14",
  },
  {
    id: "not2",
    userId: "user2",
    message: "New high-priority appointment scheduled for August 15",
    read: true,
    date: "2023-08-13",
  },
  {
    id: "not3",
    userId: "user1",
    message: "Staff meeting scheduled for August 16 at 3:00 PM",
    read: false,
    date: "2023-08-12",
  },
  {
    id: "not4",
    userId: "user4",
    message: "Your test results are now available for review",
    read: false,
    date: "2023-08-14",
  },
];
