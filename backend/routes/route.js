/*import express from 'express';
import { userSignup, userLogin, getUsers, deleteUser, updateUser, getUserDetails } from '../controller/user-controller.js';

import { create_journal, getPostsByUsername, update_journal, delete_journal, getJournalById } from '../controller/journal-controller.js';
import { getAnonymousPosts, createAnonymousPost } from '../controller/anonymous-controller.js';
import { createMood, getMoods } from '../controller/mood-controller.js';
import upload from '../multer/multerConfig.js';
import upload1 from '../multer/multerConfig1.js';
import { authenticateJWT } from '../controller/authMiddleware.js';


import cors from 'cors';

const router = express.Router();
router.use(cors());

// Public routes
router.post('/signup', upload.single('profilePicture'), userSignup);
router.post('/login', userLogin);
router.get('/anonymousPosts', getAnonymousPosts);
router.post('/createAnonymousPosts', createAnonymousPost);

// Protected routes (require valid JWT token)
router.use(authenticateJWT);

router.get('/users', getUsers);
router.get('/:username/getuserdetails', getUserDetails);
router.delete('/delete-user/:username', deleteUser);
router.patch('/:username/update-user', upload.single('profilePicture'), updateUser);

router.post('/:username', upload1.single('coverPicture'), create_journal);
router.get('/:username/journals', getPostsByUsername);
router.put('/journals/:username/:id', update_journal);
router.delete('/journal-delete/:username/:id', delete_journal);
router.get('/:username/:id', getJournalById);

router.get('/api/moods/:username', getMoods);
router.post('/api/moods/:username', createMood);

export default router;*/


import express from 'express';
import cors from 'cors';
import { 
  userSignup, userLogin, getUsers, deleteUser, updateUser, getUserDetails 
} from '../controller/user-controller.js';
import { authenticateJWT } from '../controller/authMiddleware.js';
import upload from '../multer/multerConfig.js';
import upload1 from '../multer/multerConfig1.js';
import { 
  create_journal, getPostsByUsername, update_journal, delete_journal, getJournalById 
} from '../controller/journal-controller.js';
import { getAnonymousPosts, createAnonymousPost } from '../controller/anonymous-controller.js';
import { createMood, getMoods } from '../controller/mood-controller.js';

const router = express.Router();
router.use(cors());

// ---------------- Public routes ----------------
router.post('/signup', upload.single('profilePicture'), userSignup); // multipart/form-data
router.post('/login', userLogin); // JSON

router.get('/anonymousPosts', getAnonymousPosts);
router.post('/createAnonymousPosts', createAnonymousPost);

// ---------------- Protected routes ----------------
router.use(authenticateJWT);

router.get('/users', getUsers);
router.get('/:username/getuserdetails', getUserDetails);
router.delete('/delete-user/:username', deleteUser);
router.patch('/:username/update-user', upload.single('profilePicture'), updateUser);

router.post('/:username', upload1.single('coverPicture'), create_journal);
router.get('/:username/journals', getPostsByUsername);
router.put('/journals/:username/:id', update_journal);
router.delete('/journal-delete/:username/:id', delete_journal);
router.get('/:username/:id', getJournalById);

router.get('/api/moods/:username', getMoods);
router.post('/api/moods/:username', createMood);

export default router;

