pipeline {
    agent any

    stages {

        stage('Clone Backend') {
            steps {
                bat '''
                if exist backend-source rmdir /s /q backend-source
                git clone --branch feature/backend https://github.com/vikasmehta1921/Devops-2026-CS-F-14.git backend-source
                '''
            }
        }

        stage('Clone Frontend') {
            steps {
                bat '''
                if exist frontend-source rmdir /s /q frontend-source
                git clone --branch feature/frontend https://github.com/vikasmehta1921/Devops-2026-CS-F-14.git frontend-source
                '''
            }
        }

        stage('Check Backend') {
            steps {
                dir('backend-source/backend') {
                    bat '''
                    node --version
                    npm --version
                    '''
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend-source/backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Check Frontend') {
            steps {
                dir('frontend-source/frontend') {
                    bat '''
                    node --version
                    npm --version
                    '''
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend-source/frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend-source/frontend') {
                    bat 'npm run build'
                }
            }
        }
    }

    post {
        success {
            echo 'Smart Rental CI completed successfully!'
        }

        failure {
            echo 'Smart Rental CI failed.'
        }
    }
}