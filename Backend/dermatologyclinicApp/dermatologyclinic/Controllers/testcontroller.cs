// Controllers/TestController.cs
using dermatologyclinicApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dermatologyclinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TestController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok(new
            {
                message = "ASP.NET Backend is running!",
                timestamp = DateTime.UtcNow,
                environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development",
                version = "1.0"
            });
        }

        [HttpGet("database")]
        public async Task<IActionResult> TestDatabase()
        {
            try
            {
                var canConnect = await _context.Database.CanConnectAsync();
                var databaseName = _context.Database.GetDbConnection().Database;
                var pendingMigrations = await _context.Database.GetPendingMigrationsAsync();

                return Ok(new
                {
                    connected = canConnect,
                    database = databaseName,
                    pendingMigrations = pendingMigrations.ToArray(),
                    message = canConnect ? "Database connection successful!" : "Cannot connect to database"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Database connection failed",
                    error = ex.Message,
                    innerError = ex.InnerException?.Message,
                    connectionString = _context.Database.GetConnectionString()
                });
            }
        }

        [HttpGet("tables")]
        public IActionResult GetTables()
        {
            try
            {
                var tables = _context.Model.GetEntityTypes()
                    .Select(t => new
                    {
                        Name = t.GetTableName(),
                        Properties = t.GetProperties().Select(p => p.Name).ToArray()
                    })
                    .ToList();

                return Ok(new
                {
                    count = tables.Count,
                    tables = tables
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("test-all")]
        public async Task<IActionResult> TestAllEndpoints()
        {
            var results = new List<object>();

            try
            {
                // Test Patients
                var patients = await _context.Patients.ToListAsync();
                results.Add(new { endpoint = "Patients", count = patients.Count, status = "Success" });
            }
            catch (Exception ex)
            {
                results.Add(new { endpoint = "Patients", status = "Error", error = ex.Message });
            }

            try
            {
                // Test Doctors
                var doctors = await _context.Doctors.ToListAsync();
                results.Add(new { endpoint = "Doctors", count = doctors.Count, status = "Success" });
            }
            catch (Exception ex)
            {
                results.Add(new { endpoint = "Doctors", status = "Error", error = ex.Message });
            }

            try
            {
                // Test Assistants
                var assistants = await _context.Assistants.ToListAsync();
                results.Add(new { endpoint = "Assistants", count = assistants.Count, status = "Success" });
            }
            catch (Exception ex)
            {
                results.Add(new { endpoint = "Assistants", status = "Error", error = ex.Message });
            }

            return Ok(new
            {
                timestamp = DateTime.UtcNow,
                tests = results
            });
        }
    }
}