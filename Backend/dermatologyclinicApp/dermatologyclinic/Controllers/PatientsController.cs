using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientRepository _patientRepository;

        public PatientsController(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> Search(string? query = null)
        {
            return Ok(await _patientRepository.SearchPatientsAsync(query));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetById(int id)
        {
            var patient = await _patientRepository.GetPatientWithDetailsAsync(id);
            if (patient == null)
                return NotFound();

            return Ok(patient);
        }

        [HttpPost]
        public async Task<ActionResult<Patient>> Register(Patient patient)
        {
            if (await _patientRepository.GetPatientByEmailAsync(patient.Email) != null)
                return BadRequest("Patient with this email already exists.");

            await _patientRepository.AddAsync(patient);
            await _patientRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = patient.Id }, patient);
        }
    }
}

