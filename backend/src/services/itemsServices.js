import pool from '../db.js';

// Alle Items abrufen
export const findAll = async () => {
  const res = await pool.query('SELECT * FROM items');
  return res.rows;
};

// Neues Item erstellen
export const create = async (item) => {
    try {
      const res = await pool.query(
        'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
        [item.name, item.description]
      );
      console.log('Erstelltes Item:', res.rows[0]);  // Prüfe, ob das Item korrekt zurückgegeben wird
      return res.rows[0];  // Gibt das neu hinzugefügte Item zurück
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Items:', error);  // Detaillierter Fehlerlog
      throw error;
    }
  };

// Item löschen
export const deleteItem = async (id) => {
    try {
      const res = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
      if (res.rowCount === 0) {
        throw new Error('Item nicht gefunden');
      }
      return res.rows[0];  // Gibt das gelöschte Item zurück (optional)
    } catch (err) {
      console.error("Fehler beim Löschen des Items:", err);
      throw err;  // Weiterleiten des Fehlers
    }
  };

// Item aktualisieren
export const updateItem = async (id, item) => {
  const res = await pool.query(
    'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [item.name, item.description, id]
  );
  return res.rows[0];
};
