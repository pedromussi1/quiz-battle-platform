#!/bin/bash

# Quiz Battle Platform - Quick Start Script

echo "🚀 Quiz Battle Platform - Quick Start"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js version: $(node -v)"
echo ""

# Create .env files from examples
echo "📝 Creating .env files..."
if [ ! -f server/.env ]; then
    cp server/.env.example server/.env
    echo "✓ Created server/.env (Please edit with your credentials)"
else
    echo "⚠ server/.env already exists"
fi

if [ ! -f client/.env ]; then
    cp client/.env.example client/.env
    echo "✓ Created client/.env (Please edit with your API URL)"
else
    echo "⚠ client/.env already exists"
fi

echo ""
echo "📦 Installing dependencies..."

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install
cd ..
echo "✓ Server dependencies installed"

# Install client dependencies
echo "Installing client dependencies..."
cd client
npm install
cd ..
echo "✓ Client dependencies installed"

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit server/.env with your MongoDB, OAuth, and Cloudinary credentials"
echo "2. Edit client/.env with your API URL"
echo ""
echo "To start development:"
echo "  Terminal 1: cd server && npm start"
echo "  Terminal 2: cd client && npm start"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
