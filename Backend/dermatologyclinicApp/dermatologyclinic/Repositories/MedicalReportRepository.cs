using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;

namespace dermatologyclinicApp.Repositories
{
    public class MedicalReportRepository : GenericRepository<MedicalReport>, IMedicalReportRepository
    {
        public MedicalReportRepository(ApplicationDbContext context) : base(context) { }
    }
}
