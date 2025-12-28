using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dermatologyclinicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingSummariesController : ControllerBase
    {
        private readonly IMedicalReportRepository _reportRepository;

        public MeetingSummariesController(IMedicalReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MeetingSummaryDto>>> GetAll()
        {
            var reports = await _reportRepository.GetAllAsync();
            
            // Map MedicalReports to MeetingSummaryDto
            var summaries = reports.Select(r => new MeetingSummaryDto
            {
                Id = r.Id.ToString(),
                PatientName = r.Patient != null ? r.Patient.Name : "Unknown Patient",
                Date = r.ReportDate.ToString("yyyy-MM-dd"),
                Time = r.ReportDate.ToString("HH:mm"),
                Type = "Consultation", // Default type
                Duration = "30 min", // Default duration
                Summary = r.Notes ?? r.Diagnosis,
                ActionItems = !string.IsNullOrEmpty(r.TreatmentPlan) 
                    ? r.TreatmentPlan.Split(new[] { '\n', ',' }, StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToList() 
                    : new List<string>(),
                Sentiment = "Neutral" // Placeholder
            });

            return Ok(summaries);
        }
    }

    public class MeetingSummaryDto
    {
        public string Id { get; set; }
        public string PatientName { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Type { get; set; }
        public string Duration { get; set; }
        public string Summary { get; set; }
        public List<string> ActionItems { get; set; }
        public string Sentiment { get; set; }
    }
}
