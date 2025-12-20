![CI](https://github.com/Rodinaamr/Project_clinic/actions/workflows/main.yml/badge.svg)

# Clinic Management System

## Overview
The **Clinic Management System** is a cross-platform application developed to streamline clinic operations and enhance coordination between doctors and receptionists.  
The system enables efficient management of appointments, patient histories, diagnoses, and payments while maintaining ethical standards and data integrity in healthcare.

---

## Key Features

### Doctor Module
- Interactive dashboard displaying today’s scheduled patients and appointment statuses  
- Individual diagnosis pages for entering medical notes, prescriptions, and medications  
- Medication selection box with integrated search functionality (planned Egyptian Medication Database integration)  
- Full access to patient history and prior visit summaries  

### Receptionist Module
- Comprehensive and searchable patient directory  
- Appointment booking, patient registration, and payment tracking  
- Edit-only policy for patient and medical records to ensure ethical data handling  
- No deletion of medical data to preserve clinical integrity  

### General Features
- Role-based dashboards for doctors and receptionists  
- Clear and responsive user interface for smooth navigation  
- Reusable sidebar components and modular architecture for scalability  

---

## System Design

### Entity-Relationship Diagram (ERD)
The ERD defines relationships among key clinical entities including patients, doctors, appointments, diagnoses, and medications.  
The data model supports future expansion such as billing, laboratory reports, and analytics modules.

Documentation: `clinic_ERD.drawio.pdf`

---

### Wireframe Design
The system interface follows structured wireframes to ensure role-based clarity, minimal navigation, and optimized user experience.

Documentation: `clinic_wireframe.pdf`

---

## Technology Overview

| Layer | Description |
|-----|------------|
Frontend | Cross-platform application using Expo |
Routing | Role-based navigation |
Language | TypeScript |
Styling | Custom native styling |
Data Layer | Dummy JSON arrays (planned database integration) |
Future Integration | Egyptian Medication Database |

---

## Project Architecture
Frontend/
├── app/                  # Main application structure
│   ├── auth/             # Authentication screens
│   │   ├── patient-login.tsx
│   │   ├── patient-register.tsx
│   │   └── staff-login.tsx
│   │
│   ├── doctor/           # Doctor-specific features
│   │   ├── appointments.tsx
│   │   ├── dashboard.tsx
│   │   ├── medical-records.tsx
│   │   └── patient-feedback.tsx
│   │
│   ├── patient/          # Patient-specific features
│   │   ├── book-appointment.tsx
│   │   ├── dashboard.tsx
│   │   ├── profile.tsx
│   │   ├── payments.tsx
│   │   └── feedback.tsx
│   │
│   └── services/         # API service layer
│       ├── api.ts        # Axios/HTTP client configuration
│       ├── patients.ts   # Patient-related API calls
│       ├── appointments.ts
│       ├── doctors.ts
│       └── users.ts
│
├── components/           # Reusable UI components
├── constants/            # App constants and configurations
├── contexts/             # React Context providers
├── hooks/                # Custom React hooks
└── scripts/              # Build and utility scripts

Backend/
├── Controllers/           # API endpoints (RESTful controllers)
│   ├── PatientsController.cs
│   ├── AppointmentsController.cs
│   ├── DoctorsController.cs
│   └── AuthenticationController.cs
├── Models/               # Entity models and DTOs
│   ├── Patient.cs
│   ├── Appointment.cs
│   ├── Doctor.cs
│   └── User.cs
├── Services/             # Business logic layer
│   ├── PatientService.cs
│   ├── AppointmentService.cs
│   └── AuthenticationService.cs
├── FrontendServices/     # Specialized services for frontend integration
├── Properties/           # Application properties and configurations
├── Migrations/           # Entity Framework database migrations
└── ApplicationDbContext.cs  # Database context (Entity Framework Core)

---
Planned Enhancements

Integration with Egyptian Medication Database

Secure authentication and role-based access control

Cloud-based storage for patient and appointment data

Analytics dashboard for patient flow and performance insights

Internal messaging system between clinic staff

Ethical Data Policy

This system follows a strict edit-only data policy, ensuring that medical records cannot be deleted.
This preserves historical accuracy and aligns with ethical standards in healthcare information management.



Developed By
Rodayna abdelrahman 
malak salama 
malak chaaban 
nour abdelal 
eshraq nabil 

Documentation

clinic_ERD.drawio.pdf — Database structure and entity relationships

clinic_wireframe.pdf — Interface wireframes and navigation flow

clinical_workflow.pdf — System workflow and process lo


<img width="1904" height="911" alt="image" src="https://github.com/user-attachments/assets/3fd22ebb-4f72-4b94-902b-3452066fec40" />

<img width="1912" height="903" alt="image" src="https://github.com/user-attachments/assets/5a25ea45-58a7-49a7-9540-1d08e96d1f21" />
<img width="1911" height="906" alt="image" src="https://github.com/user-attachments/assets/aabd5bc4-fca7-46ea-9466-184b0176f94a" />


## Installation & Setup

Clone the repository:
```bash
git clone https://github.com/Rodinaamr/Project_clinic.git
cd Project_clinic
Install dependencies:

npm install


Run the application:

npx expo start




