pipeline {

    // Run the Jenkins pipeline on any available Jenkins agent
    agent any

    // Automatically trigger the pipeline whenever there is a GitHub push
    triggers {
        githubPush()
    }

    stages {

        // ==========================================
        // Clone Backend Branch
        // ==========================================
        stage('Clone Backend') {
            steps {
                bat '''
                // Remove the previous backend folder if it exists
                if exist backend-source rmdir /s /q backend-source

                // Clone the backend branch from GitHub
                git clone --branch feature/backend https://github.com/vikasmehta1921/Devops-2026-CS-F-14.git backend-source
                '''
            }
        }

        // ==========================================
        // Clone Frontend Branch
        // ==========================================
        stage('Clone Frontend') {
            steps {
                bat '''
                // Remove the previous frontend folder if it exists
                if exist frontend-source rmdir /s /q frontend-source

                // Clone the frontend branch from GitHub
                git clone --branch feature/frontend https://github.com/vikasmehta1921/Devops-2026-CS-F-14.git frontend-source
                '''
            }
        }

        // ==========================================
        // Check Backend Environment
        // ==========================================
        stage('Check Backend') {
            steps {
                dir('backend-source/backend') {
                    bat '''
                    // Display installed Node.js version
                    node --version

                    // Display installed npm version
                    npm --version
                    '''
                }
            }
        }

        // ==========================================
        // Install Backend Dependencies
        // ==========================================
        stage('Install Backend Dependencies') {
            steps {
                dir('backend-source/backend') {

                    // Install all backend packages
                    // listed in package.json
                    bat 'npm install'
                }
            }
        }

        // ==========================================
        // Check Frontend Environment
        // ==========================================
        stage('Check Frontend') {
            steps {
                dir('frontend-source/frontend') {
                    bat '''
                    // Display installed Node.js version
                    node --version

                    // Display installed npm version
                    npm --version
                    '''
                }
            }
        }

        // ==========================================
        // Install Frontend Dependencies
        // ==========================================
        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend-source/frontend') {

                    // Install all frontend packages
                    // listed in package.json
                    bat 'npm install'
                }
            }
        }

        // ==========================================
        // Build Frontend Application
        // ==========================================
        stage('Build Frontend') {
            steps {
                dir('frontend-source/frontend') {

                    // Create the production build
                    // This verifies that the frontend can compile successfully
                    bat 'npm run build'
                }
            }
        }
    }

    // ==========================================
    // Pipeline Result
    // ==========================================
    post {

        // Execute when all stages complete successfully
        success {
            echo 'Smart Rental CI completed successfully!'
        }

        // Execute when any stage fails
        failure {
            echo 'Smart Rental CI failed.'
        }
    }
}
