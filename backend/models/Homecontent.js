import mongoose from 'mongoose';

const HomeContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    highlight: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: false
    }]
}, { timestamps: true });

const HomeContent = mongoose.model('HomeContent', HomeContentSchema);
export default HomeContent;