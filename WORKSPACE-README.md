# 🚀 New Era AI Workspace

A multi-project workspace for managing AI solutions, client projects, and internal tools.

## 📁 Organization Structure

```
New Era AI/
├── 📋 .workspace-config.json       # Workspace configuration
├── 📜 WORKSPACE-README.md          # This file
├── 🔧 scripts/                     # Management utilities
│   ├── project-status.ps1          # Check all project statuses
│   ├── sync-repos.ps1              # Sync all repositories
│   └── create-project.ps1          # Create new project structure
├── 👥 Clients + Projects/          # Client work
│   ├── 🌱 Big Marble Farms/        # Educational portal (Active)
│   ├── 🚗 Pitstop AI/              # CRM system (Active)
│   ├── 🛞 OK Tire/                 # Voice analytics (Active)
│   ├── 📄 DPA/                     # Invoice processing (Development)
│   └── 🌸 Christie's Gardens/      # Voice system (Active)
├── 🔬 Internal Projects/           # New Era AI tools
│   ├── 🤖 background-agents/
│   ├── 📚 shared-libraries/
│   └── 🏗️ infrastructure/
└── 📦 Resources/                   # Shared assets
    ├── templates/
    ├── documentation/
    └── assets/
```

## 🎯 Project Types

### Client Projects
- **🌱 Big Marble Farms**: AI greenhouse management educational portal
- **🚗 Pitstop AI**: Customer relationship management system
- **🛞 OK Tire**: Voice analytics and call summarization
- **📄 DPA**: Automated invoice processing system  
- **🌸 Christie's Gardens**: AI voice receptionist system

### Internal Projects
- **🤖 Background Agents**: Cross-project AI automation
- **📚 Shared Libraries**: Reusable components and utilities
- **🏗️ Infrastructure**: Deployment and DevOps tools

## 🔄 Repository Management

### Individual Project Repositories
Each project maintains its own Git repository:
- Independent version control
- Project-specific branches and releases
- Isolated development environments
- Client-specific access control

### Root Workspace Repository
The root directory coordinates all projects:
- Workspace configuration
- Cross-project scripts
- Shared documentation
- Background agent access

## 🛠️ Management Scripts

### Check Project Status
```powershell
.\scripts\project-status.ps1
```
Displays Git status for all projects including:
- Current branch
- Uncommitted changes
- Latest commits

### Sync All Repositories
```powershell
# Pull latest changes for all projects
.\scripts\sync-repos.ps1 -PullOnly

# Check status only (no changes)
.\scripts\sync-repos.ps1 -StatusOnly

# Sync specific project
.\scripts\sync-repos.ps1 -ProjectName "Pitstop AI"

# Full sync (pull + push if needed)
.\scripts\sync-repos.ps1
```

### Working with Background Agents

Background agents can access multiple projects through the root workspace:

1. **Cross-project operations**: Agents can read from multiple client projects
2. **Shared context**: Common configuration through `.workspace-config.json`
3. **Coordinated updates**: Scripts ensure all repos stay in sync

## 🚀 Getting Started

### For New Team Members
1. Clone the workspace repository
2. Run `.\scripts\project-status.ps1` to see all projects
3. Navigate to specific project folders for focused work
4. Use `.\scripts\sync-repos.ps1` to keep everything updated

### For New Projects
1. Create project folder in appropriate category
2. Initialize Git repository within project folder
3. Update `.workspace-config.json` with project details
4. Add project to management scripts

### Working on Specific Projects
```powershell
# Navigate to project
cd "Clients + Projects\Big Marble Farms"

# Work normally with Git
git status
git add .
git commit -m "Your changes"
git push

# Return to root for cross-project work
cd "..\.."
```

## 🔐 Security & Access

- **Client Projects**: Separate repositories for client-specific access control
- **Internal Projects**: Shared access for New Era AI team
- **Background Agents**: Configured access levels in workspace config
- **Sensitive Data**: Use `.gitignore` and environment variables

## 📋 Best Practices

### Repository Hygiene
- ✅ Commit frequently with clear messages
- ✅ Keep projects focused and modular
- ✅ Use `.gitignore` for environment files
- ✅ Regular syncing with `sync-repos.ps1`

### Project Organization
- ✅ Clear separation between client and internal work
- ✅ Consistent naming conventions
- ✅ Updated project status in workspace config
- ✅ Documentation within each project

### Background Agent Usage
- ✅ Configure cross-project access explicitly
- ✅ Test agent operations in development first
- ✅ Monitor agent access through project status
- ✅ Regular workspace configuration updates

## 🆘 Troubleshooting

### Common Issues

**Multiple Git repositories confusion:**
- Use `.\scripts\project-status.ps1` to see all repo states
- Each project folder has its own `.git` directory
- Root workspace has its own repository

**Background agents can't access projects:**
- Check `.workspace-config.json` cross_project_access
- Ensure agents run from workspace root
- Verify project paths are correct

**Sync conflicts:**
- Use `.\scripts\sync-repos.ps1 -StatusOnly` first
- Resolve conflicts manually in specific projects
- Run individual project syncs: `-ProjectName "ProjectName"`

## 📞 Support

For workspace organization questions or issues:
- Check project status with provided scripts
- Review workspace configuration
- Consult individual project README files 