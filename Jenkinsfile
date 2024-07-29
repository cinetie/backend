pipeline {
    agent any
    tools { nodejs "latest" }
    stages {
        stage('install') {
            steps {
                sh 'npm install'
            }
        }
        stage('build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('deploy') {
            steps {
                sh 'pm2 restart all'
            }
        }
    }
}