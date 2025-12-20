using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;

namespace dermatologyclinicApp.Repositories
{
    public class PaymentRepository : GenericRepository<Payment>, IPaymentRepository
    {
        public PaymentRepository(ApplicationDbContext context) : base(context) { }
    }
}
