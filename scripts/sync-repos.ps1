# Repository Sync Script for New Era AI Workspace
# Usage: .\scripts\sync-repos.ps1

param(
    [switch]$PullOnly,
    [switch]$StatusOnly,
    [string]$ProjectName
)

Write-Host "🔄 New Era AI Repository Sync" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan

# Function to sync a repository
function Sync-Repository {
    param($Path, $Name)
    
    if (Test-Path "$Path\.git") {
        Write-Host "🔄 Syncing: $Name" -ForegroundColor Blue
        Push-Location $Path
        
        try {
            # Check current status
            $status = git status --porcelain
            $branch = git rev-parse --abbrev-ref HEAD
            
            Write-Host "  📍 Branch: $branch" -ForegroundColor Yellow
            
            if ($StatusOnly) {
                if ($status) {
                    Write-Host "  ⚠️  $($status.Count) uncommitted changes" -ForegroundColor Red
                } else {
                    Write-Host "  ✅ Clean working directory" -ForegroundColor Green
                }
                return
            }
            
            # Pull latest changes
            Write-Host "  ⬇️  Pulling latest changes..." -ForegroundColor Gray
            git pull origin $branch
            
            if (-not $PullOnly -and $status) {
                Write-Host "  ⬆️  Pushing local changes..." -ForegroundColor Gray
                git add .
                git commit -m "Auto-sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
                git push origin $branch
                Write-Host "  ✅ Changes pushed successfully" -ForegroundColor Green
            }
            
            Write-Host "  ✅ Sync complete for $Name" -ForegroundColor Green
        }
        catch {
            Write-Host "  ❌ Error syncing $Name : $_" -ForegroundColor Red
        }
        finally {
            Pop-Location
        }
    } else {
        Write-Host "  ⚪ $Name - No Git repository" -ForegroundColor Gray
    }
    Write-Host ""
}

# Define all projects
$allProjects = @{
    "Root" = "."
    "Big Marble Farms" = "Clients + Projects\Big Marble Farms"
    "Pitstop AI" = "Clients + Projects\Pitstop AI"
    "OK Tire" = "Clients + Projects\OK Tire" 
    "DPA" = "Clients + Projects\DPA"
    "Christie's Gardens" = "Clients + Projects\Christie's Gardens `& Greenhouses"
    "Terrabot" = "Terrabot"
    "Terrabot2" = "Terrabot2"
}

# Sync specific project or all projects
if ($ProjectName) {
    if ($allProjects.ContainsKey($ProjectName)) {
        Sync-Repository $allProjects[$ProjectName] $ProjectName
    } else {
        Write-Host "❌ Project '$ProjectName' not found" -ForegroundColor Red
        Write-Host "Available projects:" -ForegroundColor Yellow
        $allProjects.Keys | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }
    }
} else {
    # Sync all projects
    foreach ($project in $allProjects.GetEnumerator()) {
        if (Test-Path $project.Value) {
            Sync-Repository $project.Value $project.Key
        }
    }
}

Write-Host "Repository sync complete!" -ForegroundColor Cyan 