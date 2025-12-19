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
    public class PrescriptionsController : ControllerBase
    {
        private readonly IPrescriptionRepository _repository;

        public PrescriptionsController(IPrescriptionRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prescription>>> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Prescription>> GetById(int id)
        {
            var prescription = await _repository.GetByIdAsync(id);
            if (prescription == null)
                return NotFound();
            return Ok(prescription);
        }

        [HttpPost]
        public async Task<ActionResult<Prescription>> Create(Prescription prescription)
        {
            await _repository.AddAsync(prescription);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = prescription.Id }, prescription);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Prescription prescription)
        {
            if (id != prescription.Id)
                return BadRequest();

            _repository.Update(prescription);
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
    public class PrescriptionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PrescriptionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prescription>>> GetPrescriptions()
        {
            return await _context.Prescriptions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Prescription>> GetPrescription(int id)
        {
            var prescription = await _context.Prescriptions.FindAsync(id);
            if (prescription == null) return NotFound();
            return prescription;
        }

        [HttpPost]
        public async Task<ActionResult<Prescription>> PostPrescription(Prescription prescription)
        {
            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetPrescription", new { id = prescription.Id }, prescription);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrescription(int id, Prescription prescription)
        {
            if (id != prescription.Id) return BadRequest();
            _context.Entry(prescription).State = EntityState.Modified;
            await _context.SaveChangesAsync();
>>>>>>> origin/main
            return NoContent();
        }

        [HttpDelete("{id}")]
<<<<<<< HEAD
        public async Task<IActionResult> Delete(int id)
        {
            var prescription = await _repository.GetByIdAsync(id);
            if (prescription == null)
                return NotFound();

            _repository.Remove(prescription);
            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}
=======
        public async Task<IActionResult> DeletePrescription(int id)
        {
            var prescription = await _context.Prescriptions.FindAsync(id);
            if (prescription == null) return NotFound();

            _context.Prescriptions.Remove(prescription);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
>>>>>>> origin/main
