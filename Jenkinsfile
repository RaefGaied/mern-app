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
                    echo "=== 🔧 Build et Push SERVER ==="
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
                    echo "=== 🔧 Build et Push CLIENT ==="
                    echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
                    docker build -t $IMAGE_CLIENT:${BUILD_NUMBER} client
                    docker push $IMAGE_CLIENT:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Scan Trivy SERVER') {
            steps {
                sh '''
                echo "=== 🔍 Scan Trivy sur SERVER ==="
                docker pull $IMAGE_SERVER:${BUILD_NUMBER} || true
                docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                    aquasec/trivy image $IMAGE_SERVER:${BUILD_NUMBER} > trivy_server_report.txt
                echo "=== ✅ Rapport SERVER sauvegardé dans trivy_server_report.txt ==="
                '''
            }
        }

        stage('Scan Trivy CLIENT') {
            steps {
                sh '''
                echo "=== 🔍 Scan Trivy sur CLIENT ==="
                docker pull $IMAGE_CLIENT:${BUILD_NUMBER} || true
                docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                    aquasec/trivy image $IMAGE_CLIENT:${BUILD_NUMBER} > trivy_client_report.txt
                echo "=== ✅ Rapport CLIENT sauvegardé dans trivy_client_report.txt ==="
                '''
            }
        }
    }

    post {
        always {
            echo "🧹 Nettoyage du système Docker..."
            sh 'docker system prune -af || true'

            echo "📄 Contenu du rapport SERVER :"
            sh 'cat trivy_server_report.txt || true'

            echo "📄 Contenu du rapport CLIENT :"
            sh 'cat trivy_client_report.txt || true'
        }
    }
}
