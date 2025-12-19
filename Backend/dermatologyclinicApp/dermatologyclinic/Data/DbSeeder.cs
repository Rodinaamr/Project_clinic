using dermatologyclinic.Model;
using Microsoft.EntityFrameworkCore;

namespace dermatologyclinic.Data
{
    public static class DbSeeder
    {
        public static async Task SeedData(ApplicationDbContext context)
        {
            // Check if data already exists
            if (await context.Doctors.AnyAsync())
            {
                return; // Database already seeded
            }

            // Create Doctors
            var doctor1 = new Doctor
            {
                FirstName = "Wahid",
                LastName = "Lotfy",
                Email = "dr.wahid@clinic.com",
                Phone = "01234567890",
                Specialization = "Dermatology",
                LicenseNumber = "DRM12345",
                YearsOfExperience = 15,
                Bio = "Specialist in Dermatology and Aesthetic Medicine"
            };

            var doctor2 = new Doctor
            {
                FirstName = "Sarah",
                LastName = "Ahmed",
                Email = "dr.sarah@clinic.com",
                Phone = "01234567891",
                Specialization = "Dermatology",
                LicenseNumber = "DRM12346",
                YearsOfExperience = 10,
                Bio = "Expert in skin treatments"
            };

            context.Doctors.AddRange(doctor1, doctor2);
            await context.SaveChangesAsync();

            // Create Patients
            var patient1 = new Patient
            {
                FirstName = "Ahmed",
                LastName = "Hassan",
                Email = "ahmed@example.com",
                Phone = "01111111111",
                DateOfBirth = new DateTime(1990, 5, 15),
                Gender = "Male",
                NationalId = "29005151234567",
                Address = "Cairo, Egypt",
                BloodType = "A+",
                EmergencyContact = "01111111112"
            };

            var patient2 = new Patient
            {
                FirstName = "Fatima",
                LastName = "Ali",
                Email = "fatima@example.com",
                Phone = "01222222222",
                DateOfBirth = new DateTime(1985, 8, 20),
                Gender = "Female",
                NationalId = "28508201234567",
                Address = "Alexandria, Egypt",
                BloodType = "O+",
                EmergencyContact = "01222222223"
            };

            var patient3 = new Patient
            {
                FirstName = "Mohamed",
                LastName = "Ibrahim",
                Email = "mohamed@example.com",
                Phone = "01333333333",
                DateOfBirth = new DateTime(1995, 3, 10),
                Gender = "Male",
                NationalId = "29503101234567",
                Address = "Giza, Egypt",
                BloodType = "B+",
                EmergencyContact = "01333333334"
            };

            context.Patients.AddRange(patient1, patient2, patient3);
            await context.SaveChangesAsync();

            // Create Appointments for TODAY
            var today = DateTime.Today;
            
            var appointment1 = new Appointment
            {
                PatientId = patient1.Id,
                DoctorId = doctor1.Id,
                AppointmentDate = today.AddHours(10), // 10:00 AM
                Duration = 30,
                Status = "Scheduled",
                Notes = "Regular checkup",
                IsEmergency = false
            };

            var appointment2 = new Appointment
            {
                PatientId = patient2.Id,
                DoctorId = doctor1.Id,
                AppointmentDate = today.AddHours(11), // 11:00 AM
                Duration = 30,
                Status = "Scheduled",
                Notes = "Follow-up visit",
                IsEmergency = false
            };

            var appointment3 = new Appointment
            {
                PatientId = patient3.Id,
                DoctorId = doctor2.Id,
                AppointmentDate = today.AddHours(14), // 2:00 PM
                Duration = 45,
                Status = "Scheduled",
                Notes = "Emergency consultation",
                IsEmergency = true
            };

            // Add some completed appointments
            var appointment4 = new Appointment
            {
                PatientId = patient1.Id,
                DoctorId = doctor1.Id,
                AppointmentDate = today.AddDays(-1).AddHours(10),
                Duration = 30,
                Status = "Completed",
                Notes = "Completed visit",
                IsEmergency = false
            };

            context.Appointments.AddRange(appointment1, appointment2, appointment3, appointment4);
            await context.SaveChangesAsync();

            // Create Assistants
            var assistant1 = new Assistant
            {
                FirstName = "Nour",
                LastName = "Mahmoud",
                Email = "nour@clinic.com",
                Phone = "01444444444",
                HireDate = DateTime.Now.AddYears(-2)
            };

            context.Assistants.Add(assistant1);
            await context.SaveChangesAsync();

            // Create Payments
            var payment1 = new Payment
            {
                PatientId = patient1.Id,
                AppointmentId = appointment4.Id,
                Amount = 500,
                PaymentDate = DateTime.Now.AddDays(-1),
                PaymentMethod = "Cash",
                Status = "Completed"
            };

            var payment2 = new Payment
            {
                PatientId = patient2.Id,
                AppointmentId = appointment2.Id,
                Amount = 600,
                PaymentDate = DateTime.Now,
                PaymentMethod = "Card",
                Status = "Pending"
            };

            context.Payments.AddRange(payment1, payment2);
            await context.SaveChangesAsync();

            Console.WriteLine("✅ Database seeded successfully!");
        }
    }
}
