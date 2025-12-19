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
=======
﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dermatologyclinicApp.Models;

namespace dermatologyclinicApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PatientsController(ApplicationDbContext context)
        {
            _context = context;
            Console.WriteLine("✅ PatientsController initialized");
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            Console.WriteLine("📥 GET all patients requested");
            var patients = await _context.Patients.ToListAsync();
            Console.WriteLine($"📊 Returning {patients.Count} patients");
            return patients;
        }

        // GET: api/Patients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            Console.WriteLine($"📥 GET patient with ID: {id}");
            var patient = await _context.Patients.FindAsync(id);

            if (patient == null)
            {
                Console.WriteLine($"❌ Patient with ID {id} not found");
                return NotFound();
            }

            Console.WriteLine($"✅ Found patient: {patient.FirstName} {patient.LastName}");
            return patient;
        }

        // POST: api/Patients
        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient([FromBody] Patient patient)
        {
            Console.WriteLine("📤 POST new patient request");
            Console.WriteLine($"   Name: {patient.FirstName} {patient.LastName}");
            Console.WriteLine($"   Email: {patient.Email}");

            // Validate required fields
            if (string.IsNullOrWhiteSpace(patient.FirstName) || string.IsNullOrWhiteSpace(patient.LastName))
            {
                Console.WriteLine("❌ Validation failed: FirstName and LastName are required");
                return BadRequest(new { error = "FirstName and LastName are required." });
            }

            // Validate password
            if (string.IsNullOrWhiteSpace(patient.Password) || patient.Password.Length < 6)
            {
                Console.WriteLine("❌ Validation failed: Password must be at least 6 characters");
                return BadRequest(new { error = "Password must be at least 6 characters long." });
            }

            // Check if email already exists
            var existingPatient = await _context.Patients
                .FirstOrDefaultAsync(p => p.Email == patient.Email);

            if (existingPatient != null)
            {
                Console.WriteLine($"❌ Email {patient.Email} already exists");
                return BadRequest(new { error = "Email already registered." });
            }

            try
            {
                // Set creation timestamp
                patient.CreatedAt = DateTime.Now;

                // Add to database
                _context.Patients.Add(patient);
                await _context.SaveChangesAsync();

                Console.WriteLine($"✅ Patient created with ID: {patient.Id}");
                Console.WriteLine($"   Total patients now: {_context.Patients.Count()}");

                // Return the created patient
                return CreatedAtAction("GetPatient", new { id = patient.Id }, patient);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error saving patient: {ex.Message}");
                Console.WriteLine($"   Inner exception: {ex.InnerException?.Message}");
                return StatusCode(500, new { error = "Internal server error", details = ex.Message });
            }
        }

        // POST: api/Patients/SignUp (Alternative endpoint)
        [HttpPost("SignUp")]
        public async Task<ActionResult> SignUp([FromBody] Patient patient)
        {
            Console.WriteLine("📤 SignUp request via /SignUp endpoint");

            // Call PostPatient and convert the result
            var result = await PostPatient(patient);

            // If result is BadRequest or other error, return as-is
            if (result.Result is BadRequestObjectResult ||
                result.Result is StatusCodeResult ||
                result.Result is ObjectResult objResult && objResult.StatusCode >= 400)
            {
                return result.Result;
            }

            // If successful, return custom response
            var createdPatient = result.Value as Patient;
            return Ok(new
            {
                message = "Registration successful",
                patientId = createdPatient.Id,
                name = $"{createdPatient.FirstName} {createdPatient.LastName}",
                email = createdPatient.Email,
                createdAt = createdPatient.CreatedAt
            });
        }

        // POST: api/Patients/Login
        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {
            Console.WriteLine($"🔐 Login attempt for email: {request.Email}");

            var patient = await _context.Patients
                .FirstOrDefaultAsync(p => p.Email == request.Email && p.Password == request.Password);

            if (patient == null)
            {
                Console.WriteLine("❌ Login failed: Invalid email or password");
                return Unauthorized(new { error = "Invalid email or password" });
            }

            Console.WriteLine($"✅ Login successful for: {patient.FirstName} {patient.LastName}");

            // Return patient info without password
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

        // PUT: api/Patients/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(int id, Patient patient)
        {
            Console.WriteLine($"✏️  PUT update patient ID: {id}");

            if (id != patient.Id)
            {
                Console.WriteLine("❌ ID mismatch");
                return BadRequest();
            }

            _context.Entry(patient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                Console.WriteLine($"✅ Patient {id} updated successfully");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
                {
                    Console.WriteLine($"❌ Patient {id} not found for update");
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Patients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            Console.WriteLine($"🗑️  DELETE patient ID: {id}");

            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                Console.WriteLine($"❌ Patient {id} not found for deletion");
                return NotFound();
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            Console.WriteLine($"✅ Patient {id} deleted successfully");
            Console.WriteLine($"   Remaining patients: {_context.Patients.Count()}");

            return NoContent();
        }

        // GET: api/Patients/Test
        [HttpGet("Test")]
        public ActionResult Test()
        {
            Console.WriteLine("🧪 Test endpoint called");
            return Ok(new
            {
                message = "PatientsController is working!",
                timestamp = DateTime.Now,
                totalPatients = _context.Patients.Count()
            });
        }

        private bool PatientExists(int id)
        {
            return _context.Patients.Any(e => e.Id == id);
        }
    }

    // Login request model
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
>>>>>>> origin/main
