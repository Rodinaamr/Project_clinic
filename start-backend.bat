@echo off
echo Starting Dermatology Clinic Backend...
echo Stopping any running instances...
taskkill /F /IM dermatologyclinic.exe 2>nul
taskkill /F /IM dotnet.exe 2>nul
timeout /t 2 /nobreak >nul
cd /d "c:\Users\roday\OneDrive\Desktop\Dermatology_clinic\Backend\dermatologyclinicApp\dermatologyclinic"
echo Cleaning and building...
call dotnet clean >nul 2>&1
call dotnet build >nul 2>&1
echo Starting backend...
start "Dermatology Backend" dotnet run --urls "http://localhost:5148"
echo.
echo ========================================
echo Backend is starting!
echo Swagger UI: http://localhost:5148/swagger
echo API Base: http://localhost:5148/api
echo ========================================
timeout /t 3
