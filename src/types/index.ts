
export type PriorityLevel = 'high' | 'medium' | 'low';

export type UserRole = 'admin' | 'doctor' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: string[];
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  medicalHistory?: string;
  priorityLevel: PriorityLevel;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  priorityLevel: PriorityLevel;
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  date: string;
}
