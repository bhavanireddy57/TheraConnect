/*import User from "../models/userModel.js";
import Mood from "../models/moodSchema.js";

export const getMoods = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        const moods = await Mood.find({ user: user._id });
        res.json(moods);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export const createMood = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        const mood = new Mood({
          user: user._id,
          date: req.body.date,
          mood: req.body.mood,
        });
    
        const savedMood = await mood.save();
        res.json(savedMood);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}*/



import User from "../models/userModel.js";
import Mood from "../models/moodSchema.js";

export const getMoods = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const moods = await Mood.find({ user: user._id }).sort({ date: 1 });

    // Normalize date before sending (yyyy-mm-dd)
    const formatted = moods.map(m => ({
      _id: m._id,
      mood: m.mood,
      date: m.date.toISOString().split('T')[0],
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMood = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const mood = new Mood({
      user: user._id,
      date: new Date(req.body.date), // ensure stored as Date
      mood: req.body.mood,
    });

    const savedMood = await mood.save();

    res.json({
      _id: savedMood._id,
      mood: savedMood.mood,
      date: savedMood.date.toISOString().split('T')[0], // normalized
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
