/*import User from '../models/userModel.js';
import Journal from '../models/journalModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Helper to generate token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// User Signup
export const userSignup = async (req, res) => {
  try {
    let exist = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (exist) {
      return res.status(409).json({ msg: 'Username or email already exists!' });
    }
    const newUser = new User(req.body);
    if (req.file) {
      newUser.profilePicture = req.file.path; // save the file path to the user document
    }
    await newUser.save();

    // Generate token
    const token = generateToken(newUser);

    return res.status(200).json({ user: newUser, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// User Login
export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists and if the password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate token
    const token = generateToken(user);

    // Return user details and token
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all users (excluding passwords)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get User Details by username
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update User Details by username
export const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const updates = req.body;

    // If profile picture uploaded, update the path
    if (req.file) {
      updates.profilePicture = req.file.path;
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete User and their journals by username
export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username and delete
    const user = await User.findOneAndDelete({ username });

    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    // Also delete all journals associated with the user
    await Journal.deleteMany({ _id: { $in: user.journals } });

    return res.status(200).json({ msg: 'User and associated journals deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};*/



/*import User from '../models/userModel.js';
import Journal from '../models/journalModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Helper to generate token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// ✅ User Signup
// User Signup
export const userSignup = async (req, res) => {
  try {
    console.log('--- SIGNUP START ---');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const exist = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }]
    });
    if (exist) {
      console.log('DUPLICATE detected for', req.body.username);
      return res.status(409).json({ msg: 'Username or email already exists!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hashed,
      profilePicture: req.file?.path
    });

    console.log('Saving user:', newUser.username);
    await newUser.save();
    console.log('User saved successfully:', newUser._id);

    const token = generateToken(newUser);
    console.log('Token generated');

    return res.status(200).json({
      user: { username: newUser.username, email: newUser.email },
      token
    });
  } catch (err) {
    console.error('SIGNUP ERROR:', err);
    return res.status(500).json({ error: err.message });
  }
};


// ✅ User Login
export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user);

    return res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        name: user.name,
        age: user.age,
        gender: user.gender,
        bio: user.bio,
        profilePicture: user.profilePicture
      },
      token
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all users (excluding passwords)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get User Details by username
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Update User Details by username
export const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.profilePicture = req.file.path;
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete User and their journals by username
export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOneAndDelete({ username });

    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    await Journal.deleteMany({ _id: { $in: user.journals } });

    return res.status(200).json({ msg: 'User and associated journals deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};*/

/*
import User from '../models/userModel.js';
import Journal from '../models/journalModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export const userSignup = async (req, res) => {
  try {
    console.log('--- SIGNUP START ---');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    // Check if username or email already exists
    const exist = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }]
    });

    if (exist) {
      console.log('DUPLICATE detected for', req.body.username);
      return res.status(409).json({ msg: 'Username or email already exists!' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      profilePicture: req.file?.path || null
    });

    await newUser.save();
    console.log('User saved successfully:', newUser._id);

    // Generate JWT
    const token = generateToken(newUser);

    return res.status(201).json({
      user: {
        username: newUser.username,
        email: newUser.email
      },
      token
    });
  } catch (err) {
    console.error('SIGNUP ERROR:', err);
    return res.status(500).json({ error: err.message });
  }
};

/
// USER LOGIN
export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Search by username or email, case-insensitive
    const user = await User.findOne({
      $or: [
        { username: new RegExp(`^${username}$`, 'i') },
        { email: new RegExp(`^${username}$`, 'i') }
      ]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user);

    return res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        name: user.name,
        age: user.age,
        gender: user.gender,
        bio: user.bio,
        profilePicture: user.profilePicture
      },
      token
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return res.status(500).json({ error: error.message });
  }
};



export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('GET USER DETAILS ERROR:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const updates = { ...req.body };

    if (req.file) {
      updates.profilePicture = req.file.path;
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/
export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOneAndDelete({ username });
    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    await Journal.deleteMany({ _id: { $in: user.journals } });

    return res.status(200).json({ msg: 'User and associated journals deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};*/


/*import User from '../models/userModel.js';
import Journal from '../models/journalModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// -------------------------- TOKEN GENERATOR --------------------------
const generateToken = (user) => jwt.sign(
  { id: user._id, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);

// -------------------------- USER SIGNUP --------------------------
export const userSignup = async (req, res) => {
  try {
    console.log('--- SIGNUP START ---', { body: req.body, file: req.file });

    const exist = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }]
    });

    if (exist) return res.status(409).json({ msg: 'Username or email already exists!' });

    const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

    const newUser = new User({ ...req.body, password: hashedPassword, profilePicture: req.file?.path || null });
    await newUser.save();
    console.log('User saved successfully:', newUser._id);

    const token = generateToken(newUser);
    return res.status(201).json({ user: { username: newUser.username, email: newUser.email }, token });
  } catch (err) {
    console.error('SIGNUP ERROR:', err);
    return res.status(500).json({ error: err.message });
  }
};

// -------------------------- USER LOGIN --------------------------
export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [
        { username: new RegExp(`^${username}$`, 'i') },
        { email: new RegExp(`^${username}$`, 'i') }
      ]
    });
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

    const token = generateToken(user);
    return res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        name: user.name,
        age: user.age,
        gender: user.gender,
        bio: user.bio,
        profilePicture: user.profilePicture
      },
      token
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return res.status(500).json({ error: err.message });
  }
};

// -------------------------- GET ALL USERS --------------------------
export const getUsers = async (_, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// -------------------------- GET USER DETAILS --------------------------
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
  } catch (err) {
    console.error('GET USER DETAILS ERROR:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// -------------------------- UPDATE USER --------------------------
export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.profilePicture = req.file.path;

    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ msg: 'User not found!' });
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// -------------------------- DELETE USER --------------------------
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.params.username });
    if (!user) return res.status(404).json({ msg: 'User not found!' });

    await Journal.deleteMany({ _id: { $in: user.journals } });
    return res.status(200).json({ msg: 'User and associated journals deleted successfully!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};*/



