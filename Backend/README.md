# User API Documentation

## Register User
Register a new user in the system.

### Endpoint 
`POST /api/users/register`

### Request Body
```json
{
    "fullname": {"firstname": "John", "lastname": "Doe"},
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Response

#### Success Response (201 Created)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQzMjEyMzQ1Njc4NzY5NjUiLCJpYXQiOjE3MTYyMzkwMjJ9.B3Z8a3TJxN05cKLx4HjDwXm4OQvVjL5YJHtS123456",
    "user": {
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com"
    }
}
```


#### Error Responses

##### Validation Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "Full name must be at least 3 characters long",
            "param": "fullname.firstname"
        }
    ]
}
```

##### Server Error (500 Internal Server Error)
```json
{
    "message": "Internal server error"
}
```

### Validation Rules
- **firstname**: Required, minimum 3 characters
- **lastname**: Optional, minimum 3 characters if provided
- **email**: Required, must be a valid email format
- **password**: Required, minimum 6 characters

### Notes
- The password is automatically hashed before storing in the database
- A JWT token is generated and returned upon successful registration
- Email must be unique in the system
- The returned user object does not include the password field for security

## Login User
Authenticate an existing user and receive a token.

### Endpoint 
`POST /api/users/login`

### Request Body
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Response

#### Success Response (200 OK)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQzMjEyMzQ1Njc4NzY5NjUiLCJpYXQiOjE3MTYyMzkwMjJ9.B3Z8a3TJxN05cKLx4HjDwXm4OQvVjL5YJHtS123456",
    "user": {
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com"
    }
}
```

#### Error Responses

##### Validation Error (400 Bad Request)
```json
{
    "errors": [
        {
            "msg": "Invalid email address",
            "param": "email"
        }
    ]
}
```

##### Authentication Error (401 Unauthorized)
```json
{
    "message": "Invalid email or password"
}
```

##### Server Error (500 Internal Server Error)
```json
{
    "message": "Internal server error"
}
```

### Validation Rules
- **email**: Required, must be a valid email format
- **password**: Required, minimum 6 characters

### Notes
- The provided password is compared with the stored hashed password
- A JWT token is generated and returned upon successful authentication
- The returned user object does not include the password field for security
