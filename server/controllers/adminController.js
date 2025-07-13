// 

const User = require('../models/User');

// GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email role');
    
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }));

    res.status(200).json(formattedUsers);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// DELETE /api/users/:userId
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
