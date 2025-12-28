# 🏥 Dermatology Clinic Management System

A comprehensive clinical management platform featuring a **React Native (Expo)** mobile/web application and a **.NET Core Web API** backend. Designed to streamline patient care, appointment scheduling, and clinical workflows for dermatologists.

## 🚀 Project Overview

This project is a full-stack solution for dermatology clinics, providing specialized interfaces for Doctors, Patients, and Clinic Assistants.

### Key Features
- **Doctor Dashboard**: Manage patient records, appointment summaries, and treatment plans.
- **Patient Portal**: Book appointments, view prescriptions, and track treatment progress.
- **Assistant Tools**: Handle check-ins, scheduling, and administrative tasks.
- **Real-time Integration**: Seamless communication between the frontend and the .NET backend API.

---

## 🏗️ Project Structure

The repository is divided into two main parts:

| Component | Technology | Directory |
| :--- | :--- | :--- |
| **Frontend** | React Native + Expo | `/` (Root) |
| **Backend** | .NET Core + Entity Framework | `/Backend/dermatologyclinicApp` |

---

## 🛠️ Getting Started

### 1. Backend Setup (.NET)
1. Navigate to the backend directory:
   ```powershell
   cd Backend/dermatologyclinicApp
   ```
2. Restore dependencies:
   ```powershell
   dotnet restore
   ```
3. Update the database (ensure SQL Server is running):
   ```powershell
   dotnet ef database update
   ```
4. Start the API:
   ```powershell
   dotnet run --project dermatologyclinic
   ```

### 2. Frontend Setup (Expo)
1. Stay in the root directory and install dependencies:
   ```powershell
   npm install
   ```
2. Start the development server:
   ```powershell
   npx expo start
   ```
3. Open on your device or emulator via the Expo Go app.

---

## 🤝 Contributing

We are an organization-driven clinical project. To contribute:
1. Check the [CONTRIBUTING.md](./CONTRIBUTING.md) guide.
2. Ensure you follow our coding standards for both C# and TypeScript.
3. Submit a Pull Request for any features or bug fixes.

---

## 📄 License
This project is for internal clinic use and authorized collaborators.

---
*Created by the Dermatology Clinic Dev Team.*
