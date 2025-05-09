const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");


// Mock-Daten
let items = [{ id: 1, name: "Docker lernen" }];

// Middleware
app.use(cors());
app.use(express.json());

// Routen
app.get("/api/items", (req, res) => res.json(items));
app.post("/api/items", (req, res) => {
  items.push(req.body);
  res.status(201).send("Item added");
});

app.listen(PORT, () => console.log(`Backend runs on port ${PORT}`));