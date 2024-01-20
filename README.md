# Configuration Management Panel

## Overview
This project implements a configuration management panel and a REST API to serve configuration JSON files for mobile applications. The system allows application managers to log in and update configuration parameters through a Vue.js (3) front end and ensures that conflicts are prevented when multiple users are editing parameters simultaneously.

## Technologies Used
- **Front End:**
    - vue.js
    - bootstrap
    - axios
    - firebase
    - pinia
    - vue-router
    - vue-cookie-next
    - sass
    - vite
- **Back End:**
    - node.js
    - express.js
    - firebase-admin
    - helmet
    - joi
    - http-status
    - cors

## Features
1. **Configuration Management Panel:**
   - Users can log in to the panel to access and update configuration parameters.
   - Two pages: Homepage("/") and Sign in Page ("/signin)
   - The panel provides a user-friendly interface for modifying configuration data.
   - Implemented using Vue.js (3) for dynamic and responsive front-end interactions for mobile users.
2. **REST API:**
   - Serves configuration for the mobile applications in JSON format.
   - Built using Node.js for a scalable and efficient back-end solution.
   - Pre-defined API token is checked for mobile clients.
3. **Conflict Prevention**
   - Implemented a mechanism to prevent conflicts when multiple users edit parameters simultaneously.
   - Ensures that later edits do not overwrite changes made by earlier users.
4. **Authentication**
   - Firebase Auth is utilized for secure use authentication.
   - Firebase ID token is required for authorization in the "Authorization" header for any update requests.
5. **Firestore Database**
   - Firestore is used to store configurations securely
6. **Environment Variables**
   - Environment variables are used to avoid hard-coding sensitive information.
   - Detailed deployment instructions are provided in the README, including an example .env file for necessary environment variables.

## Screenshots
1. **Sign-in page**
   ![sign in page](/screenshots/signin.png)
   
3. **Home page**
   ![home page](/screenshots/home.png)
   
5. **Home page responsive**
   <br>
   ![home page responsive](/screenshots/home_responsive.png)
   
## Setup Instructions
1. **Clone the Repository:**
```
git clone https://github.com/serkannkoc/configuration-management.git 
```
2. **Install Dependencies:**
```
# Install front-end dependencies
cd frontend
npm install

# Install back-end dependencies
cd backend
npm install
```
3. **Configure Environment Variables:**
    - Create a .env file for back-end
        ```
        cd backend
        touch .env
        ```
    - Declare Variables
        - FIREBASE_CONFIG -> This is your firebase service account
        - APP_PORT=3000
        - STATIC_TOKEN=AbCdEfGhIjKlMnOpQrStUvWxYz0123456789
    - Create a .env file for front-end
        ```
        cd frontend
        cd src
        touch .env
        ```
    - Declare Variables 
      - VITE_FIREBASE_CONFIG -> This is your firebase config
      - VITE_API_URL=http://localhost:3000


4. **Run the Application:**
   - Start the back-end:
      ```
      cd backend
      npm start
      ```
   - Start the front-end:
     ```
     cd frontend
     npm start
     ```
   
5. **Access the Application:**
   - Open your browser and navigate to 'http://localhost:5700/' to access the configuration management panel. Create a user in firebase and use the credentials for signing in.
