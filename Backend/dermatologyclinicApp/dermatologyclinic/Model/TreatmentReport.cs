using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dermatologyclinicApp.Models
{
    public class TreatmentReport
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string TreatmentType { get; set; } = string.Empty; // Laser, Chemical Peel, etc.

        public string? Description { get; set; }
        public DateTime TreatmentDate { get; set; } = DateTime.Now;
        public string? Results { get; set; }

        public int PatientId { get; set; }
        public int DoctorId { get; set; }

        [ForeignKey("PatientId")]
        public virtual Patient? Patient { get; set; }

        [ForeignKey("DoctorId")]
        public virtual Doctor? Doctor { get; set; }
    }
}