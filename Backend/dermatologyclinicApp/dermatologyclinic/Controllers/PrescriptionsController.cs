using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrescriptionsController : ControllerBase
    {
        private readonly IPrescriptionRepository _repository;

        public PrescriptionsController(IPrescriptionRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prescription>>> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Prescription>> GetById(int id)
        {
            var prescription = await _repository.GetByIdAsync(id);
            if (prescription == null)
                return NotFound();
            return Ok(prescription);
        }

        [HttpPost]
        public async Task<ActionResult<Prescription>> Create(Prescription prescription)
        {
            await _repository.AddAsync(prescription);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = prescription.Id }, prescription);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Prescription prescription)
        {
            if (id != prescription.Id)
                return BadRequest();

            _repository.Update(prescription);
            await _repository.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var prescription = await _repository.GetByIdAsync(id);
            if (prescription == null)
                return NotFound();

            _repository.Remove(prescription);
            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}

