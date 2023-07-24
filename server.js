const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});


const express = require('express');
const User = require('./models/user');

const App = express();
app.use(express.json());

// GET all users
app.get('/users', async (req, res) => {
try {
    const users = await User.find();
    res.json(users);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// POST a new user
app.post('/users', async (req, res) => {
const { name, email, age } = req.body;
try {
    const user = new User({ name, email, age });
    await user.save();
    res.status(201).json(user);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

// PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
const { id } = req.params;
const { name, email, age } = req.body;
try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    res.json(updatedUser);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
const { id } = req.params;
try {
    const deletedUser = await User.findByIdAndRemove(id);
    res.json(deletedUser);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});

