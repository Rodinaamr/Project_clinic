using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dermatologyclinicApp.Models
{
    public class Appointment
    {
        [Key]
<<<<<<< HEAD
        public int Id { get; set; }
        [Required]
        public DateTime AppointmentDate { get; set; }
        
        // Duration in minutes
        public int Duration { get; set; } = 30;

        [Required]
        public string? Status { get; set; } = "Scheduled";
        public string? Notes { get; set; }
        public int? PatientId { get; set; }
        public int? DoctorId { get; set; }
        [ForeignKey("PatientId")]
        public virtual Patient? Patient { get; set; }
=======
        public int Id { get; set; }  // ADD THIS LINE

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        public string? Status { get; set; } = "Scheduled"; // Add ? to make nullable

        public string? Notes { get; set; }

        // Foreign Keys
        public int? PatientId { get; set; } // Make nullable
        public int? DoctorId { get; set; }  // Make nullable

        // Navigation Properties (make them nullable)
        [ForeignKey("PatientId")]
        public virtual Patient? Patient { get; set; }

>>>>>>> origin/main
        [ForeignKey("DoctorId")]
        public virtual Doctor? Doctor { get; set; }
    }
}