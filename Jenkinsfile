pipeline {
  agent any

  environment {
    DOCKERHUB_USER = "shivu0777"
    APP_SERVER     = "ubuntu@44.205.4.22"
    NETWORK        = "node-network"
  }

  stages {

    stage("Checkout Code") {
      steps {
        checkout scm
      }
    }

    stage("Build & Push Backend Image") {
      steps {
        sh '''
          docker build -t $DOCKERHUB_USER/node-backend ./Backend
          docker push $DOCKERHUB_USER/node-backend
        '''
      }
    }

    stage("Build & Push Frontend Image") {
      steps {
        sh '''
          docker build -t $DOCKERHUB_USER/node-frontend ./Frontend
          docker push $DOCKERHUB_USER/node-frontend
        '''
      }
    }

    stage("Build & Push Nginx Image") {
      steps {
        sh '''
          docker build -t $DOCKERHUB_USER/node-nginx ./nginx
          docker push $DOCKERHUB_USER/node-nginx
        '''
      }
    }

    stage("Deploy on AWS EC2") {
      steps {
        sshagent(['app-ec2-ssh']) {
          sh '''
          ssh -o StrictHostKeyChecking=no $APP_SERVER << EOF

            docker network create $NETWORK || true

            docker pull $DOCKERHUB_USER/node-backend
            docker pull $DOCKERHUB_USER/node-frontend
            docker pull $DOCKERHUB_USER/node-nginx

            docker rm -f backend frontend nginx || true

            docker run -d --name backend \
              --network $NETWORK \
              $DOCKERHUB_USER/node-backend

            docker run -d --name frontend \
              --network $NETWORK \
              $DOCKERHUB_USER/node-frontend

            docker run -d --name nginx \
              --network $NETWORK \
              -p 80:80 \
              $DOCKERHUB_USER/node-nginx

          EOF
          '''
        }
      }
    }
  }

  post {
    success {
      echo "✅ Application deployed successfully!"
    }
    failure {
      echo "❌ Deployment failed!"
    }
  }
}


