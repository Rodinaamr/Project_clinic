namespace dermatologyclinicApp.Models
{
    public class Patient
    {
        public int PatientID { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string NationalID { get; set; }
        public string EmergencyPhone { get; set; }
        public string CaseDescription { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }

        public ICollection<Appointment> Appointments { get; set; }
        public ICollection<MedicalReport> MedicalReports { get; set; }
        public ICollection<TreatmentReport> TreatmentReports { get; set; }
        public ICollection<Payment> Payments { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; }
    }
}

