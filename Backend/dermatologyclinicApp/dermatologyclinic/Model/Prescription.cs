namespace dermatologyclinicApp.Models
{
    public class Prescription
    {
        public int ID { get; set; }

        public int ReportID { get; set; }
        public MedicalReport MedicalReport { get; set; }

        public int DrugID { get; set; }
        public Medication Medication { get; set; }

        public string Dosage { get; set; }
    }
}

