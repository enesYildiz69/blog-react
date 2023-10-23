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
}
