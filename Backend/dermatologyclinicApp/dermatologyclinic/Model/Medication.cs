using System.ComponentModel.DataAnnotations;

namespace dermatologyclinicApp.Models
{
    public class Medication
    {
        [Key]
        public int Id { get; set; }
<<<<<<< HEAD
        [Required]
        public string Name { get; set; } = string.Empty;
=======

        [Required]
        public string Name { get; set; } = string.Empty;

>>>>>>> origin/main
        public string? Dosage { get; set; }
        public string? Instructions { get; set; }
        public decimal Price { get; set; }
    }
}