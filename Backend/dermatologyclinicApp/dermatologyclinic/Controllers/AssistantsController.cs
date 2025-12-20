using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssistantsController : ControllerBase
    {
        private readonly IAssistantRepository _repository;

        public AssistantsController(IAssistantRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assistant>>> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Assistant>> GetById(int id)
        {
            var assistant = await _repository.GetByIdAsync(id);
            if (assistant == null)
                return NotFound(); 
            return Ok(assistant);
        }

        [HttpPost]
        public async Task<ActionResult<Assistant>> Create(Assistant assistant)
        {
            await _repository.AddAsync(assistant);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = assistant.Id }, assistant);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Assistant assistant)
        {
            if (id != assistant.Id)
                return BadRequest();

            _repository.Update(assistant);
            await _repository.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var assistant = await _repository.GetByIdAsync(id);
            if (assistant == null)
                return NotFound();

            _repository.Remove(assistant);
            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}
