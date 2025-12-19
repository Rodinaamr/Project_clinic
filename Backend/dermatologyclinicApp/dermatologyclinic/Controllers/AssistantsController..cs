using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dermatologyclinicApp.Models;

namespace dermatologyclinicApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssistantsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AssistantsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assistant>>> GetAssistants()
        {
            return await _context.Assistants.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Assistant>> GetAssistant(int id)
        {
            var assistant = await _context.Assistants.FindAsync(id);
            if (assistant == null) return NotFound();
            return assistant;
        }

        [HttpPost]
        public async Task<ActionResult<Assistant>> PostAssistant(Assistant assistant)
        {
            _context.Assistants.Add(assistant);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetAssistant", new { id = assistant.Id }, assistant);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssistant(int id, Assistant assistant)
        {
            if (id != assistant.Id) return BadRequest();
            _context.Entry(assistant).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssistant(int id)
        {
            var assistant = await _context.Assistants.FindAsync(id);
            if (assistant == null) return NotFound();

            _context.Assistants.Remove(assistant);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}