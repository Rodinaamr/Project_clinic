using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbacksController : ControllerBase
    {
        private readonly IFeedbackRepository _repository;

        public FeedbacksController(IFeedbackRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("doctor/{doctorId}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetByDoctorId(int doctorId)
        {
            var feedbacks = await _repository.GetAllAsync();
            return Ok(System.Linq.Enumerable.Where(feedbacks, f => f.DoctorId == doctorId));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> GetById(int id)
        {
            var feedback = await _repository.GetByIdAsync(id);
            if (feedback == null)
                return NotFound();
            return Ok(feedback);
        }

        [HttpPost]
        public async Task<ActionResult<Feedback>> Create(Feedback feedback)
        {
            await _repository.AddAsync(feedback);
            await _repository.SaveChangesAsync();
            // Assuming Feedback has an Id property. Need to check model if it differs, usually Id.
            return CreatedAtAction(nameof(GetById), new { id = feedback.Id }, feedback);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Feedback feedback)
        {
            if (id != feedback.Id)
                return BadRequest();

            _repository.Update(feedback);
            await _repository.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var feedback = await _repository.GetByIdAsync(id);
            if (feedback == null)
                return NotFound();

            _repository.Remove(feedback);
            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}

