using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicationsController : ControllerBase
    {
        private readonly IMedicationRepository _repository;

        public MedicationsController(IMedicationRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Medication>>> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Medication>> GetById(int id)
        {
            var medication = await _repository.GetByIdAsync(id);
            if (medication == null)
                return NotFound();
            return Ok(medication);
        }

        [HttpPost]
        public async Task<ActionResult<Medication>> Create(Medication medication)
        {
            await _repository.AddAsync(medication);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = medication.Id }, medication);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Medication medication)
        {
            if (id != medication.Id)
                return BadRequest();

            _repository.Update(medication);
            await _repository.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var medication = await _repository.GetByIdAsync(id);
            if (medication == null)
                return NotFound();

            _repository.Remove(medication);
            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}