/*import User from '../models/userModel.js';
import Journal from '../models/journalModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// -------------------------- TOKEN GENERATOR --------------------------
const generateToken = (user) => jwt.sign(
  { id: user._id, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);

// -------------------------- USER SIGNUP --------------------------
export const userSignup = async (req, res) => {
  try {
    console.log('--- SIGNUP START ---', { body: req.body, file: req.file });

    const exist = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }]
    });

    if (exist) {
      return res.status(409).json({ msg: 'Username or email already exists!' });
    }

    // ❌ removed manual hashing
    const newUser = new User({ 
      ...req.body, 
      profilePicture: req.file?.path || null 
    });

    await newUser.save();
    console.log('User saved successfully:', newUser._id);

    const token = generateToken(newUser);
    return res.status(201).json({ 
      user: { username: newUser.username, email: newUser.email }, 
      token 
    });
  } catch (err) {
    console.error('SIGNUP ERROR:', err);
    return res.status(500).json({ error: err.message });
  }
};

// -------------------------- USER LOGIN --------------------------
export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Allow login by username OR email
    const user = await User.findOne({
      $or: [
        { username: new RegExp(`^${username}$`, 'i') },
        { email: new RegExp(`^${username}$`, 'i') }
      ]
    });

    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    // ✅ compare plain password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

    const token = generateToken(user);
    return res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        name: user.name,
        age: user.age,
        gender: user.gender,
        bio: user.bio,
        profilePicture: user.profilePicture
      },
      token
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return res.status(500).json({ error: err.message });
  }
};

// -------------------------- GET ALL USERS --------------------------
export const getUsers = async (_, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// -------------------------- GET USER DETAILS --------------------------
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
  } catch (err) {
    console.error('GET USER DETAILS ERROR:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// -------------------------- UPDATE USER --------------------------
export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.profilePicture = req.file.path;

    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ msg: 'User not found!' });
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// -------------------------- DELETE USER --------------------------
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.params.username });
    if (!user) return res.status(404).json({ msg: 'User not found!' });

    await Journal.deleteMany({ _id: { $in: user.journals } });
    return res.status(200).json({ msg: 'User and associated journals deleted successfully!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};*/


import User from '../models/userModel.js';
import Journal from '../models/journalModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// -------------------------- TOKEN GENERATOR --------------------------
const generateToken = (user) => {
  console.log('🔧 DEBUG → JWT_SECRET:', process.env.JWT_SECRET);  // Add this line

  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};


// -------------------------- USER SIGNUP --------------------------
export const userSignup = async (req, res) => {
  try {
    console.log('--- SIGNUP START ---', { body: req.body, file: req.file });

    const exist = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }]
    });

    if (exist) {
      return res.status(409).json({ msg: 'Username or email already exists!' });
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({ 
      ...req.body, 
      password: hashedPassword,
      profilePicture: req.file?.path || null 
    });

    await newUser.save();
    console.log('User saved successfully:', newUser._id);

    const token = generateToken(newUser);
    return res.status(201).json({ 
      user: { username: newUser.username, email: newUser.email }, 
      token 
    });
  } catch (err) {
    console.error('SIGNUP ERROR:', err);
    return res.status(500).json({ error: err.message });
  }
};

// -------------------------- USER LOGIN --------------------------
export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Allow login by username OR email
    const user = await User.findOne({
      $or: [
        { username: new RegExp(`^${username}$`, 'i') },
        { email: new RegExp(`^${username}$`, 'i') }
      ]
    });

    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    // ✅ Compare plain password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

    const token = generateToken(user);
    return res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        name: user.name,
        age: user.age,
        gender: user.gender,
        bio: user.bio,
        profilePicture: user.profilePicture
      },
      token
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return res.status(500).json({ error: err.message });
  }
};

// -------------------------- GET ALL USERS --------------------------
export const getUsers = async (_, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// -------------------------- GET USER DETAILS --------------------------
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
  } catch (err) {
    console.error('GET USER DETAILS ERROR:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// -------------------------- UPDATE USER --------------------------
export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.profilePicture = req.file.path;

    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ msg: 'User not found!' });
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// -------------------------- DELETE USER --------------------------
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.params.username });
    if (!user) return res.status(404).json({ msg: 'User not found!' });

    await Journal.deleteMany({ _id: { $in: user.journals } });
    return res.status(200).json({ msg: 'User and associated journals deleted successfully!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};





