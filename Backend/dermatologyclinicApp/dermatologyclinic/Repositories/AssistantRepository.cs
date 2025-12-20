using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;

namespace dermatologyclinicApp.Repositories
{
    public class AssistantRepository : GenericRepository<Assistant>, IAssistantRepository
    {
        public AssistantRepository(ApplicationDbContext context) : base(context) { }
    }
}
