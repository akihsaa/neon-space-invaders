# NEON INVADERS — Jenkins CI/CD Assignment

## Requirements
- Node.js 18 or newer and Git
- Jenkins running on a Windows agent with Node/npm on PATH
- Jenkins service account allowed to write to `C:\space-invaders-live`

## Run locally (PowerShell)
```powershell
npm install
npm test
npm run build
New-Item -ItemType Directory -Force live-site
Copy-Item dist\* live-site -Recurse -Force
$env:SITE_DIR = "$PWD\live-site"
npm run serve
```
Open http://localhost:8080.

## Jenkins setup
1. Create a GitHub repository named `neon-space-invaders` and push all files, including `Jenkinsfile`.
2. In Jenkins select **New Item → Pipeline**.
3. Select **Pipeline script from SCM**, SCM **Git**, and enter your GitHub repository URL.
4. Branch: `*/main`; Script Path: `Jenkinsfile`; Save and click **Build Now**.
5. The pipeline checks out code, installs, runs tests, builds, and copies the built site to `C:\space-invaders-live`.

Start the web server in a separate PowerShell window after the first successful deployment:
```powershell
$env:SITE_DIR = 'C:\space-invaders-live'
$env:PORT = '8080'
node server.js
```
Keep the terminal open and visit http://localhost:8080.

The `pollSCM` trigger checks for changes about every two minutes. For a private repository, configure Git credentials in Jenkins. Jenkins must run on a Windows agent with Node.js/npm installed. If Jenkins runs as a Windows service, its service account needs permission to write to the deploy folder.

## Demonstrate
1. Run a successful pipeline and open the game.
2. Change a color in `style.css`, commit, and push to GitHub.
3. Wait for polling or click **Build Now**.
4. Show tests/build/deploy passing, then refresh http://localhost:8080.
5. For a failure demo, temporarily break a tested function in `game-logic.js`; tests should fail and later stages should not run. Restore it afterward.

## Notes
- No database is required.
- Automated tests use Node's built-in test runner.
- The pipeline is configured for a Windows Jenkins agent (`bat` steps).
