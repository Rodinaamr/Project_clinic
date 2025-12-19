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
    public class MedicationsController : ControllerBase
    {
        private readonly IMedicationRepository _repository;

        public MedicationsController(IMedicationRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Medication>>> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Medication>> GetById(int id)
        {
            var medication = await _repository.GetByIdAsync(id);
            if (medication == null)
                return NotFound();
            return Ok(medication);
        }

        [HttpPost]
        public async Task<ActionResult<Medication>> Create(Medication medication)
        {
            await _repository.AddAsync(medication);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = medication.Id }, medication);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Medication medication)
        {
            if (id != medication.Id)
                return BadRequest();

            _repository.Update(medication);
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
    public class MedicationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MedicationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Medication>>> GetMedications()
        {
            return await _context.Medications.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Medication>> GetMedication(int id)
        {
            var medication = await _context.Medications.FindAsync(id);
            if (medication == null) return NotFound();
            return medication;
        }

        [HttpPost]
        public async Task<ActionResult<Medication>> PostMedication(Medication medication)
        {
            _context.Medications.Add(medication);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetMedication", new { id = medication.Id }, medication);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedication(int id, Medication medication)
        {
            if (id != medication.Id) return BadRequest();
            _context.Entry(medication).State = EntityState.Modified;
            await _context.SaveChangesAsync();
>>>>>>> origin/main
            return NoContent();
        }

        [HttpDelete("{id}")]
<<<<<<< HEAD
        public async Task<IActionResult> Delete(int id)
        {
            var medication = await _repository.GetByIdAsync(id);
            if (medication == null)
                return NotFound();

            _repository.Remove(medication);
            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}
=======
        public async Task<IActionResult> DeleteMedication(int id)
        {
            var medication = await _context.Medications.FindAsync(id);
            if (medication == null) return NotFound();

            _context.Medications.Remove(medication);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
>>>>>>> origin/main
