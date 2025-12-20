using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentReportsController : ControllerBase
    {
        private readonly ITreatmentReportRepository _repository;

        public TreatmentReportsController(ITreatmentReportRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TreatmentReport>>> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TreatmentReport>> GetById(int id)
        {
            var report = await _repository.GetByIdAsync(id);
            if (report == null)
                return NotFound();
            return Ok(report);
        }

        [HttpPost]
        public async Task<ActionResult<TreatmentReport>> Create(TreatmentReport report)
        {
            await _repository.AddAsync(report);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = report.Id }, report);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TreatmentReport report)
        {
            if (id != report.Id)
                return BadRequest();

            _repository.Update(report);
            await _repository.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var report = await _repository.GetByIdAsync(id);
            if (report == null)
                return NotFound();

            _repository.Remove(report);
            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}

