import express, { json } from 'express';
import mongoose from 'mongoose'; // Correct import for mongoose
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(json());

// Define a simple schema for the Record model

const mapDataSchema = new mongoose.Schema({
  data: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
});

const MapData = mongoose.model("MapData", mapDataSchema);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));


// Create a new record
app.post("/api/map-data", async (req, res) => {
  const { data } = req.body;
  try {
    const newRecord = new MapData({ data });
    await newRecord.save();
    res.status(201).json({ message: "Record created successfully.", newRecord });
  } catch (error) {
    res.status(500).json({ error: "Failed to create the record." });
  }
});


// Get all records
app.get("/api/map-data", async (req, res) => {
  try {
    const records = await MapData.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records." });
  }
});




// Update a record by ID
app.put("/api/map-data/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const updatedRecord = await MapData.findByIdAndUpdate(
      id,
      { data },
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ error: "Record not found." });
    }
    res.status(200).json({ message: "Record updated successfully.", updatedRecord });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the record." });
  }
});




// Delete a record by ID
app.delete("/api/map-data/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecord = await MapData.findByIdAndDelete(id);
    if (!deletedRecord) {
      return res.status(404).json({ error: "Record not found." });
    }
    res.status(200).json({ message: "Record deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the record." });
  }
});


// Get a record by ID
app.get("/api/map-data/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const record = await MapData.findById(id);
    if (!record) {
      return res.status(404).json({ error: "Record not found." });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the record." });
  }
});
