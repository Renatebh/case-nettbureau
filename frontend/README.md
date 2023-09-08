# Users

Brief description of your project.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
  - [Examples](#examples)
- [API Documentation (if applicable)](#api-documentation)

## Getting Started

This project is created by vite and react. Its using css modules to add style.<br><br>
Frontend is using: localhost:5173<br>
Backend is using: localhost:8080

### Prerequisites

Before you begin, ensure you have met the following prerequisites:

- **Node.js:** Make sure you have Node.js installed on your computer. You can download it from [nodejs.org](https://nodejs.org/) and check its version using:

- Node.js (Version 16.16.0)<br>
  You can verify node installation by running:

```bash
node -v
```

- **Vite:** This project uses Vite as the build tool. If you don't have Vite installed, you can install it globally:

```bash
npm install -g create-vite
```

- **MySQL:**

### Setting Up the MySQL Database

To use the database endpoint of this project, you'll need to set up a MySQL database. Follow these steps to get started:

1. **Install MySQL:** If you don't have MySQL installed, you can download it from the official MySQL website and follow the installation instructions for your operating system.

2. **Create a MySQL Database:** Using MySQL, create a new database to store the data from this project. You can use MySQL command-line tools or a graphical interface like phpMyAdmin to create the database.

3. **Configure Your Project:** In your project's configuration file, specify the MySQL database host, username, password, and the name of the database you created in the previous step.

4. **Run Migrations (if applicable):** Depending on your project setup, you may need to run database migrations to create the necessary tables and schema for your project. Refer to your project's documentation or database framework for specific instructions.

5. **Start the MySQL Server:** Ensure that your MySQL database server is running and accessible.

Now, your project is ready to use the MySQL database endpoint. When you submit data through the project's form, it will be stored in the MySQL database you've set up.

## Frontend Dependencies

The frontend of this project relies on the following dependencies

- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers) ^3.3.1
- [axios](https://www.npmjs.com/package/axios) ^1.5.0
- [react](https://www.npmjs.com/package/react) ^18.2.0
- [react-dom](https://www.npmjs.com/package/react-dom) ^18.2.0
- [react-hook-form](https://www.npmjs.com/package/react-hook-form) ^7.45.4
- [zod](https://www.npmjs.com/package/zod) ^3.22.2

## Backend Dependencies

The backend of this project relies on the following dependencies:

- [axios](https://www.npmjs.com/package/axios) ^1.5.0: Promise-based HTTP client for the browser and Node.js.
- [body-parser](https://www.npmjs.com/package/body-parser) ^1.20.2: Node.js body parsing middleware.
- [cors](https://www.npmjs.com/package/cors) ^2.8.5: Middleware to enable Cross-Origin Resource Sharing (CORS).
- [express](https://www.npmjs.com/package/express) ^4.18.2: A fast, unopinionated, minimalist web framework for Node.js.
- [express-validator](https://www.npmjs.com/package/express-validator) ^7.0.1: A set of Express.js middlewares for input validation.
- [mysql2](https://www.npmjs.com/package/mysql2) ^3.6.0: A Node.js-based MySQL library for connecting to MySQL databases.
- [nodemailer](https://www.npmjs.com/package/nodemailer) ^6.9.4: Send email using Node.js.
- [nodemon](https://www.npmjs.com/package/nodemon) ^3.0.1: Automatically restart the server during development when files change.

## Usage

It is two ways to use this project:<br>

- **Database enpoint:** You can add data to an sql database by using this enpoint: "http://localhost:8080/api/addData" <br>If you use this endpoint you must also start the backend server, and the sql server. <br><br>
- **Nettbureau endpoint:**
  You can send data to this server here: "https://case.nettbureau.no/submit" and get a response.

### Example

```bash
# Comment in the endpoint you want to use in Form.tsx
  const response = await axios.post(
        // "https://case.nettbureau.no/submit",
        "http://localhost:8080/api/addData",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
      );

```

## Database endpoint

If you use the database endpoint you must also start the backend in this project.<br> To start the backend:

### 1. Change to backend dir

```bash
cd backend
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Start backend server

```bash
node app.js
```

Open localhost for frontend and type in the data in the form. The form is validating the data an is givivng you errors if not the correct data is provided. It checks also if the postal code is an actual postal code, by using the response from the backend. When data is sent successfully a modal pops-up, with a message "Success sending data". The data is added to the database. It also ends an email to verify.

## Nettbureau endpoint

If you use this enpoint, it will only return a 200 response from the server.
