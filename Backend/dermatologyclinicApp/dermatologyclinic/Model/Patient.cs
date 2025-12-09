using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace dermatologyclinicApp.Models
{
    public class Patient
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? FirstName { get; set; } = string.Empty; // Add ?

        [Required]
        public string? LastName { get; set; } = string.Empty; // Add ?

        public string? Email { get; set; }
        public string? Phone { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Address { get; set; }

        // Navigation properties
        public virtual ICollection<Appointment>? Appointments { get; set; }
        public virtual ICollection<MedicalReport>? MedicalReports { get; set; }
        public virtual ICollection<Prescription>? Prescriptions { get; set; }
    }
}