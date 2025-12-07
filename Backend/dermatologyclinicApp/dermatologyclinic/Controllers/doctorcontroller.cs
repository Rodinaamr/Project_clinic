using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using DermatologyClinic.Models;    
using Newtonsoft.Json;

namespace DermatologyClinic.Controllers
{
    public class DoctorsController
    {
      
        public DoctorData Data { get; private set; }

       
        public void LoadDoctors()
        {
            string path = "D:\\DermatologyClinic\\Assets\\Json\\doctors.json";
            // <-- change to your real path

            if (!File.Exists(path))
            {
                throw new FileNotFoundException("The JSON file was not found at the specified path.");
            }

            // Read the file
            string json = File.ReadAllText(path);

            // Deserialize
            Data = JsonConvert.DeserializeObject<DoctorData>(json);

            if (Data == null || Data.Doctors == null || !Data.Doctors.Any())
            {
                throw new InvalidDataException("No doctor data found in the JSON file.");
            }
        }

        // Example method: Find doctor by name
        public Doctor GetDoctorByName(string name)
        {
            if (Data == null || Data.Doctors == null)
            {
                throw new InvalidOperationException("Doctor data is not loaded. Call LoadDoctors() first.");
            }

            return Data.Doctors
                       .FirstOrDefault(d => d.FullName.Equals(name, StringComparison.OrdinalIgnoreCase));
        }

        // Example method: Get doctor by ID
        public Doctor GetDoctorById(string id)
        {
            if (Data == null || Data.Doctors == null)
            {
                throw new InvalidOperationException("Doctor data is not loaded. Call LoadDoctors() first.");
            }

            return Data.Doctors.FirstOrDefault(d => d.Id == id);
        }
    }
}

