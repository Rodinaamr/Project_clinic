using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories;
using dermatologyclinicApp.Repositories.Interfaces;
using dermatologyclinicApp.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ========== LOAD CONFIGURATION ==========
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// ========== CONFIGURE URLS ==========
// builder.WebHost.UseUrls("https://localhost:7078", "http://localhost:5148"); // Let Railway handle ports via Docker

// ========== CONFIGURE CORS ==========
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// ========== CONFIGURE DATABASE ==========
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Fallback to hardcoded connection string if missing (Safety net)
if (string.IsNullOrEmpty(connectionString))
{
    connectionString = "Server=localhost;Database=Wahid-Lotfy;User ID=root;Password=malak1234;";
    Console.WriteLine("⚠️  Using hardcoded connection string");
}

Console.WriteLine($"🔗 Database Connection String found.");

// Add DbContext with MySQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySQL(connectionString));

// ========== REPOSITORIES ==========
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IDoctorRepository, DoctorRepository>();
builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();
builder.Services.AddScoped<IAssistantRepository, AssistantRepository>();
builder.Services.AddScoped<IDoctorAssistantRepository, DoctorAssistantRepository>();
builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();
builder.Services.AddScoped<IMedicalReportRepository, MedicalReportRepository>();
builder.Services.AddScoped<IMedicationRepository, MedicationRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
builder.Services.AddScoped<ITreatmentReportRepository, TreatmentReportRepository>();

// ========== SERVICES ==========
builder.Services.AddScoped<AppointmentService>();

// ========== ADD CONTROLLERS ==========
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// ========== ADD SWAGGER ==========
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ========== USE CORS ==========
app.UseCors("AllowAll");

// ========== DEVELOPMENT SETTINGS ==========
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Clinic API V1");
        c.RoutePrefix = "swagger";
    });
}

// app.UseHttpsRedirection(); // Disable for Railway behind proxy

app.UseAuthorization();
app.MapControllers();

// ========== DATABASE INITIALIZATION & SEEDING ==========
/* 
   DISABLED FOR CLOUD DEPLOYMENT STABILITY
   Railway does not have a 'localhost' database. Trying to connect will cause timeouts/crashes.
   Uncomment this only when a real database (MySQL/PostgreSQL) is connected via environment variables.

try
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        Console.WriteLine("🔍 Checking database connection...");
        try {
             dbContext.Database.EnsureCreated();
             Console.WriteLine("✅ Database ensured/created!");
        } catch (Exception ex) {
             Console.WriteLine($"⚠️ Could not connect/create DB: {ex.Message}");
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Setup Error: {ex.Message}");
}
*/

Console.WriteLine("🚀 Application Starting...");
app.Run();
