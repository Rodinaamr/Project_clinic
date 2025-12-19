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
    public class MedicalReportsController : ControllerBase
    {
        private readonly IMedicalReportRepository _repository;

        public MedicalReportsController(IMedicalReportRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalReport>>> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalReport>> GetById(int id)
        {
            var report = await _repository.GetByIdAsync(id);
            if (report == null)
                return NotFound();
            return Ok(report);
        }

        [HttpPost]
        public async Task<ActionResult<MedicalReport>> Create(MedicalReport report)
        {
            await _repository.AddAsync(report);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = report.Id }, report);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, MedicalReport report)
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
>>>>>>> origin/main
