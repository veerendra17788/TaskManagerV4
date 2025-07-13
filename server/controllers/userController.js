const User = require('../models/User');

exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.id; // coming from auth middleware

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findById(userId).select('-password_hash'); // exclude password

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching current user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
