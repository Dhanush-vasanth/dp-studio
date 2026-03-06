#!/bin/bash
# DP Studio - Start All Services Script for Mac/Linux

echo ""
echo "============================================"
echo "    DP Studio - Starting All Services"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if MongoDB is running (optional)
if command -v mongod &> /dev/null; then
    echo "Starting MongoDB..."
    mongod &
    sleep 2
fi

# Start Backend
echo ""
echo "Starting Backend Server..."
cd server && npm run dev &
BACKEND_PID=$!
sleep 3

# Start Frontend
echo ""
echo "Starting Frontend Server..."
cd ../client && npm run dev &
FRONTEND_PID=$!

echo ""
echo "============================================"
echo "All services started!"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo ""
echo "Process IDs:"
echo "Backend:  $BACKEND_PID"
echo "Frontend: $FRONTEND_PID"
echo ""
echo "To stop, press Ctrl+C or kill the PIDs above"
echo "============================================"
echo ""

wait
