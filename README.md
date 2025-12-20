# Clinic Management System 🏥

![CI](https://github.com/Rodinaamr/Project_clinic/actions/workflows/main.yml/badge.svg)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-blue)
![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)
![React Native](https://img.shields.io/badge/React%20Native-0.72.6-61DAFB)
![Expo](https://img.shields.io/badge/Expo-49.0.0-000020)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-7.0-512BD4)

## 🌐 Live Deployment
**Application is live at:** https://rodinasmr.github.io/Project_clinic/

---

1 Purpose

This document describes the functional and non-functional requirements of the Clinic Management System.
The purpose of this system is to help dermatology clinics manage doctors, patients, appointments, and medical records efficiently through a centralized digital platform.

This document is intended for:

Developers

Project supervisors / TAs

Stakeholders

Testers

2 Scope

The Clinic Management System is a web/mobile-based application that allows:

Patients to book and manage appointments

Doctors to view schedules and patient records

Admins to manage users and clinic data

The system aims to reduce paperwork, improve scheduling accuracy, and enhance patient experience.

3 Definitions, Acronyms, and Abbreviations

CMS: Clinic Management System

Admin: System administrator

SRS: Software Requirements Specification

UI/UX: User Interface / User Experience

4 Overall Description
 Product Perspective

The system is a standalone application with:

Frontend (Web / Mobile)

Backend API

Database for storing clinic data

It interacts with users via authenticated accounts and role-based access.

2.2 User Classes and Characteristics
User Type	Description
Admin	Manages doctors, system settings, and clinic data
Doctor	Views appointments, patient records
Patient	Books appointments and views medical history
2.3 Operating Environment

Frontend: Web or Mobile Application

Backend: RESTful API

Database: Relational Database

Hosting: Cloud-based deployment

2.4 Assumptions and Constraints
Assumptions

Users have internet access

Users possess basic digital literacy

Doctors and admins are registered by the clinic

Constraints

Must use GitHub for version control

Must support deployment on a cloud platform

Must follow security best practices

3. Functional Requirements
3.1 User Authentication

The system shall allow users to register and log in.

The system shall authenticate users based on roles (Admin, Doctor, Patient).

The system shall prevent unauthorized access.

3.2 Patient Management

The system shall allow admins to add, update, and delete patient records.

The system shall store patient personal and medical information.

Patients shall be able to view their own data only.

3.3 Doctor Management

The system shall allow admins to add and manage doctors.

Doctors shall be able to view their profiles and schedules.

Doctors shall access assigned patient records.

3.4 Appointment Management

Patients shall be able to book appointments.

The system shall prevent double booking.

Doctors shall view daily and weekly appointments.

Appointments shall be editable or cancellable.

3.5 Medical Records

Doctors shall add diagnosis and treatment notes.

Medical records shall be stored securely.

Patients may view their medical history (read-only).

3.6 Admin Dashboard

Admin shall manage users.

Admin shall view system statistics.

Admin shall control system configurations.

4. Non-Functional Requirements
4.1 Performance

The system shall respond within 2 seconds for normal operations.

The system shall support multiple concurrent users.

4.2 Security

Passwords shall be encrypted.

Role-based access control shall be enforced.

Sensitive data shall be protected from unauthorized access.

4.3 Usability

The system shall have a simple and intuitive UI.

The system shall be accessible on different devices.

Error messages shall be clear and helpful.

4.4 Reliability & Availability

The system shall have minimal downtime.

Data shall be backed up regularly.

4.5 Maintainability

The code shall be modular and well-documented.

The system shall be easy to update and extend.

4.6 Scalability

The system shall support adding new clinics or departments in the future.

The system shall handle increased user load.

5. External Interface Requirements
5.1 User Interface

Responsive UI

Forms for login, booking, and data management

5.2 Software Interfaces

REST API for frontend-backend communication

Database interface for CRUD operations

6. Future Enhancements

Online payment integration

Notifications and reminders

Analytics dashboard

Mobile application version
## 🚀 Key Features

### 👨‍⚕️ Doctor Module
- Interactive dashboard displaying today's scheduled patients and appointment statuses  
- Individual diagnosis pages for entering medical notes, prescriptions, and medications  
- Medication selection box with integrated search functionality (planned Egyptian Medication Database integration)  
- Full access to patient history and prior visit summaries  

### 📋 Receptionist Module
- Comprehensive and searchable patient directory  
- Appointment booking, patient registration, and payment tracking  
- Edit-only policy for patient and medical records to ensure ethical data handling  
- No deletion of medical data to preserve clinical integrity  

### 🔧 General Features
- Role-based dashboards for doctors and receptionists  
- Clear and responsive user interface for smooth navigation  
- Reusable sidebar components and modular architecture for scalability  

---

## 🏗️ System Design

### 📊 Diagrams & Documentation
| Diagram | Description 
|---------|-------------|
| **UML Class Diagram** | System architecture and class relationships | 
| **Use Case Diagram** | User interactions and system functions |
| **Sequence Diagram** | Process flows and system interactions | 
| **Entity-Relationship Diagram** | Database structure and relationships | 
| **Wireframe Design** | Interface layout and navigation | 
| **System Architecture** | Overall system design | 

---

## 💻 Technology Stack

### **Frontend**
- **React Native** with **Expo SDK 49**
- **TypeScript** for type safety
- **React Navigation** for routing
- **React Context API** for state management
- **NativeWind** for styling (TailwindCSS for React Native)

### **Backend**
- **ASP.NET Core 7.0** Web API
- **Entity Framework Core** for database operations
- **SQL Server** / **SQLite** for data storage
- **JWT Authentication** for secure access

### **DevOps & Tools**
- **GitHub Actions** for CI/CD
- **GitHub Pages** for deployment
- **Expo Application Services (EAS)** for mobile builds
- **Jest** & **Testing Library** for testing

---

## 🏗️ Project Architecture

### **Frontend Architecture (React Native/Expo)**
```
Frontend/
├── app/                    # Main application structure
│   ├── auth/               # Authentication screens
│   │   ├── patient-login.tsx
│   │   ├── patient-register.tsx
│   │   └── staff-login.tsx
│   │
│   ├── doctor/             # Doctor-specific features
│   │   ├── appointments.tsx
│   │   ├── dashboard.tsx
│   │   ├── medical-records.tsx
│   │   └── patient-feedback.tsx
│   │
│   ├── patient/            # Patient-specific features
│   │   ├── book-appointment.tsx
│   │   ├── dashboard.tsx
│   │   ├── profile.tsx
│   │   ├── payments.tsx
│   │   └── feedback.tsx
│   │
│   └── services/           # API service layer
│       ├── api.ts          # HTTP client configuration
│       ├── patients.ts     # Patient-related API calls
│       ├── appointments.ts # Appointment API calls
│       ├── doctors.ts      # Doctor API calls
│       └── users.ts        # User and authentication APIs
│
├── components/             # Reusable UI components
├── constants/              # Application constants and configurations
├── contexts/               # React Context providers
├── hooks/                  # Custom React hooks
└── scripts/                # Build and utility scripts
```

### **Backend Architecture (ASP.NET Core)**
```
Backend/
├── Controllers/            # RESTful API controllers
│   ├── PatientsController.cs
│   ├── AppointmentsController.cs
│   ├── DoctorsController.cs
│   └── AuthenticationController.cs
│
├── Models/                 # Entity models and DTOs
│   ├── Patient.cs
│   ├── Appointment.cs
│   ├── Doctor.cs
│   └── User.cs
│
├── Services/               # Business logic layer
│   ├── PatientService.cs
│   ├── AppointmentService.cs
│   └── AuthenticationService.cs
│
├── FrontendServices/       # Services supporting frontend integration
├── Properties/             # Application configuration properties
├── Migrations/             # Entity Framework Core migrations
└── ApplicationDbContext.cs # Database context
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ & npm/yarn/bun
- Expo CLI (`npm install -g expo-cli`)
- .NET 7.0 SDK
- Git

### **1. Clone the repository:**
```bash
git clone https://github.com/Rodinaamr/Project_clinic.git
cd Project_clinic
```

### **2. Frontend Setup:**
```bash
# Install dependencies
npm install
# or
bun install

# Start development server
npx expo start
```

### **3. Backend Setup:**
```bash
cd Backend
dotnet restore
dotnet run
```

### **4. Run on Device:**
- Install **Expo Go** on your mobile device
- Scan QR code from terminal
- Or run on emulator:
  ```bash
  npx expo start --android
  npx expo start --ios
  ```

---

## 📱 Deployment

### **Web Deployment (GitHub Pages)**
The application is automatically deployed to GitHub Pages on each push to `main` branch.

**Live URL:** https://rodinasmr.github.io/Project_clinic/

### **Mobile Deployment**
```bash
# Publish to Expo
npx expo publish

# Build for production
eas build --platform android
eas build --platform ios
```

---

## 🧪 Testing

### **Run Tests:**
```bash
# Frontend tests
npm test

# Backend tests
cd Backend
dotnet test
```


---

## 📊 Project Management

### **GitHub Project Board**
- **📋 Backlog:** [View Backlog](https://github.com/Rodinaamr/Project_clinic/projects/1)
- **📝 Issues:** [Open Issues](https://github.com/Rodinaamr/Project_clinic/issues)
- **🔀 Pull Requests:** [PR List](https://github.com/Rodinaamr/Project_clinic/pulls)



## 🔧 Development Workflow

### **Git Branch Strategy:**
```
main
├── develop
│   ├── feature/authentication
│   ├── feature/appointments
│   └── bugfix/login-issue
└── release/v1.0
```

### **CI/CD Pipeline:**
```yaml
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - checkout code
      - install dependencies
      - run tests
      - build app
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - deploy to GitHub Pages
      - publish to Expo
```

---

## 🖼️ System Screenshots

<img width="1904" height="911" alt="Clinic System Dashboard" src="https://github.com/user-attachments/assets/3fd22ebb-4f72-4b94-902b-3452066fec40" />

<img width="1912" height="903" alt="Patient Management Interface" src="https://github.com/user-attachments/assets/5a25ea45-58a7-49a7-9540-1d08e96d1f21" />

<img width="1911" height="906" alt="Appointment Scheduling" src="https://github.com/user-attachments/assets/aabd5bc4-fca7-46ea-9466-184b0176f94a" />

---

## 🔮 Planned Enhancements
1. **Medication Database Integration**
   - Egyptian Medication Database integration
   - Drug interaction checker
   - Prescription templates

2. **Advanced Features**
   - Real-time notifications
   - Telemedicine capabilities
   - Analytics dashboard
   - Multi-language support

3. **Security Enhancements**
   - Two-factor authentication
   - Audit logging
   - Data encryption at rest

4. **Integration**
   - Electronic Health Records (EHR) standards
   - Lab system integration
   - Pharmacy connectivity

---

## ⚖️ Ethical Data Policy
This system follows a strict **edit-only data policy**, ensuring that medical records cannot be deleted.  
This preserves historical accuracy and aligns with ethical standards in healthcare information management.


### **Privacy Compliance:**
- HIPAA compliant data handling
- GDPR-ready for international patients
- Local data storage options

---

## 👥 Team & Development

### **Development Team:**
-  Rodayna Abdelrahman
-  Malak Salama
-  Malak Chaaban
-  Nour Abdelal
-  Eshraq Nabil



