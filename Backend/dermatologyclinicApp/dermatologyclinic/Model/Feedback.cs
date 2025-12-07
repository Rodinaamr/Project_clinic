namespace dermatologyclinicApp.Models
{
    public class Feedback
    {
        public int FeedbackID { get; set; }

        public int PatientID { get; set; }
        public Patient Patient { get; set; }

        public int DoctorID { get; set; }
        public Doctor Doctor { get; set; }

        public int Rating { get; set; }  // 1–5
        public string Comment { get; set; }
    }
}

