using Microsoft.AspNetCore.Mvc;
using Tesseract;
using System.IO;

namespace dermatologyclinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OCRController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<OCRController> _logger;

        public OCRController(IWebHostEnvironment environment, ILogger<OCRController> logger)
        {
            _environment = environment;
            _logger = logger;
        }

        [HttpPost("process")]
        public async Task<IActionResult> ProcessImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { error = "No file uploaded." });

            try
            {
                // Define paths
                var tessDataPath = Path.Combine(_environment.ContentRootPath, "tessdata");
                var trainedDataFile = Path.Combine(tessDataPath, "eng.traineddata");

                // Check for Training Data
                if (!Directory.Exists(tessDataPath))
                {
                    Directory.CreateDirectory(tessDataPath);
                    return StatusCode(500, new { error = "Tessdata folder missing. Created it at: " + tessDataPath + ". Please add eng.traineddata file." });
                }

                if (!System.IO.File.Exists(trainedDataFile))
                {
                     return StatusCode(500, new { error = "Training data missing. Please download 'eng.traineddata' and place it in: " + tessDataPath });
                }

                // Save temp file
                var tempFile = Path.GetTempFileName();
                try 
                {
                    using (var stream = System.IO.File.Create(tempFile))
                    {
                        await file.CopyToAsync(stream);
                    }

                    // Perform OCR
                    using (var engine = new TesseractEngine(tessDataPath, "eng", EngineMode.Default))
                    {
                        using (var img = Pix.LoadFromFile(tempFile))
                        {
                            using (var page = engine.Process(img))
                            {
                                var text = page.GetText();
                                var confidence = page.GetMeanConfidence();
                                
                                _logger.LogInformation($"OCR Success. Confidence: {confidence}");
                                return Ok(new { text = text, confidence = confidence });
                            }
                        }
                    }
                }
                finally
                {
                    if (System.IO.File.Exists(tempFile))
                        System.IO.File.Delete(tempFile);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "OCR Processing Failed");
                return StatusCode(500, new { error = "OCR Processing Failed: " + ex.Message });
            }
        }
    }
}
