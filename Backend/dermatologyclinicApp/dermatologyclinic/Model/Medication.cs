namespace dermatologyclinicApp.Models

{
    public class Medication
    {
        public int DrugID { get; set; }

        public string Name { get; set; }
        public string Company { get; set; }
        public string Notes { get; set; }
        public string DrugType { get; set; }   

        public ICollection<Prescription> Prescriptions { get; set; }
    }
}

