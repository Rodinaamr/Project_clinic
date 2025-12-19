using dermatologyclinicApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Repositories.Interfaces
{
    public interface IDoctorRepository : IGenericRepository<Doctor>
    {
        Task<IEnumerable<Doctor>> GetDoctorsBySpecialityAsync(string speciality);
        Task<Doctor?> GetDoctorWithDetailsAsync(int id);
        Task<IEnumerable<Doctor>> GetAvailableDoctorsAsync(DateTime date, TimeSpan startTime, TimeSpan endTime);
    }
}