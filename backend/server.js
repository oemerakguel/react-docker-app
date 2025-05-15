import express from 'express';
import cors from 'cors';
import { findAll, create, deleteItem, updateItem } from './src/services/itemsServices.js';  




const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routen
app.get("/api/items", async (req, res) => {
  try {
    const items = await findAll();  // Holt alle Items aus der DB
    res.json(items);
  } catch (err) {
    console.error("Fehler beim Laden der Items:", err);
    res.status(500).send("Fehler beim Abrufen der Items");
  }
});

app.get("/health", (req, res) => {
  res.status(200).send("Dein Backend ist healthy");
});

app.post("/api/items", async (req, res) => {
  const { name, description } = req.body;  // Name und Description aus dem Request-Body
  try {
    const newItem = await create({ name, description });  // Erstellt ein neues Item in der DB
    res.status(201).json(newItem);  // Gibt das erstellte Item als Antwort zurück
  } catch (err) {
    console.error("Fehler beim Erstellen des Items:", err);
    res.status(500).send("Fehler beim Erstellen des Items");
  }
});

app.get("/", (req, res) => {
  res.send("API läuft. Verwende /api/items für Daten.");
});

// DELETE - Löscht ein Item aus der DB
app.delete("/api/items/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    // Hier sollte die Methode zum Löschen aus der DB aufgerufen werden
    // z.B. deleteItem aus itemsServices.js (wenn du das implementiert hast)
    await deleteItem(id);
    res.sendStatus(204);  // Erfolg, kein Inhalt zurückgegeben
  } catch (err) {
    console.error("Fehler beim Löschen des Items:", err);
    res.status(500).send("Fehler beim Löschen des Items");
  }
});

// PUT - Aktualisiert ein Item in der DB
app.put("/api/items/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  try {
    const updatedItem = await updateItem(id, { name, description });  // updateItem aus itemsServices.js
    if (updatedItem) {
      res.json(updatedItem);
    } else {
      res.status(404).send("Item nicht gefunden");
    }
  } catch (err) {
    console.error("Fehler beim Aktualisieren des Items:", err);
    res.status(500).send("Fehler beim Aktualisieren des Items");
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend läuft auf Port ${PORT}`);
});

export default app;
