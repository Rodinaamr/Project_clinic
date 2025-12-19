using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Repositories
{
    public class AppointmentRepository : GenericRepository<Appointment>, IAppointmentRepository
    {
        public AppointmentRepository(ApplicationDbContext context) : base(context) { }

        public async Task<bool> HasConflictAsync(int? doctorId, DateTime start, DateTime end, int? excludeAppointmentId = null)
        {
            if (doctorId == null) return false;

            var query = _context.Appointments
                .Where(a => a.DoctorId == doctorId
                    && a.Status != "Cancelled");

            if (excludeAppointmentId.HasValue)
            {
                query = query.Where(a => a.Id != excludeAppointmentId.Value);
            }

            // Client side evaluation might be needed if EF Core can't translate AddMinutes
            // But usually simple date comparisons are fine.
            // However, Duration is a property in DB.
            // Overlap logic: (StartA < EndB) and (EndA > StartB)
            
            // We need to fetch candidates and check in memory if EF fails to translate AddMinutes with column.
            // Or simpler check if we assume fixed slots.
            // Let's try to query for same day first to reduce set.
            
            var appointments = await query
                .Where(a => a.AppointmentDate.Date == start.Date) 
                .ToListAsync();

            return appointments.Any(a => 
            {
                var aStart = a.AppointmentDate;
                var aEnd = a.AppointmentDate.AddMinutes(a.Duration);
                return start < aEnd && end > aStart;
            });
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByDateAsync(DateTime date)
        {
            return await _context.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .Where(a => a.AppointmentDate.Date == date.Date)
                .OrderBy(a => a.AppointmentDate)
                .ToListAsync();
        }
    }
}
