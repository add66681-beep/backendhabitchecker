import mongoose from 'mongoose';

const HabitDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    habits: { type: Array, default: [] }, // Array of habit objects
    records: { type: Object, default: {} }, // Map of date_habitId -> boolean
    lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('HabitData', HabitDataSchema);
