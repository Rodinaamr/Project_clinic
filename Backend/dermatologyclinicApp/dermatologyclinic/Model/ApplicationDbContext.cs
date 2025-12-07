using System.Collections.Generic;
using dermatologyclinicApp.Models;
using Microsoft.EntityFrameworkCore;

namespace dermatologyclinicApp.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Assistant> Assistants { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<MedicalReport> MedicalReports { get; set; }
        public DbSet<Medication> Medications { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Feedback> Feedback { get; set; }
        public DbSet<TreatmentReport> TreatmentReports { get; set; }
        public DbSet<DoctorAssistant> DoctorAssistants { get; set; }
    }
}

