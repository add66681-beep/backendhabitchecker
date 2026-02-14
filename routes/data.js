import express from 'express';
import HabitData from '../models/HabitData.js';

const router = express.Router();

// Get Data for User
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        let data = await HabitData.findOne({ userId });

        if (!data) {
            // If no data exists, return defaults (or empty)
            // Or create it? Usually GET doesn't create.
            // But we can return null and let frontend handle default.
            return res.json({ habits: null, records: null });
        }

        res.json({ habits: data.habits, records: data.records });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error check' });
    }
});

// Save/Sync Data
router.post('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { habits, records } = req.body;

        // Upsert
        const data = await HabitData.findOneAndUpdate(
            { userId },
            {
                userId,
                habits,
                records,
                lastUpdated: Date.now()
            },
            { new: true, upsert: true }
        );

        res.json({ message: 'Data saved successfully', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error save' });
    }
});

export default router;
