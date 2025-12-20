using Microsoft.EntityFrameworkCore;
using dermatologyclinicApp.Models;
using dermatologyclinicApp.Repositories;
using dermatologyclinicApp.Repositories.Interfaces;
using dermatologyclinicApp.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

builder.WebHost.UseUrls("https://localhost:7078", "http://localhost:5148");

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    connectionString = "Server=localhost;Database=Wahid-Lotfy;User ID=root;Password=malak1234;";
    Console.WriteLine("⚠️  Using hardcoded connection string");
}
Console.WriteLine($"🔗 Database: {connectionString}");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySQL(connectionString));

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

builder.Services.AddScoped<AppointmentService>();

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

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Clinic API V1");
        c.RoutePrefix = "swagger";
    });

    Console.WriteLine("🚀 Backend running on:");
    Console.WriteLine($"   • HTTPS: https://localhost:7078");
    Console.WriteLine($"   • HTTP:  http://localhost:5148");
    Console.WriteLine($"   • Swagger: https://localhost:7078/swagger");
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

try
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        Console.WriteLine("🔍 Checking database connection...");
        if (dbContext.Database.CanConnect())
        {
            Console.WriteLine("✅ Database connection successful!");
            Console.WriteLine("📊 Creating database tables if not exist...");
            dbContext.Database.EnsureCreated();

            // Seed database
            Console.WriteLine("🌱 Seeding database...");
            await dermatologyclinicApp.Data.DbSeeder.SeedData(dbContext);
        }
        else
        {
            Console.WriteLine("❌ Cannot connect to database.");
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Database Error: {ex.Message}");
}

app.Run();
