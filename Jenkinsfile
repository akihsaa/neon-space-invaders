
pipeline {
    agent any

    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        DEPLOY_DIR = 'C:/space-invaders-live'
        DOCKER_IMAGE = 'neon-space-invaders'
        CONTAINER_NAME = 'neon-space-game'
        DOCKER = 'C:/Users/arpit/AppData/Local/Programs/DockerDesktop/resources/bin/docker.exe'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Node.js') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Automated Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy Files') {
            steps {
                bat 'if not exist "%DEPLOY_DIR%" mkdir "%DEPLOY_DIR%"'
                bat 'xcopy /E /I /Y dist "%DEPLOY_DIR%"'
                echo 'Application files deployed successfully.'
            }
        }

        stage('Check Docker') {
            steps {
                bat '"%DOCKER%" --version'
                bat '"%DOCKER%" info'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '"%DOCKER%" build -t %DOCKER_IMAGE%:%BUILD_NUMBER% .'
                bat '"%DOCKER%" tag %DOCKER_IMAGE%:%BUILD_NUMBER% %DOCKER_IMAGE%:latest'
                echo 'Docker image built successfully.'
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    bat(
                        returnStatus: true,
                        script: '"%DOCKER%" rm -f %CONTAINER_NAME%'
                    )
                }

                bat '"%DOCKER%" run -d --restart unless-stopped --name %CONTAINER_NAME% -p 8082:80 %DOCKER_IMAGE%:latest'

                bat '"%DOCKER%" ps --filter "name=neon-space-game"'

                echo 'Docker container deployed successfully.'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: tests passed, application built, Docker image created, and container deployed.'
            echo 'Game URL: http://localhost:8082'
        }

        failure {
            echo 'PIPELINE FAILED: inspect Console Output to identify the failing stage.'
        }
    }
}

