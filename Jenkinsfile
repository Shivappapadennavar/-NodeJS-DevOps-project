pipeline {
  agent any

  environment {
    DOCKERHUB_USER = "shivu0777"
    APP_SERVER = "ubuntu@44.205.4.22"
    BACKEND_IMAGE = "shivu0777/node-backend"
    FRONTEND_IMAGE = "shivu0777/node-frontend"
  }

  stages {

    stage("Clone Repository") {
      steps {
        git 'https://github.com/Shivappapadennavar/-NodeJS-DevOps-project.git'
      }
    }

    stage("Build & Push Backend Image") {
      steps {
        sh """
        docker build -t $BACKEND_IMAGE ./Backend
        docker push $BACKEND_IMAGE
        """
      }
    }

    stage("Build & Push Frontend Image") {
      steps {
        sh """
        docker build -t $FRONTEND_IMAGE ./Frontend
        docker push $FRONTEND_IMAGE
        """
      }
    }

    stage("Deploy on App Server") {
      steps {
        sshagent(['app-server-key']) {
          sh """
          ssh -o StrictHostKeyChecking=no $APP_SERVER << EOF
            docker pull $BACKEND_IMAGE
            docker pull $FRONTEND_IMAGE

            docker rm -f node-backend node-frontend || true

            docker run -d --name node-backend -p 3000:3000 $BACKEND_IMAGE
            docker run -d --name node-frontend -p 80:80 $FRONTEND_IMAGE
          EOF
          """
        }
      }
    }
  }
}
