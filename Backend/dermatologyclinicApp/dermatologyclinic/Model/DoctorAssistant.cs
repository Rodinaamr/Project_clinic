using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dermatologyclinicApp.Models
{
    public class DoctorAssistant
    {
        [Key]
        public int Id { get; set; }
        public int DoctorId { get; set; }
        public int AssistantId { get; set; }

        [ForeignKey("DoctorId")]
        public virtual Doctor? Doctor { get; set; }
        [ForeignKey("AssistantId")]
        public virtual Assistant? Assistant { get; set; }
    }
}
