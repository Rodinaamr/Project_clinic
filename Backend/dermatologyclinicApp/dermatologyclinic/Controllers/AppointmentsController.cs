<<<<<<< HEAD
using dermatologyclinicApp.Models;
using dermatologyclinicApp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppointmentService _appointmentService;

        public AppointmentsController(AppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetUpcomingAppointments(int days = 7)
        {
            var appointments = await _appointmentService.GetUpcomingAppointmentsAsync(days);
            return Ok(appointments);
        }

        [HttpGet("today")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetTodayAppointments()
        {
            var appointments = await _appointmentService.GetTodayAppointmentsAsync();
            return Ok(appointments);
        }

        [HttpPost]
        public async Task<ActionResult<Appointment>> CreateAppointment(Appointment appointment)
        {
            try
            {
                var createdAppointment = await _appointmentService.CreateAppointmentAsync(appointment);
                return CreatedAtAction(nameof(GetUpcomingAppointments), new { id = createdAppointment.Id }, createdAppointment);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Appointment>> UpdateAppointment(int id, Appointment appointment)
        {
            if (id != appointment.Id)
                return BadRequest("Appointment ID mismatch");

            try
            {
                var updatedAppointment = await _appointmentService.UpdateAppointmentAsync(id, appointment);
                return Ok(updatedAppointment);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> CancelAppointment(int id)
        {
            var result = await _appointmentService.CancelAppointmentAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
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
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Appointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            return await _context.Appointments.ToListAsync();
        }

        // GET: api/Appointments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }

        // POST: api/Appointments
        // POST: api/Appointments
        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        {
            Console.WriteLine("📥 POST Appointment requested");
            Console.WriteLine($"   Date: {appointment.AppointmentDate}");
            Console.WriteLine($"   PatientId: {appointment.PatientId}");
            Console.WriteLine($"   DoctorId: {appointment.DoctorId}");
            Console.WriteLine($"   Status: {appointment.Status}");
            Console.WriteLine($"   Notes: {appointment.Notes}");

            try
            {
                // Explicitly ignore Doctor if ID is null to prevent validation issues
                if (appointment.DoctorId == null)
                {
                    appointment.Doctor = null;
                }
                
                // Explicitly ignore Patient navigation property if ID is set (let EF handle FK)
                if (appointment.PatientId != null) 
                {
                    appointment.Patient = null;
                }

                _context.Appointments.Add(appointment);
                await _context.SaveChangesAsync();
                
                Console.WriteLine($"✅ Appointment created successfully with ID: {appointment.Id}");
                return CreatedAtAction("GetAppointment", new { id = appointment.Id }, appointment);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error creating appointment: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"   Inner Exception: {ex.InnerException.Message}");
                }
                
                // Return details to frontend
                return StatusCode(500, new { 
                    error = "Database error", 
                    details = ex.Message, 
                    inner = ex.InnerException?.Message 
                });
            }
        }

        // PUT: api/Appointments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointment(int id, Appointment appointment)
        {
            if (id != appointment.Id)
            {
                return BadRequest();
            }

            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Appointments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppointmentExists(int id)
        {
            return _context.Appointments.Any(e => e.Id == id);
        }
    }
}
>>>>>>> origin/main
