using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;

namespace dermatologyclinicApp.Repositories
{
    public class PrescriptionRepository : GenericRepository<Prescription>, IPrescriptionRepository
    {
        public PrescriptionRepository(ApplicationDbContext context) : base(context) { }
    }
}
