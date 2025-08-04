# Project Status Checker for New Era AI Workspace
# Usage: .\scripts\project-status.ps1

Write-Host "New Era AI Workspace Status" -ForegroundColor Cyan
Write-Host "===========================" -ForegroundColor Cyan

# Function to check Git status
function Get-GitStatus {
    param($Path)
    
    if (Test-Path "$Path\.git") {
        Push-Location $Path
        try {
            $branch = git rev-parse --abbrev-ref HEAD
            $status = git status --porcelain
            $commits = git log --oneline -n 1
            
            Write-Host "  Path: $Path" -ForegroundColor Green
            Write-Host "  Branch: $branch" -ForegroundColor Yellow
            
            if ($status) {
                Write-Host "  [!] Uncommitted changes detected" -ForegroundColor Red
                Write-Host "      $($status.Count) files modified" -ForegroundColor Red
            } else {
                Write-Host "  [OK] Clean working directory" -ForegroundColor Green
            }
            
            Write-Host "  Latest: $commits" -ForegroundColor Gray
            Write-Host ""
        }
        catch {
            Write-Host "  [X] Error checking Git status" -ForegroundColor Red
        }
        finally {
            Pop-Location
        }
    } else {
        Write-Host "  Path: $Path" -ForegroundColor Green
        Write-Host "  [O] No Git repository" -ForegroundColor Gray
        Write-Host ""
    }
}

# Check root repository
Write-Host "ROOT REPOSITORY" -ForegroundColor Magenta
Get-GitStatus "."

# Check client projects
Write-Host "CLIENT PROJECTS" -ForegroundColor Magenta
$clientProjects = @(
    "Clients + Projects\Big Marble Farms",
    "Clients + Projects\Pitstop AI", 
    "Clients + Projects\OK Tire",
    "Clients + Projects\DPA",
    "Clients + Projects\Christie''s Gardens & Greenhouses"
)

foreach ($project in $clientProjects) {
    if (Test-Path $project) {
        Write-Host ">> $(Split-Path $project -Leaf)" -ForegroundColor Blue
        Get-GitStatus $project
    }
}

# Check internal projects  
Write-Host "INTERNAL PROJECTS" -ForegroundColor Magenta
$internalProjects = @(
    "Terrabot",
    "Terrabot2"
)

foreach ($project in $internalProjects) {
    if (Test-Path $project) {
        Write-Host ">> $project" -ForegroundColor Blue  
        Get-GitStatus $project
    }
}

Write-Host "Status check complete!" -ForegroundColor Cyan 