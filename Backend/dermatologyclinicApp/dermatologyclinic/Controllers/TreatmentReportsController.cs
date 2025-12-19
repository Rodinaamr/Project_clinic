<<<<<<< HEAD
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
=======
﻿using Microsoft.AspNetCore.Mvc;
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
>>>>>>> origin/main
            return NoContent();
        }

        [HttpDelete("{id}")]
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main
