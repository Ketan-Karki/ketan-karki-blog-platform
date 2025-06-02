#!/bin/bash

# Ketan Blog - Start Script
# This script should be run on the server after code deployment

set -e

APP_DIR="/home/ketan/ketan-blog"
CLIENT_DIR="$APP_DIR/client"
SERVER_DIR="$APP_DIR/server"

echo "====== Starting Ketan Blog Application ======"

# 1. Setup Server Environment
echo "\n====== Setting up server environment ======"
cat > "$SERVER_DIR/.env" << EOF
NODE_ENV=production
PORT=3001
CLIENT_URL=http://159.65.154.80:3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=slowdowntime
EOF

echo "Server environment configured"

# 2. Install dependencies and build server
echo "\n====== Building server application ======"
cd "$SERVER_DIR"
npm install
npm run build

# 3. Start applications with PM2
echo "\n====== Starting applications with PM2 ======"

# Start server
cd "$SERVER_DIR"
pm2 stop ketan-blog-server 2>/dev/null || true
pm2 start npm --name "ketan-blog-server" -- run start:prod

# Start client using the ecosystem config
cd "$CLIENT_DIR"
pm2 stop ketan-blog-client 2>/dev/null || true
pm2 start ecosystem.config.js

# 4. Save PM2 configuration to survive reboots
echo "\n====== Configuring PM2 to survive reboots ======"
pm2 save

echo "\n====== Setup complete! ======"
echo "The application is now running at: http://159.65.154.80:3000"
echo "API server is running at: http://159.65.154.80:3001/api"
echo "PM2 Status:"
pm2 status
