require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Test Routes
app.get('/api/health', (req, res) => {
    res.json({ status: "Server is running!" });
});

// Sample Data Model
const SampleSchema = new mongoose.Schema({ name: String });
const SampleModel = mongoose.model('Sample', SampleSchema);

app.get('/api/data', async (req, res) => {
    const sampleData = await SampleModel.find();
    res.json(sampleData);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
