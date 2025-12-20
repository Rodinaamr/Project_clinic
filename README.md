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

