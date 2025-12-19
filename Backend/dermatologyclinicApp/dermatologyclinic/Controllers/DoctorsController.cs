using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorRepository _doctorRepository;

        public DoctorsController(IDoctorRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetAll()
        {
            return Ok(await _doctorRepository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetById(int id)
        {
            var doctor = await _doctorRepository.GetDoctorWithDetailsAsync(id);
            if (doctor == null)
                return NotFound();

            return Ok(doctor);
        }

        [HttpGet("speciality/{speciality}")]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetBySpeciality(string speciality)
        {
            return Ok(await _doctorRepository.GetDoctorsBySpecialityAsync(speciality));
        }

        [HttpGet("available")]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetAvailable(DateTime date, TimeSpan startTime, TimeSpan endTime)
        {
            return Ok(await _doctorRepository.GetAvailableDoctorsAsync(date, startTime, endTime));
        }
    }
}
