#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "${BLUE}🚀 Starting project setup...${NC}"

# Install all dependencies
echo "${BLUE}📦 Installing dependencies...${NC}"
yarn install
echo "${GREEN}✅ Dependencies installed${NC}"

# Build hospital-lib
echo "${BLUE}🔨 Building hospital-lib...${NC}"
yarn workspace hospital-lib build
echo "${GREEN}✅ hospital-lib built successfully${NC}"

# Additional setup for frontend if needed
echo "${BLUE}🎨 Setting up frontend...${NC}"
yarn workspace hospital-fe install
echo "${GREEN}✅ Frontend setup complete${NC}"

# Additional setup for backend if needed
echo "${BLUE}🔧 Setting up backend...${NC}"
yarn workspace hospital-be install
echo "${GREEN}✅ Backend setup complete${NC}"

echo "${GREEN}✨ Setup complete! You can now run:${NC}"
echo "yarn start      # To start both frontend and backend"
echo "yarn start:fe   # To start frontend only"
echo "yarn start:be   # To start backend only" 