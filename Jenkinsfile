pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set PATH for Docker') {
            steps {
                script {
                    def dockerPath = '/usr/local/bin'
                    def path = env.PATH
                    path = "${dockerPath}:${path}"
                    env.PATH = path
                }
            }
        }

        stage('Build and Test') {
            steps {
                sh '/usr/local/bin/docker-compose build'
                sh '/usr/local/bin/docker-compose up -d'
                sh '/usr/local/bin/docker-compose exec myblog npm test'
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
