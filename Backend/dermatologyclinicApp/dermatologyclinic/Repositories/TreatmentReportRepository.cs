using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;

namespace dermatologyclinicApp.Repositories
{
    public class TreatmentReportRepository : GenericRepository<TreatmentReport>, ITreatmentReportRepository
    {
        public TreatmentReportRepository(ApplicationDbContext context) : base(context) { }
    }
}
