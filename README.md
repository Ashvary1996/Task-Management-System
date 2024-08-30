# Task Management System

## Overview

The Task Management System is a web application that allows users to manage tasks efficiently. Users can add, edit, delete, and toggle the completion status of tasks. The application also features user authentication for secure access.

## Features

- **User Registration and Login**: Secure user registration and login functionality.
- **Task Management**: Create, view, edit, delete, and manage tasks with a due date.
- **Task Completion**: Toggle task status between pending and completed.
- **Responsive Design**: Accessible and user-friendly on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Tailwind CSS
- **Notifications**: React Toastify

## Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file for environment variables and add all those:

    ```bash
      PORT=5000
      JWT_SECRET=your_jwt_secret
      DB_HOST=localhost
      DB_USER=root
      DB_PASS=yourPassword
      DB_NAME=task_management_db
    ```

4. Edit the `.env` file to include your database credentials and other settings.


5. Start the backend server:

    ```bash
    npm start
    ```

## Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

## Usage

### Register a New Account

Navigate to `/signup` and complete the registration form.

### Login

Go to `/login` and enter your credentials to log in.

### Task Management

After logging in, you’ll be redirected to `/home` where you can:

- **View**: See a list of your tasks.
- **Add**: Create a new task with a title, description, and due date.
- **Edit**: Modify existing tasks.
- **Delete**: Remove tasks.
- **Complete/Incomplete**: Toggle the status of tasks.

## API Endpoints

### User Authentication

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Log in and obtain a JWT token.

### Tasks

- **GET /api/tasks**: Fetch all tasks.
- **POST /api/tasks**: Create a new task.
- **PUT /api/tasks/:id**: Update an existing task.
- **DELETE /api/tasks/:id**: Delete a task.

## Advanced Features

### Frontend

- Utilize React Hooks for state management.
- Ensure a seamless user experience with responsive design.

### Backend

- Implement robust request validation and error handling.
- Secure endpoints using JWT for authentication.
- Configure environment variables for flexibility.

