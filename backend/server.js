/*import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import userRoutes from './routes/route.js';
import geminiRoutes from './routes/gemini.js'; // ✅ Added Gemini route
import Connection from './database/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

mongoose.set('strictQuery', true);

const app = express();
const server = http.createServer(app); // Create HTTP server

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload1', express.static(path.join(__dirname, 'upload1')));

Connection();

app.use('/', userRoutes);
app.use('/api/gemini', geminiRoutes);


const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log("Server is running on port", port);
});*/


/*import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import userRoutes from './routes/route.js';
import geminiRoutes from './routes/gemini.js';
import Connection from './database/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

mongoose.set('strictQuery', true);

const app = express();
const server = http.createServer(app);

// ✅ Global CORS setup (before routes)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true,
}));

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ Static folders for uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload1', express.static(path.join(__dirname, 'upload1')));

// ✅ Connect to DB
Connection();

// ✅ Routes with file upload (multer) come BEFORE JSON/body parsing
app.use('/', userRoutes); // This includes /signup

// ✅ JSON/body parsing comes AFTER multer-based routes
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Routes expecting JSON body
app.use('/api/gemini', geminiRoutes);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log("Server is running on port", port);
});*/



/*import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import userRoutes from './routes/route.js';
import geminiRoutes from './routes/gemini.js';
import Connection from './database/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

mongoose.set('strictQuery', true);

const app = express();
const server = http.createServer(app);

// ✅ Global CORS setup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true,
}));

// ✅ Parse incoming JSON & form data BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ Static folders for uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload1', express.static(path.join(__dirname, 'upload1')));

// ✅ Connect to DB
Connection();

// ✅ Routes
app.use('/', userRoutes);
app.use('/api/gemini', geminiRoutes);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log("Server is running on port", port);
});*/



/*import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/route.js';
import geminiRoutes from './routes/gemini.js';
import Connection from './database/db.js';

mongoose.set('strictQuery', true);

const app = express();
const server = http.createServer(app);

// ✅ Global CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true,
}));

// ✅ JSON & URL-encoded parsing BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ Static folders for uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload1', express.static(path.join(__dirname, 'upload1')));

// ✅ Connect to DB
Connection();

// ✅ Routes
app.use('/', userRoutes);
app.use('/api/gemini', geminiRoutes);

const port = process.env.PORT || 4000;
server.listen(port, () => console.log('Server running on port', port));

import quizRoutes from './routes/quizRoutes.js';

// Mount the route
app.use('/api/quiz', quizRoutes);*/



/*import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/route.js';
import geminiRoutes from './routes/gemini.js';
import Connection from './database/db.js';

mongoose.set('strictQuery', true);

const app = express();

// ✅ Global CORS
app.use(cors({ origin: '*', credentials: true }));

// ✅ JSON & URL-encoded parsing BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static folders for uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload1', express.static(path.join(__dirname, 'upload1')));

// ✅ Connect to MongoDB
Connection();

// ✅ Routes
app.use('/', userRoutes);
app.use('/api/gemini', geminiRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));*/


/*import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/route.js';
import geminiRoutes from './routes/gemini.js';
import anonymousRoutes from './routes/anonymousRoutes.js';
import Connection from './database/db.js';

const app = express();

// ✅ Global CORS
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// ✅ JSON & URL-encoded parsing BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static folders for uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload1', express.static(path.join(__dirname, 'upload1')));

// ✅ Connect to MongoDB
Connection();
mongoose.set('strictQuery', true);

// ✅ Routes
app.use('/', userRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/anonymous', anonymousRoutes); // anonymous routes here

// ✅ Server listen
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));*/


/*import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/route.js';
import geminiRoutes from './routes/gemini.js';
import anonymousRoutes from './routes/anonymousRoutes.js';
import quizRoutes from './routes/quizRoutes.js';   // ✅ Import quiz routes
import Connection from './database/db.js';

const app = express();

// ✅ Global CORS
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// ✅ JSON & URL-encoded parsing BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static folders for uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload1', express.static(path.join(__dirname, 'upload1')));

// ✅ Connect to MongoDB
Connection();
mongoose.set('strictQuery', true);

// ✅ Routes
app.use('/', userRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/anonymous', anonymousRoutes);
app.use('/api/quiz', quizRoutes);   // ✅ Add quiz API

// ✅ Server listen
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));*/




// backend/server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/route.js';
import geminiRoutes from './routes/gemini.js';
import anonymousRoutes from './routes/anonymousRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import drawingsRouter from './routes/drawings.js';   // ✅ New drawings routes
import Connection from './database/db.js';

const app = express();

// ✅ CORS (adjust origin for your deployed frontend)
app.use(cors({
    origin: "https://vercel.com/bhavanis-projects-55d3a747/thera-connect/3wsMnvPTjKZNmFHDLEEWP3xrckS3", // use actual frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


// ✅ JSON parsing (support base64 drawings, large payloads)
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Static folders for uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload1', express.static(path.join(__dirname, 'upload1')));
app.use('/uploads/drawings', express.static(path.join(__dirname, 'uploads', 'drawings'))); // ✅ drawings

// ✅ Connect to MongoDB
Connection();
mongoose.set('strictQuery', true);

// ✅ Routes
app.use('/', userRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/anonymous', anonymousRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/drawings', drawingsRouter);   // ✅ drawings API

// ✅ Server listen
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));



