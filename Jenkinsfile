pipeline {
    // ① Select a Jenkins slave with Docker capabilities
//    agent {
//        label 'docker'
//    }
    agent any

    environment {
        PRODUCT = 'bubot-auth'
        GIT_HOST = 'somewhere'
        GIT_REPO = 'repo'
    }

    options {
        ansiColor('xterm')
        skipDefaultCheckout()
//        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        // ② Checkout the right branch
        //stage('foo') {
          //  steps {
            //    sh "docker version" // DOCKER_CERT_PATH is automatically picked up by the Docker client
            //}
        //}

        stage('Checkout') {
            steps {
                script {
                    //BRANCH_NAME = env.CHANGE_BRANCH ? env.CHANGE_BRANCH : env.BRANCH_NAME
                    deleteDir()
                    //git url: "git@<host>:<org>/${env.PRODUCT}.git", branch: BRANCH_NAME
                }
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh "docker build . -t ${env.PRODUCT}:py"
            }
        }

	    // ④ Run the test using the built docker image
        stage('Test') {
            steps {
                script {
                    sh "docker run --rm --tty --name ${env.PRODUCT} ${env.PRODUCT}:py python -m unittest discover /usr/src/tests"
                }
            }
        }
    }
}