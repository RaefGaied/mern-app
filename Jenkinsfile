pipeline {
    agent any

    triggers { pollSCM('H/5 * * * *') }

    environment {
        IMAGE_SERVER = 'raefgaied4/mern-server' 
        IMAGE_CLIENT = 'raefgaied4/mern-client' 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/RaefGaied/mern-app.git', 
                    credentialsId: 'gitlab_ssh' 
            }
        }

        stage('Build + Push SERVER') {
            when { changeset "server/**" }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub', 
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_PASS'
                )]) {
                    sh '''
                    echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
                    docker build -t $IMAGE_SERVER:${BUILD_NUMBER} server
                    docker push $IMAGE_SERVER:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Build + Push CLIENT') {
            when { changeset "client/**" }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_PASS'
                )]) {
                    sh '''
                    echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
                    docker build -t $IMAGE_CLIENT:${BUILD_NUMBER} client
                    docker push $IMAGE_CLIENT:${BUILD_NUMBER}
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker system prune -af || true'
        }
    }
}
