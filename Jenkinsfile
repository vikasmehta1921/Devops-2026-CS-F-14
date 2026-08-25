pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Backend') {
            steps {
                bat '''
                    cd backend
                    node --version
                    npm --version
                    dir
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    cd backend
                    npm install
                '''
            }
        }
    }

    post {
        success {
            echo 'Smart Rental CI completed successfully.'
        }

        failure {
            echo 'Smart Rental CI failed.'
        }
    }
}