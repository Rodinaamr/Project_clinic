namespace dermatologyclinicApp.Models
{
    public class Assistant
    {
        public int AssistantID { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }

        public ICollection<DoctorAssistant> DoctorAssistants { get; set; }
    }
}
