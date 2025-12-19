using dermatologyclinicApp.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Repositories.Interfaces
{
    public interface IAppointmentRepository : IGenericRepository<Appointment>
    {
        Task<bool> HasConflictAsync(int? doctorId, DateTime start, DateTime end, int? excludeAppointmentId = null);
        Task<IEnumerable<Appointment>> GetAppointmentsByDateAsync(DateTime date);
    }
}