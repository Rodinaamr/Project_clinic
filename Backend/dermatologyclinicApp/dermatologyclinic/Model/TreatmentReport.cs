namespace dermatologyclinicApp.Models
{
    public class TreatmentReport
    {
        public int ID { get; set; }

        public int PatientID { get; set; }
        public Patient Patient { get; set; }

        public int AppointmentID { get; set; }
        public Appointment Appointment { get; set; }

        public string Type { get; set; }
        public string Summary { get; set; }
    }
}

