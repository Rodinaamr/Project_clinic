namespace dermatologyclinicApp.Models

{
    public class MedicalReport
    {
        public int ReportID { get; set; }

        public int PatientID { get; set; }
        public Patient Patient { get; set; }

        public int AppointmentID { get; set; }
        public Appointment Appointment { get; set; }

        public string Diagnosis { get; set; }
        public DateTime Date { get; set; }

        public ICollection<Prescription> Prescriptions { get; set; }
    }
}

