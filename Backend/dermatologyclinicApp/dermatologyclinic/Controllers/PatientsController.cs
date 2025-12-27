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
        public async Task<ActionResult<Patient>> Register([FromBody] Patient patient)
        {
            Console.WriteLine($"📥 Received registration request for: {patient.Email}");
            
            if (string.IsNullOrEmpty(patient.Email))
            {
                Console.WriteLine("❌ Registration failed: Email is required");
                return BadRequest("Email is required.");
            }

            try 
            {
                if (await _patientRepository.GetPatientByEmailAsync(patient.Email) != null)
                {
                    Console.WriteLine($"❌ Registration failed: Email {patient.Email} already exists");
                    return BadRequest("Patient with this email already exists.");
                }

                await _patientRepository.AddAsync(patient);
                await _patientRepository.SaveChangesAsync();

                Console.WriteLine($"✅ Registration successful for: {patient.Email}, ID: {patient.Id}");
                return CreatedAtAction(nameof(GetById), new { id = patient.Id }, patient);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Database Error during registration: {ex.Message}");
                if (ex.InnerException != null)
                    Console.WriteLine($"🔍 Inner Exception: {ex.InnerException.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("Test")]
        public IActionResult Test()
        {
            return Ok(new { message = "Patients API is reachable!" });
        }

        [HttpPost("SignUp")]
        public async Task<ActionResult<Patient>> SignUp(Patient patient)
        {
            return await Register(patient);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<Patient>> Login([FromBody] LoginRequest request)
        {
            var patient = await _patientRepository.GetPatientByEmailAsync(request.Email);
            
            if (patient == null || patient.Password != request.Password)
                return Unauthorized("Invalid email or password.");

            return Ok(patient);
        }

        public class LoginRequest
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }
    }
}

