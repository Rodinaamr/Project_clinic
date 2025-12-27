@echo off
echo ========================================
echo  RESETTING DATABASE WITH TEST DATA
echo ========================================
echo.

echo [1/4] Stopping backend...
taskkill /F /IM dermatologyclinic.exe 2>nul
taskkill /F /IM dotnet.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/4] Resetting database...
cd Backend\dermatologyclinicApp\dermatologyclinic
dotnet ef database drop --force
dotnet ef database update
echo.
echo.

echo [4/4] Starting backend with test data...
start "Dermatology Clinic Backend" dotnet run --urls "http://localhost:5148"
echo.

echo ========================================
echo  DONE! Backend is starting...
echo ========================================
echo.
echo Backend will seed with test data automatically
echo Check: http://localhost:5148/swagger
echo.
echo Test data includes:
echo - 2 Doctors (Dr. Wahid Lotfy, Dr. Sarah Ahmed)
echo - 3 Patients
echo - 4 Appointments (3 for today, 1 completed)
echo - 2 Payments
echo.
pause
