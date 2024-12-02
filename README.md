# Blog Website Server

This is the backend server for a blog website. It provides RESTful APIs for user authentication, blog post management, comment management, and user management. The server is built using **Express.js** and follows best practices for authentication, authorization, and request validation.

---

## Features

### User Authentication

- **Signup**: `/signup` - Register a new user with email verification.
- **Verify Email**: `/verify-email` - Confirm a user's email address.
- **Signin**: `/signin` - Login a user and provide a JWT.
- **Forgot Password**: `/forgot-password` - Send a reset password email.
- **Reset Password**: `/reset-password` - Reset the user's password using the token.
- **Logout**: `/logout` - Invalidate the user's session.

### Blog Posts

- **Create Post**: `/posts/create` - Create a new blog post (authenticated).
- **Get All Posts**: `/posts/all` - Fetch all blog posts.
- **Get Single Post**: `/posts/single/:id` - Fetch details of a specific blog post.
- **Update Post**: `/posts/update/:id` - Update an existing post (authenticated).
- **Delete Post**: `/posts/delete/:id` - Delete a blog post (authenticated).

### Comments

- **Create Comment**: `/comments/create` - Add a comment to a post (authenticated).
- **Get All Comments**: `/comments/all` - Fetch comments for a post (authenticated).
- **Like/Unlike Comment**: `/comments/like-unlike` - Like or unlike a comment (authenticated).
- **Edit Comment**: `/comments/edit/:id` - Edit an existing comment (authenticated).
- **Delete Comment**: `/comments/delete/:id` - Delete a comment (authenticated).

### User Management

- **Get All Users**: `/users/all` - Fetch all users (admin-only).
- **Get Single User**: `/users/single/:id` - Fetch details of a specific user (authenticated).
- **Update User**: `/users/update/:id` - Update user information (authenticated).
- **Delete User**: `/users/delete/:id` - Remove a user (admin-only).

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/badaruddinomar/blog-website-server.git
   cd blog-website-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run start:dev
   ```

---

## API Reference

The server provides the following APIs:

```bash
Base url: http://localhost:4000/api/v1
```

### User Authentication

| Method | Endpoint                             | Description               |
| ------ | ------------------------------------ | ------------------------- |
| POST   | `/auth/signup`                       | Register a new user       |
| POST   | `/auth/verify-email`                 | Verify user's email       |
| POST   | `/auth/signin`                       | Login user                |
| POST   | `/auth/forgot-password`              | Send reset password email |
| POST   | `/auth/reset-password?token=<token>` | Reset user password       |
| POST   | `/auth/logout`                       | Logout user               |

### Blog Posts

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| POST   | `/posts/create`     | Create a new blog post     |
| GET    | `/posts/all`        | Fetch all blog posts       |
| GET    | `/posts/single/:id` | Fetch a specific blog post |
| PUT    | `/posts/update/:id` | Update a blog post         |
| DELETE | `/posts/delete/:id` | Delete a blog post         |

### Comments

| Method | Endpoint                                       | Description               |
| ------ | ---------------------------------------------- | ------------------------- |
| POST   | `/comments/create`                             | Add a comment to a post   |
| GET    | `/comments/all`                                | Fetch comments for a post |
| POST   | `/comments/like-unlike?commentId=<commenttId>` | Like or unlike a comment  |
| PUT    | `/comments/edit/:id`                           | Edit an existing comment  |
| DELETE | `/comments/delete/:id`                         | Delete a comment          |

### User Management

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| GET    | `/users/all`        | Fetch all users (admin-only) |
| GET    | `/users/single/:id` | Fetch a specific user        |
| PUT    | `/users/update/:id` | Update user details          |
| DELETE | `/users/delete/:id` | Delete a user (admin-only)   |
