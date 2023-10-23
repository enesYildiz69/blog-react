pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                sh 'docker-compose build'
                sh 'docker-compose up -d'
                sh 'docker-compose exec myblog npm test'
            }
        }
    }

    post {
        success {
            emailext (
                subject: "Success: ${currentBuild.fullDisplayName}",
                body: "The build and test were successful. The app is deployed.",
                recipientProviders: [culprits()]
            )
        }

        failure {
            emailext (
                subject: "Failure: ${currentBuild.fullDisplayName}",
                body: "The build or test failed. The app was not deployed.",
                recipientProviders: [brokenBuildSuspects()]
            )
        }
    }
}