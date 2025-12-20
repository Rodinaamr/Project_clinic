using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace dermatologyclinicApp.Services
{
    public class AppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;

        public AppointmentService(IAppointmentRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }

        public async Task<Appointment> CreateAppointmentAsync(Appointment appointment)
        {
            var start = appointment.AppointmentDate;
            var end = start.AddMinutes(appointment.Duration);

            // Check for scheduling conflicts
            var hasConflict = await _appointmentRepository.HasConflictAsync(
                appointment.DoctorId,
                start,
                end);

            if (hasConflict)
                throw new InvalidOperationException("Doctor has a scheduling conflict at this time.");

            await _appointmentRepository.AddAsync(appointment);
            await _appointmentRepository.SaveChangesAsync();
            return appointment;
        }

        public async Task<Appointment> UpdateAppointmentAsync(int id, Appointment updatedAppointment)
        {
            var appointment = await _appointmentRepository.GetByIdAsync(id);
            if (appointment == null)
                throw new KeyNotFoundException($"Appointment with ID {id} not found.");

            var start = updatedAppointment.AppointmentDate;
            var end = start.AddMinutes(updatedAppointment.Duration);

            // Check for conflicts excluding current appointment
            var hasConflict = await _appointmentRepository.HasConflictAsync(
                updatedAppointment.DoctorId,
                start,
                end,
                id);

            if (hasConflict)
                throw new InvalidOperationException("Doctor has a scheduling conflict at this time.");

            // Update properties
            appointment.PatientId = updatedAppointment.PatientId;
            appointment.DoctorId = updatedAppointment.DoctorId;
            appointment.AppointmentDate = updatedAppointment.AppointmentDate;
            appointment.Duration = updatedAppointment.Duration;
            appointment.Status = updatedAppointment.Status;
            appointment.Notes = updatedAppointment.Notes;

            _appointmentRepository.Update(appointment);
            await _appointmentRepository.SaveChangesAsync();
            return appointment;
        }

        public async Task<bool> CancelAppointmentAsync(int id)
        {
            var appointment = await _appointmentRepository.GetByIdAsync(id);
            if (appointment == null)
                return false;

            appointment.Status = "Cancelled";
            _appointmentRepository.Update(appointment);
            await _appointmentRepository.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Appointment>> GetTodayAppointmentsAsync()
        {
            return await _appointmentRepository.GetAppointmentsByDateAsync(DateTime.Today);
        }

        public async Task<IEnumerable<Appointment>> GetUpcomingAppointmentsAsync(int days = 7)
        {
            var startDate = DateTime.Today;
            var endDate = DateTime.Today.AddDays(days);

            var allAppointments = await _appointmentRepository.GetAllAsync();
            return allAppointments
                .Where(a => a.AppointmentDate.Date >= startDate && a.AppointmentDate.Date <= endDate && a.Status == "Scheduled")
                .OrderBy(a => a.AppointmentDate)
                .ToList();
        }
    }
}
