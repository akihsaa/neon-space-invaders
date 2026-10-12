pipeline {
    agent any
    triggers { pollSCM('H/2 * * * *') }
    environment { DEPLOY_DIR = 'C:/space-invaders-live' }
    options { timestamps(); disableConcurrentBuilds() }
    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Check Node.js') { steps { bat 'node --version'; bat 'npm --version' } }
        stage('Install') { steps { bat 'npm install' } }
        stage('Automated Tests') { steps { bat 'npm test' } }
        stage('Build') { steps { bat 'npm run build' } }
        stage('Deploy') {
            steps {
                bat 'if not exist "%DEPLOY_DIR%" mkdir "%DEPLOY_DIR%"'
                bat 'xcopy /E /I /Y dist "%DEPLOY_DIR%"'
                echo 'Deployment files copied to the live website folder.'
            }
        }
    }
    post {
        success { echo 'SUCCESS: tests passed, game built, and deployment updated.' }
        failure { echo 'FAILED: inspect Console Output. Deploy only runs after tests and build pass.' }
    }
}
