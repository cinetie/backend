pipeline {
    agent any

    triggers {
        genericTrigger(
            genericVariables: [
                [key: 'branch', value: '$.ref']
            ],
            causeString: 'Triggered by Git push to branch $branch'
        )
    }

    stages {
        stage('Filter Branch') {
            steps {
                script {
                    def branchName = env.branch.split('/')[-1]
                    if (!branchName.matches('*-dev')) { // Adjust the pattern as needed
                        currentBuild.result = 'NOT_BUILT'
                        error('Skipping build because branch name does not match pattern')
                    }
                }
            }
        }
        
        // Rest of your build and deployment stages here...
    }
}