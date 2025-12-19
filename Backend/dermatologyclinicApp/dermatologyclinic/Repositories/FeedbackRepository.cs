using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;

namespace dermatologyclinicApp.Repositories
{
    public class FeedbackRepository : GenericRepository<Feedback>, IFeedbackRepository
    {
        public FeedbackRepository(ApplicationDbContext context) : base(context) { }
    }
}
