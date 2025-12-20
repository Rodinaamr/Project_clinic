using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Repositories
{
    public class DoctorRepository : GenericRepository<Doctor>, IDoctorRepository
    {
        public DoctorRepository(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<Doctor>> GetDoctorsBySpecialityAsync(string speciality)
        {
            return await _context.Doctors
                .Where(d => d.Specialization == speciality)
                .OrderBy(d => d.LastName)
                .ThenBy(d => d.FirstName)
                .ToListAsync();
        }

        public async Task<Doctor?> GetDoctorWithDetailsAsync(int id)
        {
            return await _context.Doctors
                .Include(d => d.Appointments)
                .Include(d => d.Prescriptions)
                .Include(d => d.MedicalReports)
                .FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<IEnumerable<Doctor>> GetAvailableDoctorsAsync(DateTime date, TimeSpan startTime, TimeSpan endTime)
        {
            // Simplified availability check: Check if doctor has any appointment on that date/time.
            // Assuming appointments take up the slot defined by startTime
             var busyDoctorIds = await _context.Appointments
                .Where(a => a.AppointmentDate.Date == date.Date
                    && a.Status != "Cancelled"
                    // Check if there's an appointment at the same time (ignoring duration for now as undefined in model)
                    && a.AppointmentDate.TimeOfDay == startTime)
                .Select(a => a.DoctorId)
                .Distinct()
                .ToListAsync();

            // Handle nullable int? conversion manually or filter out nulls
            var busyIds = busyDoctorIds.Where(id => id.HasValue).Select(id => id.Value).ToList();

            return await _context.Doctors
                .Where(d => !busyIds.Contains(d.Id))
                .ToListAsync();
        }
    }
}
