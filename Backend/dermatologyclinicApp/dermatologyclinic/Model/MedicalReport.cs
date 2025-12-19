using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dermatologyclinicApp.Models
{
    public class MedicalReport
    {
        [Key]
        public int Id { get; set; }
<<<<<<< HEAD
        [Required]
        public string Diagnosis { get; set; } = string.Empty;
        public string? TreatmentPlan { get; set; }
        public string? Notes { get; set; }
        public DateTime ReportDate { get; set; } = DateTime.Now;
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        [ForeignKey("PatientId")]
        public virtual Patient? Patient { get; set; }
=======

        [Required]
        public string Diagnosis { get; set; } = string.Empty;

        public string? TreatmentPlan { get; set; }
        public string? Notes { get; set; }

        public DateTime ReportDate { get; set; } = DateTime.Now;

        public int PatientId { get; set; }
        public int DoctorId { get; set; }

        [ForeignKey("PatientId")]
        public virtual Patient? Patient { get; set; }

>>>>>>> origin/main
        [ForeignKey("DoctorId")]
        public virtual Doctor? Doctor { get; set; }
    }
}