using Microsoft.EntityFrameworkCore;
using dermatologyclinicApp.Models;

var builder = WebApplication.CreateBuilder(args);

// ========== LOAD CONFIGURATION ==========
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// ========== CONFIGURE URLS ==========
builder.WebHost.UseUrls("https://localhost:7078", "http://localhost:5148");

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

// ========== ADD CONTROLLERS ==========
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// ========== CONFIGURE DATABASE ==========
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Fallback to hardcoded connection string
if (string.IsNullOrEmpty(connectionString))
{
    connectionString = "Server=localhost;Database=Wahid-Lotfy;User ID=root;Password=malak1234;";
    Console.WriteLine("⚠️  Using hardcoded connection string");
}

Console.WriteLine($"🔗 Database: {connectionString}");

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySQL(connectionString));

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

    Console.WriteLine("🚀 Backend running on:");
    Console.WriteLine($"   • HTTPS: https://localhost:7078");
    Console.WriteLine($"   • HTTP:  http://localhost:5148");
    Console.WriteLine($"   • Swagger: https://localhost:7078/swagger");
}

app.UseAuthorization();
app.MapControllers();

// ========== DATABASE INITIALIZATION ==========
try
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        Console.WriteLine("🔍 Checking database connection...");
        var canConnect = dbContext.Database.CanConnect();

        if (canConnect)
        {
            Console.WriteLine("✅ Database connection successful!");

            // Create tables if they don't exist
            Console.WriteLine("📊 Creating database tables if not exist...");
            dbContext.Database.EnsureCreated();

            // Check existing patients
            var patientCount = 0;
            try
            {
                patientCount = dbContext.Patients.Count();
                Console.WriteLine($"👥 Found {patientCount} patients in database");
            }
            catch
            {
                Console.WriteLine("⚠️  Could not count patients - table might not exist yet");
            }
        }
        else
        {
            Console.WriteLine("❌ Cannot connect to database");
            Console.WriteLine("   Please verify:");
            Console.WriteLine("   1. MySQL is running (XAMPP/WAMP/MAMP)");
            Console.WriteLine("   2. Database 'Wahid-Lotfy' exists");
            Console.WriteLine("   3. Username: root, Password: malak1234");
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Database Error: {ex.Message}");
    Console.WriteLine($"   Details: {ex.InnerException?.Message}");
}

app.Run();