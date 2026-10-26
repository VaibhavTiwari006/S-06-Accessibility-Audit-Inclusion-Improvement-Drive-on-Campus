# CU Access Audit Portal - Setup & Launch Development Services
# Run this script using PowerShell: .\run_dev.ps1

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "   CU ACCESS AUDIT PORTAL - DEV SERVICES LAUNCHER" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green

# 1. Check Docker status
Write-Host "[1/4] Checking Docker status..." -ForegroundColor Cyan
& docker info >$null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "Docker is not running. Please start Docker Desktop before running this script."
    exit 1
}
Write-Host "✓ Docker is active." -ForegroundColor Green

# 2. Spin up postgres database container
Write-Host "[2/4] Initializing PostgreSQL database container..." -ForegroundColor Cyan
cd backend
& docker-compose up -d db
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to start database container."
    cd ..
    exit 1
}
Write-Host "✓ Database container is healthy and running on port 5432." -ForegroundColor Green

# 3. Compile backend project dependencies
Write-Host "[3/4] Compiling Java backend dependencies..." -ForegroundColor Cyan
& .\mvnw clean compile -DskipTests
if ($LASTEXITCODE -ne 0) {
    Write-Error "Java compilation failed."
    cd ..
    exit 1
}
Write-Host "✓ Backend compiled successfully." -ForegroundColor Green
cd ..

# 4. Starting servers in background processes
Write-Host "[4/4] Starting servers..." -ForegroundColor Cyan

Write-Host "-> Launching Spring Boot server on http://localhost:8080..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\mvnw spring-boot:run"

Write-Host "-> Launching Vite development server on http://localhost:5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm install; npm run dev"

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "🚀 Launch successful! Check background PowerShell windows." -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
