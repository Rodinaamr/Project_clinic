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

## 📋 Overview
The **Clinic Management System** is a cross-platform application developed to streamline clinic operations and enhance coordination between doctors and receptionists.  
The system enables efficient management of appointments, patient histories, diagnoses, and payments while maintaining ethical standards and data integrity in healthcare.

---

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



