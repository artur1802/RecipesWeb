# **Recipe App (MERN Stack)**

## **Overview**
This full-stack web application combines a user-friendly interface with the power of the MERN stack (MongoDB, Express, React, and Node.js). Users can effortlessly create, delete, and save their favorite food recipes, while also benefiting from user registration and authentication using JSON Web Tokens (JWT).

## **Features**
- **User Registration and Authentication**: Secure user login and registration using JWT for authentication.
- **Recipe Management**: Create, read, update, and delete recipes.
- **User-friendly Interface**: Intuitive and responsive UI built with React.
- **Persistent Data Storage**: Recipes are stored in a MongoDB database.

## **Technologies Used**
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)


## **What I Learned**
- **MERN Stack**: Gained hands-on experience in developing a full-stack application using MongoDB, Express, React, and Node.js.
- **JWT Authentication**: Implemented secure user authentication using JSON Web Tokens.
- **CRUD Operations**: Developed RESTful APIs for creating, reading, updating, and deleting recipes.
- **React State Management**: Utilized React state and hooks to manage application state and handle user interactions.
- **Database Integration**: Connected the application to a MongoDB database for persistent data storage.

## **How to Run**
### **Backend**
1. **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` file** in the backend directory and add your MongoDB connection string and JWT secret:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the backend server**:
    ```bash
    npm start
    ```

### **Frontend**
1. **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2. **Install dependencies**:
    ```bash
    yarn install
    ```

3. **Start the frontend server**:
    ```bash
    yarn start
    ```

### **Access the Application**
Open your browser and navigate to `http://localhost:3000` to access the application.
