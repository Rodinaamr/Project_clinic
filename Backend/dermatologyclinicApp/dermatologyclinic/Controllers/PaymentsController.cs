using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentRepository _repository;

        public PaymentsController(IPaymentRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("patient/{patientId}")]
        public async Task<ActionResult<IEnumerable<Payment>>> GetByPatientId(int patientId)
        {
            var payments = await _repository.GetAllAsync();
            return Ok(System.Linq.Enumerable.Where(payments, p => p.PatientId == patientId));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Payment>> GetById(int id)
        {
            var payment = await _repository.GetByIdAsync(id);
            if (payment == null)
                return NotFound();
            return Ok(payment);
        }

        [HttpPost]
        public async Task<ActionResult<Payment>> Create(Payment payment)
        {
            await _repository.AddAsync(payment);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = payment.Id }, payment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Payment payment)
        {
            if (id != payment.Id)
                return BadRequest();

            _repository.Update(payment);
            await _repository.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var payment = await _repository.GetByIdAsync(id);
            if (payment == null)
                return NotFound();

            _repository.Remove(payment);
            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}

