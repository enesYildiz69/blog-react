pipeline {
    agent any

    stages {
        stage('Install Docker') {
            steps {
                script {
                    sh 'curl -fsSL https://get.docker.com -o get-docker.sh'
                    sh 'sudo sh get-docker.sh'
                    sh 'sudo usermod -aG docker $USER'  // Add the current user to the docker group
                    sh 'sudo systemctl enable docker'
                    sh 'sudo systemctl start docker'
                }
            }
        }

        stage('Install Docker Compose') {
            steps {
                sh 'sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                sh 'sudo chmod +x /usr/local/bin/docker-compose'
            }
        }


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