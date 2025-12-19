using dermatologyclinicApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Repositories.Interfaces
{
    public interface IPatientRepository : IGenericRepository<Patient>
    {
        Task<Patient?> GetPatientByEmailAsync(string email);

        Task<Patient?> GetPatientWithDetailsAsync(int id);
        Task<IEnumerable<Patient>> SearchPatientsAsync(string searchTerm);
    }
}