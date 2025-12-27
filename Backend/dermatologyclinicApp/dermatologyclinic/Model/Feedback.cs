using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dermatologyclinicApp.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Comment { get; set; } = string.Empty;
        [Range(1, 5)]
        public int Rating { get; set; }
        public DateTime FeedbackDate { get; set; } = DateTime.Now;
        public int PatientId { get; set; }
        public int? DoctorId { get; set; }
        [ForeignKey("PatientId")]
        public virtual Patient? Patient { get; set; }
        [ForeignKey("DoctorId")]
        public virtual Doctor? Doctor { get; set; }
    }
}

