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
seconds=`date +"%s"`
tarfile=new-$seconds.tar.gz
tar -cvzf $tarfile .
scp $tarfile deploy@stldevs.com:~
ssh deploy@stldevs.com << EOF
  rm -rf /opt/stldevs-svelte/*
  mv $tarfile /opt/stldevs-svelte
  cd /opt/stldevs-svelte
  tar -zxf $tarfile
  rm $tarfile
  systemctl restart stldevs-svelte
EOF
'''
            }
        }
    }
}
