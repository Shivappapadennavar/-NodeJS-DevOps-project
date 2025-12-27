pipeline {
  agent any

  environment {
    DOCKERHUB_USER = "shivu0777"
  }

  stages {

    stage("Build & Push Backend Image") {
      steps {
        sh """
          docker build -t $DOCKERHUB_USER/node-backend ./Backend
          docker push $DOCKERHUB_USER/node-backend
        """
      }
    }

    stage("Build & Push Frontend Image") {
      steps {
        sh """
          docker build -t $DOCKERHUB_USER/node-frontend ./Frontend
          docker push $DOCKERHUB_USER/node-frontend
        """
      }
    }

    stage("Deploy Containers") {
      steps {
        sh """
          docker rm -f backend frontend || true

          docker run -d --name backend -p 3000:3000 $DOCKERHUB_USER/node-backend
          docker run -d --name frontend -p 80:80 $DOCKERHUB_USER/node-frontend
        """
      }
    }
  }

  post {
    success {
      echo "✅ Deployment Successful!"
    }
    failure {
      echo "❌ Deployment Failed!"
    }
  }
}

