#!/bin/bash

# Ketan Blog - Deployment Script
# This script packages and deploys the app to the server

set -e

echo "====== Starting Ketan Blog Deployment ======"

# 1. Build client app locally first
echo "====== Building client application locally ======"
cd /Users/ketan/Learning/Ketan-Blog/client
npm run build
cd /Users/ketan/Learning/Ketan-Blog

# 2. Remove everything from the remote server first
echo "====== Clearing previous files on server ======"
ssh siu 'rm -rf ~/ketan-blog/* ~/client.tar.gz ~/server.tar.gz'

# 3. Remove any existing tar files locally
echo "====== Removing existing archives ======"
rm -f client.tar.gz server.tar.gz

# 4. Create tar archives of client build and server
echo "====== Creating code archives ======"
tar -czf client-build.tar.gz -C /Users/ketan/Learning/Ketan-Blog/client/.output .
tar -czf server.tar.gz -C /Users/ketan/Learning/Ketan-Blog server

# 5. Copy files to the server
echo "====== Copying files to server ======"
scp /Users/ketan/Learning/Ketan-Blog/client-build.tar.gz \
    /Users/ketan/Learning/Ketan-Blog/server.tar.gz \
    /Users/ketan/Learning/Ketan-Blog/start.sh \
    /Users/ketan/Learning/Ketan-Blog/client/ecosystem.config.js \
    /Users/ketan/Learning/Ketan-Blog/server/.env.production \
    siu:/home/ketan/

# 6. Extract archives on the server
echo "====== Extracting code on server ======"
ssh siu '
# Create directories
mkdir -p ~/ketan-blog/client/.output
mkdir -p ~/ketan-blog/server

# Extract the code archives
tar -xzf ~/server.tar.gz -C ~/ketan-blog
tar -xzf ~/client-build.tar.gz -C ~/ketan-blog/client/.output

# Move ecosystem config to client directory and .env.production to server directory
mv ~/ecosystem.config.js ~/ketan-blog/client/
mv ~/.env.production ~/ketan-blog/server/.env
'

# 7. Run start script on server
echo "====== Starting application on server ======"
ssh siu 'bash ~/start.sh'

echo "====== Deployment complete! ======"
echo "Visit your application at: http://159.65.154.80:3000"
echo "API is available at: http://159.65.154.80:3001/api"
