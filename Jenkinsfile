pipeline {
    agent { docker { image 'node:12.16.1' } }
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