# Dermatology Clinic - Backend & Frontend Integration

## Quick Start Guide

### 1. Start the Backend
Double-click `start-backend.bat` or run:
```bash
cd Backend/dermatologyclinicApp/dermatologyclinic
dotnet run
```

The backend will be available at: `http://localhost:5148`
Swagger UI: `http://localhost:5148/swagger`

### 2. Start the Frontend
```bash
npm start
```

## API Integration

The frontend is now connected to the backend via the API service layer in `app/services/api.ts`.

### Available API Services:

- **doctorApi** - Doctor management
- **patientApi** - Patient management  
- **appointmentApi** - Appointment scheduling
- **assistantApi** - Assistant management
- **feedbackApi** - Feedback system
- **medicalReportApi** - Medical reports
- **medicationApi** - Medication management
- **paymentApi** - Payment processing
- **prescriptionApi** - Prescriptions
- **treatmentReportApi** - Treatment reports

### Example Usage in React Native:

```typescript
import api from '@/app/services/api';

// Get all doctors
const doctors = await api.doctor.getAll();

// Create appointment
const appointment = await api.appointment.create({
  patientId: 1,
  doctorId: 2,
  date: '2024-12-08',
  startingTime: '10:00',
  endingTime: '11:00',
  status: 'Scheduled'
});

// Search patients
const patients = await api.patient.search('John');
```

## Auto-Start Backend on System Boot (Optional)

### Windows:
1. Press `Win + R`, type `shell:startup`, press Enter
2. Create a shortcut to `start-backend.bat` in the Startup folder
3. The backend will now start automatically when you log in

## Configuration

### Backend URL
Edit `app/services/apiClient.ts` to change the backend URL:
```typescript
const API_BASE_URL = 'http://localhost:5148/api';
```

For production, change to your deployed backend URL.

## Troubleshooting

### Backend not starting?
- Ensure .NET 8.0 SDK is installed
- Check if port 5148 is available
- Run `dotnet build` to check for errors

### Frontend can't connect?
- Verify backend is running at `http://localhost:5148`
- Check CORS is enabled in `Program.cs`
- Ensure axios is installed: `npm install axios`

### Database issues?
- Run migrations: `dotnet ef database update`
- Check connection string in `appsettings.json`
