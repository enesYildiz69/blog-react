pipeline {
    agent any

    stages {
        stage('Install Docker') {
            steps {
                script {
                    // Check if Docker is already installed
                    def dockerVersion = sh(script: 'docker --version', returnStatus: true)
                    if (dockerVersion != 0) {
                        // Docker is not installed, so install it
                        sh 'sudo apt-get update'
                        sh 'sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common'
                        sh 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -'
                        sh 'sudo apt-key fingerprint 0EBFCD88'
                        sh 'sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"'
                        sh 'sudo apt-get update'
                        sh 'sudo apt-get install -y docker-ce docker-ce-cli containerd.io'
                    }
                }
            }
        }
        stage('Install Docker Compose') {
            steps {
                script {
                    // Check if Docker Compose is already installed
                    def dcVersion = sh(script: 'docker-compose --version', returnStatus: true)
                    if (dcVersion != 0) {
                        // Docker Compose is not installed, so install it
                        sh 'sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                        sh 'sudo chmod +x /usr/local/bin/docker-compose'
                    }
                }
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