# Uber Clone Project

## Features

- **User Registration and Login**: Users can register and log in to the application.
- **Captain Registration and Login**: Captains can register and log in to the application.
- **Ride Creation**: Users can create a ride by specifying pickup and destination locations.
- **Fare Calculation**: The application calculates the fare based on the distance and time between the pickup and destination.
- **Real-time Location Tracking**: Captains can update their location in real-time.
- **Ride Confirmation**: Captains can confirm rides, and users are notified when a ride is confirmed.
- **Ride Start and End**: Captains can start and end rides, and users are notified accordingly.
- **Logout**: Users and captains can log out, and their tokens are blacklisted.

## Prerequisites

- Node.js
- MongoDB
- Google Maps API Key

## Getting Started

### Backend

1. **Navigate to the Backend Directory**:
    ```sh
    cd Backend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` File**:
    ```sh
    touch .env
    ```

4. **Add Environment Variables**:
    ```env
    PORT=4000
    MONGODB_URI=mongodb://0.0.0.0/uber
    JWT_SECRET_KEY=uber_secret_key
    GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
    ```

5. **Start the Backend Server**:
    ```sh
    npm start
    ```

### Frontend

1. **Navigate to the Frontend Directory**:
    ```sh
    cd frontend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` File**:
    ```sh
    touch .env
    ```

4. **Add Environment Variables**:
    ```env
    VITE_BASE_URL=http://localhost:4000
    VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_API_KEY
    ```

5. **Start the Frontend Server**:
    ```sh
    npm run dev
    ```

### Access the Application

- **Frontend**: Open your browser and navigate to `http://localhost:5173`
- **Backend**: The backend server will be running on `http://localhost:4000`

## Project Structure

### Backend

- **Controllers**: Handles the logic for different routes.
- **Models**: Defines the data schema for MongoDB.
- **Routes**: Defines the API endpoints.
- **Services**: Contains business logic and interacts with models.
- **Middlewares**: Contains authentication and other middleware functions.
- **Socket**: Handles real-time communication using Socket.io.

### Frontend

- **Components**: Contains reusable React components.
- **Context**: Manages global state using React Context API.
- **Pages**: Contains different pages of the application.
- **Assets**: Contains static assets like images and icons.

## Important Endpoints

### User Endpoints

- **Register**: `POST /users/register`
- **Login**: `POST /users/login`
- **Profile**: `GET /users/profile`
- **Logout**: `GET /users/logout`

### Captain Endpoints

- **Register**: `POST /captains/register`
- **Login**: `POST /captains/login`
- **Profile**: `GET /captains/profile`
- **Logout**: `GET /captains/logout`

### Ride Endpoints

- **Create Ride**: `POST /rides/create`
- **Get Fare**: `GET /rides/get-fare`
- **Confirm Ride**: `POST /rides/confirm`
- **Start Ride**: `GET /rides/start-ride`
- **End Ride**: `POST /rides/end-ride`

### Maps Endpoints

- **Get Coordinates**: `GET /maps/get-coordinates`
- **Get Distance and Time**: `GET /maps/get-distance-time`
- **Get Suggestions**: `GET /maps/get-suggestions`

## Conclusion

This project provides a basic Uber clone with essential features like user and captain registration, ride creation, fare calculation, and real-time location tracking. Follow the steps above to set up and run the project locally.
