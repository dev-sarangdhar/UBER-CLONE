# Backend API Documentation

## Endpoint: `/users/register`

### Description

This endpoint is used to register a new user in the system. It validates the input data, hashes the password, and stores the user information in the database.

### Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

| Field                | Type   | Required | Description                                    |
| -------------------- | ------ | -------- | ---------------------------------------------- |
| `fullname.firstname` | String | Yes      | The first name of the user (min 3 characters). |
| `fullname.lastname`  | String | No       | The last name of the user (min 3 characters).  |
| `email`              | String | Yes      | A valid email address.                         |
| `password`           | String | Yes      | A password with a minimum of 6 characters.     |

### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response

#### Success Response

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "64f1c2e5b5d6c2a1b8e4f123",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Error Responses

- **Status Code:** `400 Bad Request`

  - **Reason:** Validation errors in the input data.
  - **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address.",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **Status Code:** `500 Internal Server Error`
  - **Reason:** Server-side error during user registration.
  - **Body:**
    ```json
    {
      "error": "Internal server error"
    }
    ```

### Example Response

#### Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1c2e5b5d6c2a1b8e4f123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Error Response

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email address.",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Notes

- Ensure the `Content-Type` header is set to `application/json` in the request.
- The `token` in the response is a JWT token that can be used for authentication in subsequent requests.

## Endpoint: `/users/login`

### Description

This endpoint is used to authenticate a user. It validates the input data, checks the credentials, and returns a JWT token if the login is successful.

### Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

| Field      | Type   | Required | Description                        |
| ---------- | ------ | -------- | ---------------------------------- |
| `email`    | String | Yes      | A valid email address.             |
| `password` | String | Yes      | The user's password.               |

### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response

#### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "64f1c2e5b5d6c2a1b8e4f123",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Error Responses

- **Status Code:** `400 Bad Request`

  - **Reason:** Validation errors in the input data.
  - **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address.",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **Status Code:** `401 Unauthorized`

  - **Reason:** Invalid email or password.
  - **Body:**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

- **Status Code:** `500 Internal Server Error`
  - **Reason:** Server-side error during login.
  - **Body:**
    ```json
    {
      "error": "Internal server error"
    }
    ```

### Notes

- Ensure the `Content-Type` header is set to `application/json` in the request.
- The `token` in the response is a JWT token that can be used for authentication in subsequent requests.

## Endpoint: `/users/logout`

### Description

This endpoint logs out the user by blacklisting the token and clearing the authentication cookie.

### Method

`GET`

### Response

#### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Error Responses

- **Status Code:** `400 Bad Request`
  - **Reason:** No token provided.
  - **Body:**
    ```json
    {
      "message": "No token provided"
    }
    ```

- **Status Code:** `500 Internal Server Error`
  - **Reason:** Server-side error during logout.
  - **Body:**
    ```json
    {
      "message": "Error logging out",
      "error": "Detailed error message"
    }
    ```

---

## Endpoint: `/profile`

### Description

This endpoint retrieves the profile of the authenticated user.

### Method

`GET`

### Response

#### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "64f1c2e5b5d6c2a1b8e4f123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

#### Error Responses

- **Status Code:** `401 Unauthorized`
  - **Reason:** User is not authenticated.
  - **Body:**
    ```json
    {
      "message": "Unauthorized access"
    }
    ```

- **Status Code:** `500 Internal Server Error`
  - **Reason:** Server-side error during profile retrieval.
  - **Body:**
    ```json
    {
      "message": "Server error",
      "error": "Detailed error message"
    }
    ```
