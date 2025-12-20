using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorAssistantsController : ControllerBase
    {
        private readonly IDoctorAssistantRepository _repository;

        public DoctorAssistantsController(IDoctorAssistantRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorAssistant>>> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorAssistant>> GetById(int id)
        {
            var doctorAssistant = await _repository.GetByIdAsync(id);
            if (doctorAssistant == null)
                return NotFound();
            return Ok(doctorAssistant);
        }

        [HttpPost]
        public async Task<ActionResult<DoctorAssistant>> Create(DoctorAssistant doctorAssistant)
        {
            await _repository.AddAsync(doctorAssistant);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = doctorAssistant.Id }, doctorAssistant);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var doctorAssistant = await _repository.GetByIdAsync(id);
            if (doctorAssistant == null)
                return NotFound();

            _repository.Remove(doctorAssistant);
            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}
