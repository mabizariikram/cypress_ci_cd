pipeline {
    agent {
        docker {
            image 'cypress/included:13.6.6'
            args '--entrypoint='
        }
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh 'node --version'
                sh 'npm cache clean --force'
                //sh 'npx cypress cache clear'
                sh 'npm --version'
                sh 'npm install'
                
            }
        }
        stage('Run Cypress tests') {
            steps {
                sh 'npx cypress run --spec="cypress/e2e/login.cy.js"'
            }
        }
    }
}