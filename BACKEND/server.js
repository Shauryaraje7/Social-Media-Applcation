const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const uri = "...";
const JWT_SECRET = 'your-secret-key'; // Change this to a secure key in production

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

// Post Schema
const postSchema = new mongoose.Schema({
  content: String,
  userEmail: String, // Link to user via email
  createdAt: { type: Date, default: Date.now },
  likes: { type: [String], default: [] }, // Re-added likes field
});
const Post = mongoose.model('Post', postSchema);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Sign-up endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Sign-up request received:', { name, email, password });
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields (name, email, password) are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ email, name }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Sign-up error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Sign-in endpoint
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Sign-in successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error });
  }
});

// Profile endpoint
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
});

// Search users endpoint
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const query = req.query.q || '';
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    }).select('name email -_id');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users', error });
  }
});

// Create post endpoint
app.post('/api/posts', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Content is required' });
    const newPost = new Post({ content, userEmail: req.user.email });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
});

// Get posts endpoint
app.get('/api/posts', authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Latest posts first
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Like post endpoint
app.post('/api/posts/:id/like', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const userEmail = req.user.email;
    if (post.likes.includes(userEmail)) {
      post.likes = post.likes.filter(email => email !== userEmail); // Unlike
    } else {
      post.likes.push(userEmail); // Like
    }
    await post.save();
    res.status(200).json({ message: 'Post updated', likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error });
  }
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));