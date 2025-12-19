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
    public class TreatmentReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TreatmentReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TreatmentReport>>> GetTreatmentReports()
        {
            return await _context.TreatmentReports.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TreatmentReport>> GetTreatmentReport(int id)
        {
            var report = await _context.TreatmentReports.FindAsync(id);
            if (report == null) return NotFound();
            return report;
        }

        [HttpPost]
        public async Task<ActionResult<TreatmentReport>> PostTreatmentReport(TreatmentReport report)
        {
            _context.TreatmentReports.Add(report);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetTreatmentReport", new { id = report.Id }, report);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTreatmentReport(int id, TreatmentReport report)
        {
            if (id != report.Id) return BadRequest();
            _context.Entry(report).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTreatmentReport(int id)
        {
            var report = await _context.TreatmentReports.FindAsync(id);
            if (report == null) return NotFound();

            _context.TreatmentReports.Remove(report);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}