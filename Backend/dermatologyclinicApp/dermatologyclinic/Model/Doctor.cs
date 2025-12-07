using System;
using System.Collections.Generic;

namespace dermatologyclinicApp.Models
{
    public class Doctor
    {
        public int DoctorID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public string Speciality { get; set; }

        public ICollection<Appointment> Appointments { get; set; }
        public ICollection<DoctorAssistant> DoctorAssistants { get; set; }
        public ICollection<DoctorNurse> DoctorNurses { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; }
    }
}
