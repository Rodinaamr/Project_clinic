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
            
            // Set default password if not provided (fix for validation error)
            if (string.IsNullOrEmpty(patient.Password))
            {
                 patient.Password = "DefaultPassword123"; // TODO: Handle this securely
            }

            await _patientRepository.AddAsync(patient);
            await _patientRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = patient.Id }, patient);
        }

        [HttpPost("SignUp")]
        public async Task<ActionResult<Patient>> SignUp([FromBody] Patient patient)
        {
             return await Register(patient);
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {
            var patient = await _patientRepository.GetPatientByEmailAsync(request.Email);
            
            // Simple password check - in real app use hashing
            if (patient == null || patient.Password != request.Password)
            {
                return Unauthorized(new { error = "Invalid email or password" });
            }

            return Ok(new
            {
                id = patient.Id,
                firstName = patient.FirstName,
                lastName = patient.LastName,
                email = patient.Email,
                phone = patient.Phone,
                dateOfBirth = patient.DateOfBirth,
                address = patient.Address,
                message = "Login successful"
            });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
