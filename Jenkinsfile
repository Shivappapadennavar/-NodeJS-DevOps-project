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
<<<<<<< HEAD
        sh """
          docker build -t $DOCKERHUB_USER/node-backend ./Backend
          docker push $DOCKERHUB_USER/node-backend
        """
=======
        sh '''
          docker build -t $DOCKERHUB_USER/node-backend ./Backend
          docker push $DOCKERHUB_USER/node-backend
        '''
>>>>>>> 92382de981127e7e7ff41c0aab311083267f92f8
      }
    }

    stage("Build & Push Frontend Image") {
      steps {
<<<<<<< HEAD
        sh """
          docker build -t $DOCKERHUB_USER/node-frontend ./Frontend
          docker push $DOCKERHUB_USER/node-frontend
        """
=======
        sh '''
          docker build -t $DOCKERHUB_USER/node-frontend ./Frontend
          docker push $DOCKERHUB_USER/node-frontend
        '''
>>>>>>> 92382de981127e7e7ff41c0aab311083267f92f8
      }
    }

    stage("Build & Push Nginx Image") {
      steps {
<<<<<<< HEAD
        sh """
          docker build -t $DOCKERHUB_USER/node-nginx ./Nginx
          docker push $DOCKERHUB_USER/node-nginx
        """
=======
        sh '''
          docker build -t $DOCKERHUB_USER/node-nginx ./nginx
          docker push $DOCKERHUB_USER/node-nginx
        '''
>>>>>>> 92382de981127e7e7ff41c0aab311083267f92f8
      }
    }

    stage("Deploy on AWS EC2") {
      steps {
        sshagent(['app-ec2-ssh']) {
<<<<<<< HEAD
          sh """
=======
          sh '''
>>>>>>> 92382de981127e7e7ff41c0aab311083267f92f8
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
<<<<<<< HEAD
          """
=======
          '''
>>>>>>> 92382de981127e7e7ff41c0aab311083267f92f8
        }
      }
    }
  }

  post {
    success {
<<<<<<< HEAD
      echo "✅ Deployment Successful!"
    }
    failure {
      echo "❌ Deployment Failed!"
    }
  }
}
=======
      echo "✅ Application deployed successfully!"
    }
    failure {
      echo "❌ Deployment failed!"
    }
  }
}


>>>>>>> 92382de981127e7e7ff41c0aab311083267f92f8
