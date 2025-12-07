namespace YourProject.Models
{
    public class Payment
    {
        public int PaymentID { get; set; }

        public int AppointmentID { get; set; }
        public Appointment Appointment { get; set; }

        public int PatientID { get; set; }
        public Patient Patient { get; set; }

        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
    }
}
