using dermatologyclinicApp.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ==================== ADD CORS POLICY ====================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactNative",
        policy =>
        {
            policy.WithOrigins(
                    "http://localhost:8081",       // Expo web
                    "http://localhost:19006",      // Expo dev server
                    "http://localhost:19000",      // Expo default
                    "http://localhost:3000",       // React dev server
                    "http://10.0.2.2:8081",        // Android emulator
                    "http://10.0.2.2:19006",       // Android emulator
                    "exp://127.0.0.1:19000",       // Expo app
                    "exp://localhost:19000"        // Expo app
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();

            // For development, you can use this simpler version:
            // policy.AllowAnyOrigin()
            //       .AllowAnyHeader()
            //       .AllowAnyMethod();
        });
});

// Add services to the container.
builder.Services.AddControllers();

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Swagger for testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ==================== USE CORS MIDDLEWARE ====================
app.UseCors("AllowReactNative");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Automatically apply migrations and create database on startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.EnsureCreated(); // This creates the database if it doesn't exist
}

app.Run();