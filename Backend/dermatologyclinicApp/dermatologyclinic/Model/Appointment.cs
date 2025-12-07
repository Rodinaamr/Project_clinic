namespace dermatologyclinicApp.Models
{
    public class Appointment
    {
        public int AppointmentID { get; set; }

        public int PatientID { get; set; }
        public Patient Patient { get; set; }

        public int DoctorID { get; set; }
        public Doctor Doctor { get; set; }

        public DateTime Date { get; set; }
        public TimeSpan StartingTime { get; set; }
        public TimeSpan EndingTime { get; set; }
        public string Status { get; set; }

        public ICollection<MedicalReport> MedicalReports { get; set; }
        public ICollection<Payment> Payments { get; set; }
        public ICollection<TreatmentReport> TreatmentReports { get; set; }
    }
}
