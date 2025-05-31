#!/bin/bash

# Slow Down Time - Deployment Script
# This script packages and deploys the app to the server

set -e

echo "====== Starting Slow Down Time Deployment ======"

# 1. Build client app locally first
echo "====== Building client application locally ======"
cd /Users/ketan/Learning/Slow-Down-Time/client
npm run build
cd /Users/ketan/Learning/Slow-Down-Time

# 2. Remove everything from the remote server first
echo "====== Clearing previous files on server ======"
ssh siu 'rm -rf ~/slow-down-time/* ~/client.tar.gz ~/server.tar.gz'

# 3. Remove any existing tar files locally
echo "====== Removing existing archives ======"
rm -f client.tar.gz server.tar.gz

# 4. Create tar archives of client build and server
echo "====== Creating code archives ======"
tar -czf client-build.tar.gz -C /Users/ketan/Learning/Slow-Down-Time/client/.output .
tar -czf server.tar.gz -C /Users/ketan/Learning/Slow-Down-Time server

# 5. Copy files to the server
echo "====== Copying files to server ======"
scp /Users/ketan/Learning/Slow-Down-Time/client-build.tar.gz \
    /Users/ketan/Learning/Slow-Down-Time/server.tar.gz \
    /Users/ketan/Learning/Slow-Down-Time/start.sh \
    /Users/ketan/Learning/Slow-Down-Time/client/ecosystem.config.js \
    /Users/ketan/Learning/Slow-Down-Time/server/.env.production \
    siu:/home/ketan/

# 6. Extract archives on the server
echo "====== Extracting code on server ======"
ssh siu '
# Create directories
mkdir -p ~/slow-down-time/client/.output
mkdir -p ~/slow-down-time/server

# Extract the code archives
tar -xzf ~/server.tar.gz -C ~/slow-down-time
tar -xzf ~/client-build.tar.gz -C ~/slow-down-time/client/.output

# Move ecosystem config to client directory and .env.production to server directory
mv ~/ecosystem.config.js ~/slow-down-time/client/
mv ~/.env.production ~/slow-down-time/server/.env
'

# 7. Run start script on server
echo "====== Starting application on server ======"
ssh siu 'bash ~/start.sh'

echo "====== Deployment complete! ======"
echo "Visit your application at: http://159.65.154.80:3000"
echo "API is available at: http://159.65.154.80:3001/api"
