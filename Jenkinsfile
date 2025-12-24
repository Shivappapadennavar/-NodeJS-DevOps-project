pipeline {
  agent any

  environment {
    DOCKERHUB_USER = "shivu0777"
    APP_SERVER     = "ubuntu@44.205.4.22"
    NETWORK        = "node-network"
  }

  stages {

    stage("Clone Repository") {
      steps {
        git 'https://github.com/Shivappapadennavar/-NodeJS-DevOps-project.git'
      }
    }

    stage("Build & Push Backend Image") {
      steps {
        sh '''
          docker build -t shivu0777/node-backend ./Backend
          docker push shivu0777/node-backend
        '''
      }
    }

    stage("Build & Push Frontend Image") {
      steps {
        sh '''
          docker build -t shivu0777/node-frontend ./Frontend
          docker push shivu0777/node-frontend
        '''
      }
    }

    stage("Build & Push Nginx Image") {
      steps {
        sh '''
          docker build -t shivu0777/node-nginx ./nginx
          docker push shivu0777/node-nginx
        '''
      }
    }

    stage("Deploy on AWS EC2 App Server") {
      steps {
        sshagent(['app-ec2-ssh']) {
          sh '''
          ssh -o StrictHostKeyChecking=no ubuntu@44.205.4.22 << EOF

            docker network create node-network || true

            docker pull shivu0777/node-backend
            docker pull shivu0777/node-frontend
            docker pull shivu0777/node-nginx

            docker rm -f backend frontend nginx || true

            docker run -d --name backend \
              --network node-network \
              shivu0777/node-backend

            docker run -d --name frontend \
              --network node-network \
              shivu0777/node-frontend

            docker run -d --name nginx \
              --network node-network \
              -p 80:80 \
              shivu0777/node-nginx

          EOF
          '''
        }
      }
    }
  }

  post {
    success {
      echo "✅ Deployment Successful! App is live on http://44.205.4.22"
    }
    failure {
      echo "❌ Deployment Failed! Check Jenkins logs."
    }
  }
}

