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

