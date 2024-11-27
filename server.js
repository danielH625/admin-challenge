const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware to set default cookie if not already set
app.use((req, res, next) => {
  if (!req.cookies.role) {
    res.cookie("role", "user", { httpOnly: true, path: "/" });
    console.log("Cookie 'role=user' set for the client");
  }
  next();
});

// Serve the main page
app.get("/", (req, res) => {
  const role = req.cookies.role || "user";

  if (role === "admin") {
    res.send(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <title>Admin Portal</title>
          <style>
            body { font-family: 'Roboto', sans-serif; background-color: #e9ecef; color: #343a40; margin: 0; padding: 0; }
            .container { max-width: 700px; margin: 100px auto; padding: 30px; background-color: #ffffff; box-shadow: 0 6px 12px rgba(0,0,0,0.1); border-radius: 10px; }
            h1 { color: #007bff; }
            .success { color: #28a745; font-weight: bold; }
            footer { text-align: center; margin-top: 50px; color: #6c757d; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome, Admin!</h1>
            <p>Manage all your flags here!</p>
            <p class="success">The password is: <strong>CTF{admin_access}</strong></p>
          </div>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <title>Admin Portal</title>
          <style>
            body { font-family: 'Roboto', sans-serif; background-color: #e9ecef; color: #343a40; margin: 0; padding: 0; }
            .container { max-width: 700px; margin: 100px auto; padding: 30px; background-color: #ffffff; box-shadow: 0 6px 12px rgba(0,0,0,0.1); border-radius: 10px; }
            h1 { color: #007bff; }
            .alert { color: #dc3545; font-weight: bold; }
            footer { text-align: center; margin-top: 50px; color: #6c757d; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to the Admin Portal</h1>
            <p>Manage all your flags here!</p>
            <p class="alert">Access denied. This page is only available to administrators.</p>
          </div>
        </body>
      </html>
    `);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
