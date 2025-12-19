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
    public class MedicalReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MedicalReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalReport>>> GetMedicalReports()
        {
            return await _context.MedicalReports.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalReport>> GetMedicalReport(int id)
        {
            var report = await _context.MedicalReports.FindAsync(id);
            if (report == null) return NotFound();
            return report;
        }

        [HttpPost]
        public async Task<ActionResult<MedicalReport>> PostMedicalReport(MedicalReport report)
        {
            _context.MedicalReports.Add(report);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetMedicalReport", new { id = report.Id }, report);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicalReport(int id, MedicalReport report)
        {
            if (id != report.Id) return BadRequest();
            _context.Entry(report).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalReport(int id)
        {
            var report = await _context.MedicalReports.FindAsync(id);
            if (report == null) return NotFound();

            _context.MedicalReports.Remove(report);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}