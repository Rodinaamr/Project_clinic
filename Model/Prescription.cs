using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dermatologyclinicApp.Models
{
    public class Prescription
    {
        [Key]
        public int Id { get; set; }

        public DateTime PrescriptionDate { get; set; } = DateTime.Now;

        public string? Instructions { get; set; }

        public int PatientId { get; set; }
        public int DoctorId { get; set; }

        [ForeignKey("PatientId")]
        public virtual Patient? Patient { get; set; }

        [ForeignKey("DoctorId")]
        public virtual Doctor? Doctor { get; set; }

        // Many-to-many with Medications
        public virtual ICollection<Medication>? Medications { get; set; }
    }
}