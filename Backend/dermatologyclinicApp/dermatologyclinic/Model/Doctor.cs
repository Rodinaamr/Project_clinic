using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace dermatologyclinicApp.Models
{
    public class Doctor
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        public string? Specialization { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? LicenseNumber { get; set; }
        public int? YearsOfExperience { get; set; }
        public string? Bio { get; set; }
        [Required]
        public string Password { get; set; } = string.Empty;

        // Navigation properties
        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public virtual ICollection<Prescription> Prescriptions { get; set; } = new List<Prescription>();
        public virtual ICollection<MedicalReport> MedicalReports { get; set; } = new List<MedicalReport>();
    }
}
