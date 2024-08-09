# Canvas App

This repository contains the frontend and backend for a Canvas App

- `/frontend`: Angular application with the drawing canvas
- `/backend`: A Flask REST API for user authentication and saving user-based event-log information

## Setup Guide

### Backend Setup (Flask)

1. **Navigate to the backend directory:**

   ```sh
   cd backend
   ```

2. **Create a virtual environment:**

   ```sh
   python -m venv venv
   ```

3. **Activate the virtual environment:**

   - On Windows:
     ```sh
     .\venv\Scripts\activate
     ```
   - On Windows Git Bash:
     ```sh
     source venv/Scripts/activate
     ```
   - On macOS and Linux:
     ```sh
     source venv/bin/activate
     ```

4. **Install dependencies:**

   ```sh
   pip install -r requirements.txt
   ```

5. **Run the application:**

   ```sh
   flask run
   ```

6. **Access API documentation:**
   Open your browser and navigate to [http://localhost:5000/apidocs](http://localhost:5000/apidocs)

### Frontend Setup (Angular)

1. **Navigate to the frontend directory:**

   ```sh
   cd frontend
   ```

2. **Install Node.js and npm:**

   - Download and install from [nodejs.org](https://nodejs.org/)

3. **Install Angular CLI globally (if not already installed):**

   ```sh
   npm install -g @angular/cli
   ```

4. **Install project dependencies:**

   ```sh
   npm install
   ```

5. **Serve the Angular application:**

   ```sh
   ng serve
   ```

6. **Access the frontend application:**
   Open your browser and navigate to [http://localhost:4200](http://localhost:4200)
