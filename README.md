# Nalanda Library Management System

Nalanda is a library management system designed to handle user management, book management, and borrowing functionalities. This project demonstrates a backend system built using Node.js, Express, and MongoDB.

## Features

- **User Management:**

  - User Registration
  - User Login
  - Role-based Access Control (Admin and Member)

- **Book Management:**

  - Add, Update, Delete Books (Admin only)
  - List Books with Pagination and Filtering

- **Borrowing System:**

  - Borrow Book (Members only)
  - Return Book (Members only)
  - View Borrowing History (Members only)

- **Reports and Aggregations:**
  - Most Borrowed Books
  - Active Members
  - Book Availability

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sheeshmirza/nalanda-library.git
   cd nalanda-library
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   PORT = 3000
   MONGO_URI = "mongodb://localhost:27017/nalanda"
   JWT_SECRET = "your_jwt_secret"
   ```

4. Start the server:
   ```bash
   npm run start:dev
   ```

## API Endpoints

### User Management

- **Register User**

  - **Endpoint**: `POST /api/users/register`
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **Login User**
  - **Endpoint**: `POST /api/users/login`
  - **Request Body**:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "jwt_token_here"
    }
    ```

### Book Management

- **Add Book**

  - **Endpoint**: `POST /api/books`
  - **Request Body**:
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "ISBN": "123-4567890123",
      "publication_date": "2023-01-01",
      "genre": "Fiction",
      "copies": 5
    }
    ```
  - **Response**:
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "ISBN": "123-4567890123",
      "publication_date": "2023-01-01",
      "genre": "Fiction",
      "copies": 5,
      "_id": "book_id_here"
    }
    ```

- **Update Book**

  - **Endpoint**: `PUT /api/books/:id`
  - **Request Body**:
    ```json
    {
      "title": "Updated Book Title",
      "author": "Updated Author Name",
      "ISBN": "123-4567890123",
      "publication_date": "2023-01-01",
      "genre": "Fiction",
      "copies": 5
    }
    ```
  - **Response**:
    ```json
    {
      "title": "Updated Book Title",
      "author": "Updated Author Name",
      "ISBN": "123-4567890123",
      "publication_date": "2023-01-01",
      "genre": "Fiction",
      "copies": 5,
      "_id": "book_id_here"
    }
    ```

- **Delete Book**

  - **Endpoint**: `DELETE /api/books/:id`
  - **Response**:
    ```json
    {
      "message": "Book deleted successfully"
    }
    ```

- **List Books**
  - **Endpoint**: `GET /api/books`
  - **Query Parameters**: `page`, `limit`, `genre`, `author`
  - **Response**:
    ```json
    [
        {
            "_id": "book_id_here",
            "title": "Book Title",
            "author": "Author Name",
            "ISBN": "123-4567890123",
            "publication_date": "2023-01-01",
            "genre": "Fiction",
            "copies": 5
        },
        ...
    ]
    ```

### Borrowing System

- **Borrow Book**

  - **Endpoint**: `POST /api/borrowings/borrow`
  - **Request Body**:
    ```json
    {
      "book_id": "book_id_here"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Book borrowed successfully",
      "borrow": {
        "_id": "borrow_id_here",
        "user_id": "user_id_here",
        "book_id": "book_id_here",
        "borrow_date": "2023-06-14T00:00:00.000Z",
        "status": "Borrowed"
      }
    }
    ```

- **Return Book**

  - **Endpoint**: `POST /api/borrowings/return`
  - **Request Body**:
    ```json
    {
      "borrowing_id": "borrowing_id_here"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Book returned successfully"
    }
    ```

- **Borrow History**
  - **Endpoint**: `GET /api/borrowings/history`
  - **Response**:
    ```json
    [
        {
            "_id": "borrow_id_here",
            "book_id": {
                "title": "Book Title",
                "author": "Author Name"
            },
            "borrow_date": "2023-06-14T00:00:00.000Z",
            "status": "Borrowed"
        },
        ...
    ]
    ```

### Reports and Aggregations

- **Most Borrowed Books**

  - **Endpoint**: `GET /api/borrowings/most-borrowed-books`
  - **Response**:
    ```json
    [
        {
            "title": "Book Title",
            "author": "Author Name",
            "borrowCount": 10
        },
        ...
    ]
    ```

- **Most Active Members**

  - **Endpoint**: `GET /api/borrowings/most-active-members`
  - **Response**:
    ```json
    [
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "borrowCount": 15
        },
        ...
    ]
    ```

- **Book Availability**
  - **Endpoint**: `GET /api/borrowings/book-availability`
  - **Response**:
    ```json
    {
      "totalBooks": 100,
      "borrowedBooks": 30,
      "availableBooks": 70
    }
    ```
