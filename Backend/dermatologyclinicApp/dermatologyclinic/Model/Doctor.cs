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

        // Navigation properties
        public virtual ICollection<Appointment>? Appointments { get; set; }
        public virtual ICollection<Prescription>? Prescriptions { get; set; }
        public virtual ICollection<MedicalReport>? MedicalReports { get; set; }
    }
}