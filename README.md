# Alzikrayat - MERN Edition

A photo sharing app built with MongoDB, Express, React (Vite) and Node.js.
Users can register, log in, upload photos, browse a gallery, comment on photos and delete their own photos.

## Project structure

```
alzikrayat/
  server/   Express REST API (models, routes, controllers, middleware, uploads)
  client/   React app built with Vite (components, pages)
```

## Requirements

- Node.js 18 or newer
- MongoDB running locally, or a MongoDB Atlas connection string

## Setup

### 1. Server

```bash
cd server
npm install
cp .env.example .env     # then edit the values
npm run dev              # or: npm start
```

Environment variables (`server/.env`):

| Name          | Description                                   | Example                                  |
| ------------- | --------------------------------------------- | ---------------------------------------- |
| `MONGODB_URI` | MongoDB connection string                     | `mongodb://127.0.0.1:27017/alzikrayat`   |
| `PORT`        | Port for the API                              | `5000`                                   |
| `CLIENT_URL`  | Allowed origin for CORS (the React app URL)   | `http://localhost:5173`                  |

The `.env` file is listed in `.gitignore` and must not be committed.

### 2. Client

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173. In development, Vite proxies `/api` and `/uploads` to the Express server on port 5000 (see `vite.config.js`).

If the API is deployed on another domain, set `VITE_API_URL` in `client/.env` before building.

## Quick start (two terminals)

```bash
# from the project root, once:
npm run install:all
cp server/.env.example server/.env      # Windows: copy server\.env.example server\.env

# terminal 1 - API on http://localhost:5000
npm run dev:server

# terminal 2 - React app on http://localhost:5173
npm run dev:client
```

Make sure MongoDB is running first (`mongod`, or the MongoDB service on Windows), or use an Atlas URI in `MONGODB_URI`.
The server prints `Connected to MongoDB` and `Server running on port 5000` when it is ready.

### Using MongoDB Atlas instead of a local database

1. Create a free cluster, add a database user, and allow your IP under Network Access.
2. Copy the connection string into `server/.env`, for example
   `MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/alzikrayat`.

### Troubleshooting

| Problem | Fix |
| ------- | --- |
| `Could not connect to MongoDB` | MongoDB is not running, or `MONGODB_URI` is wrong |
| `EADDRINUSE: port 5000` | Another program uses the port; change `PORT` in `.env` and the proxy target in `client/vite.config.js` |
| Images do not show | Restart both servers; check that `server/uploads` exists and `/uploads` is proxied in `vite.config.js` |
| CORS error | `CLIENT_URL` in `server/.env` must match the React URL exactly |
| `bcrypt` fails to install | Use Node 18/20 LTS, or install the build tools for your OS |

## REST API

| Method | Route                          | Auth | Description                            |
| ------ | ------------------------------ | ---- | -------------------------------------- |
| POST   | `/api/auth/register`           | no   | Create an account (password hashed with bcrypt) |
| POST   | `/api/auth/login`              | no   | Log in, returns the user profile       |
| GET    | `/api/photos`                  | no   | List all photos, newest first          |
| GET    | `/api/photos/:id`              | no   | Get one photo                          |
| POST   | `/api/photos`                  | yes  | Upload a photo (multipart: `photo`, `title`, `description`) |
| DELETE | `/api/photos/:id`              | yes  | Delete a photo (owner only, returns 403 otherwise) |
| GET    | `/api/photos/:id/comments`     | no   | List comments of a photo               |
| POST   | `/api/photos/:id/comments`     | yes  | Add a comment                          |

Status codes used: 200, 201, 400 (validation), 401 (not logged in / wrong credentials), 403 (not the owner), 404, 409 (email already used), 500.

## Authentication notes

This project uses basic authentication only. After login the client keeps the user in React state (and `localStorage`)
and sends the user id in an `x-user-id` header on write requests. The server checks that the user exists
(`middleware/requireUser.js`) and checks ownership before deleting a photo.
This is not secure enough for production. JWT tokens are planned for the optional Project 4.

## Validation

Request bodies are validated with Joi (`server/middleware/validation.js`), and the Mongoose schemas have their own
validation rules (required fields, unique email, email format).

## Features checklist

- Register / login with bcrypt hashing, toolbar shows "Hi <firstName>" + Logout, or "Please Login"
- Home page with banner and recent photos
- Gallery fetched with `useEffect` + `fetch`, grid / list toggle, responsive layout
- Upload with Multer (files saved in `server/uploads`, metadata in MongoDB)
- Photo detail page (`/photos/:id` with `useParams`) with comments
- Comments appear immediately without reloading the page
- Owner-only delete (also removes the image file and the photo's comments)



Emadh Mufadal 
Software Engineering

