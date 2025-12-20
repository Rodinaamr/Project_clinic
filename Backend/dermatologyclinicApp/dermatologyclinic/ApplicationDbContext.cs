using Microsoft.EntityFrameworkCore;

namespace dermatologyclinicApp.Models
{
    public class ApplicationDbContext : DbContext
    {
        // Only this constructor - NO OnConfiguring method
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets for all models
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Assistant> Assistants { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<MedicalReport> MedicalReports { get; set; }
        public DbSet<Medication> Medications { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Feedback> Feedback { get; set; }
        public DbSet<TreatmentReport> TreatmentReports { get; set; }
        public DbSet<DoctorAssistant> DoctorAssistants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Patient configuration
            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.FirstName).HasMaxLength(100).IsRequired();
                entity.Property(p => p.LastName).HasMaxLength(100).IsRequired();
                entity.Property(p => p.Email).HasMaxLength(200);
                entity.Property(p => p.Phone).HasMaxLength(50);
                entity.Property(p => p.Address).HasMaxLength(1000);
                entity.Property(p => p.Password).HasMaxLength(255).IsRequired();
                entity.Property(p => p.DateOfBirth);
            });

            // Doctor configuration
            modelBuilder.Entity<Doctor>(entity =>
            {
                entity.HasKey(d => d.Id);
                entity.Property(d => d.FirstName).HasMaxLength(100).IsRequired();
                entity.Property(d => d.LastName).HasMaxLength(100).IsRequired();
                entity.Property(d => d.Specialization).HasMaxLength(200);
                entity.Property(d => d.Email).HasMaxLength(200);
                entity.Property(d => d.Phone).HasMaxLength(50);
                entity.Property(d => d.Password).HasMaxLength(255).IsRequired();
            });

            // Appointment configuration
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(a => a.Id);

                // Relationships
                entity.HasOne(a => a.Patient)
                      .WithMany(p => p.Appointments)
                      .HasForeignKey(a => a.PatientId)
                      .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(a => a.Doctor)
                      .WithMany(d => d.Appointments)
                      .HasForeignKey(a => a.DoctorId)
                      .OnDelete(DeleteBehavior.SetNull);

                entity.Property(a => a.Status).HasMaxLength(100);
                entity.Property(a => a.Notes).HasMaxLength(2000);
                entity.Property(a => a.AppointmentDate).IsRequired();
            });

            // Other configurations can remain as you had them...

            Console.WriteLine("? Database model configured successfully");
        }
    }
}
