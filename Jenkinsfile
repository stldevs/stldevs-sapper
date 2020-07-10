pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: '13') {
                    sh 'npm ci && npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh '''
ssh deploy@stldevs.com << EOF
  cd /opt/stldevs-svelte
  git pull
  nvm use 12
  npm ci
  npm run build
  sudo service stldevs-svelte restart
EOF
'''
            }
        }
    }
}
