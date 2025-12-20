using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;

namespace dermatologyclinicApp.Repositories
{
    public class MedicationRepository : GenericRepository<Medication>, IMedicationRepository
    {
        public MedicationRepository(ApplicationDbContext context) : base(context) { }
    }
}
