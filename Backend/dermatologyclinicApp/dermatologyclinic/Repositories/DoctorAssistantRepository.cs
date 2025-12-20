using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;

namespace dermatologyclinicApp.Repositories
{
    public class DoctorAssistantRepository : GenericRepository<DoctorAssistant>, IDoctorAssistantRepository
    {
        public DoctorAssistantRepository(ApplicationDbContext context) : base(context) { }
    }
}
