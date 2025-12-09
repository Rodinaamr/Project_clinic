using System.ComponentModel.DataAnnotations;

namespace dermatologyclinicApp.Models
{
    public class Assistant
    {
        [Key]
        public int Id { get; set; } // ADD THIS LINE

        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Role { get; set; }
    }
}