# 😎 Backend Insight Blog API

This project is a blog management system with authentication and role-based access control. Users and admins have specific permissions, ensuring a secure and organized workflow which is built with [Node.js](https://nodejs.org/), [express.js](https://expressjs.com/), [mongoose](https://mongoosejs.com), [typescript](https://www.typescript.org) and ❤️.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About The Project

This api allows a user to create his/her blog and update or delete his/her blog. Admin can block a user or delete a blog post.

## Demo

![App Screenshot](https://i.ibb.co.com/TYhx90h/ed4dc542-c5ae-4189-9676-064fae7a9eb9.webp)

👉 [Live Demo](https://backend-insight.vercel.app/api)

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **DevDependncy:** Typescript
- **Deployment:** Vercel

## Installation

Prerequisites
Node.js: Ensure Node.js (v14 or later) is installed.
MongoDB: A running MongoDB instance is required.

## Installation

Prerequisites
Node.js: Ensure Node.js (v14 or later) is installed.
MongoDB: A running MongoDB instance is required.

### Clone the Repository

```bash
Copy code
git clone https://github.com/your-repo/banckendInsight.git
cd banckendInsight
```

### Install Dependencies

```
npm install
```

### Environment Variables

Create a .env file in the project root and configure the following variables:

```
NODE_ENV=development
PORT=5000
DB_USERNAME= db username
DB_PASSWORD= db password
DB_URL= mongodb connection string
BCRYPT_SALT_ROUNDS= bcrypt salt rounds for hashing
JWT_ACCESS_SECRET= your jwt secret
JWT_ACCESS_EXPIRES_IN= '1d'
JWT_REFRESH_SERCRET= your jwt refresh secret
JWT_REFRESH_EXPIRES_IN=365d
```

### Start the Server

Run the development server:

```
npm run start:dev
```

### For production:

```
npm run build
npm run start:prod
```

The API will be available at <span style="background-color:rgb(72, 72, 72);">http://localhost:5000`</span>

## Features

### Authentication

- Secure user login and registration with hashed passwords.
- Role-based access control for users (`user`) and administrators (`admin`).

### User Capabilities

- Users can:
  - Create blog posts.
  - Update their own blog posts.
  - Delete their own blog posts.

### Admin Capabilities

- Admins can:
  - Delete any blog post.
  - Block users from accessing the platform.

---

## Schema Details

### User Schema

- **Fields**:
  - `name` (String, required): Name of the user.
  - `email` (String, required, unique): User's email address.
  - `password` (String, required): User's hashed password.
  - `role` (String, default: `user`): Role of the user, either `user` or `admin`.
  - `isBlocked` (Boolean, default: `false`): Whether the user is blocked.
- **Timestamps**: Automatically tracks creation and update times.

### Blog Schema

- **Fields**:
  - `title` (String, required): Title of the blog.
  - `content` (String, required): Content of the blog post.
  - `author` (ObjectId, required): Reference to the User schema.
  - `isPublished` (Boolean, default: `true`): Whether the blog is published.
- **Timestamps**: Automatically tracks creation and update times.

---

## API Endpoints

### Authentication

1. **Register**:

   - **Endpoint**: `POST /api/auth/register`
   - **Request Body**:
     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "password": "password123"
     }
     ```

2. **Login**:
   - **Endpoint**: `POST /api/auth/login`
   - **Request Body**:
     ```json
     {
       "email": "john.doe@example.com",
       "password": "password123"
     }
     ```

### Blog Management

1. **Create Blog**:

   - **Endpoint**: `POST /api/blogs`
   - **Description**: Allows users to create a new blog post.

2. **Update Blog**:

   - **Endpoint**: `PATCH /api/blogs/:id`
   - **Description**: Allows logged in users to update their own blog posts.

3. **Delete Blog**:
   - **Endpoint**: `DELETE /api/blogs/:id`
   - **Description**:
     - Allows logged in users can delete their own blogs.

### Admin Features

1. **Block User**:

   - **Endpoint**: `PUT /api/admin/users/:userId/block`
   - **Description**: Admins can block a user.

2. **Delete Any Blog**:
   - **Endpoint**: `DELETE /api/admin/blogs/:id`
   - **Description**: Admins can delete any blog.

---

## Advanced Query Features

### Pagination

- **Description**: The API supports pagination to fetch a subset of results at a time.
- **How to Use**:
  - Use `page` and `limit` query parameters in the request.
  - Default `page` is 1, and default `limit` is 10 if not provided.
- **Example**:
  - Request: `GET /api/blogs?page=2&limit=5`
  - Fetches the second set of 5 blogs.

### Sorting

- **Description**: The API allows sorting results based on any field.
- **How to Use**:
  - Use the `sort` query parameter and provide the field name(s).
  - Use a `-` prefix for descending order (e.g., `-createdAt`).
- **Example**:
  - Request: `GET /api/blogs?sort=createdAt`
  - Sorts blogs in ascending order of `createdAt`.
  - Request: `GET /api/blogs?sort=-createdAt`
  - Sorts blogs in descending order of `createdAt`.

### Field Limiting

- **Description**: The API allows clients to limit the fields returned in the response.
- **How to Use**:
  - Use the `fields` query parameter to specify fields to include.
  - Separate multiple fields with a comma.
- **Example**:
  - Request: `GET /api/blogs?fields=title,content`
  - Response includes only the `title` and `content` fields for each blog.

### Filtering

- **Description**: The API supports filtering based on specific fields.
- **How to Use**:
  - Add query parameters corresponding to the field names to filter.
- **Example**:
  - Request: `GET /api/blogs?author=12345`
  - Fetches blogs where `author` is `12345`.

---

## Full Query Example

**Request**:  
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   ```

## Contributing

1. Fork the repository.
2. Create a new feature branch: <span style="background-color: "rgb(44, 44, 44)">git checkout -b feature-name</span>.
3. Commit your changes: <span style="background-color: "rgb(44, 44, 44)">git commit -m "Add feature"</span> .
4. Push to the branch: <span style="background-color: "rgb(44, 44, 44)">git push origin feature-name</span> .
5. Open a pull request.

## License

This project is licensed under the MIT License. See the <span style="background-color: "rgb(44, 44, 44)">LICENSE</span> file for details.
