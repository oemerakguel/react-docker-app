import { useState, useEffect } from 'react';

// Definiere die API-URL (in deinem Fall auf Basis des Umgebungsvariables)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  // Zustand für die Items und Eingabewerte
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [editingItem, setEditingItem] = useState(null);

  // Lade alle Items beim ersten Laden
  useEffect(() => {
    fetchItems();
  }, []);

  // Funktion zum Abrufen der Items von der API
  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/items`);
      if (!response.ok) throw new Error('Fehler beim Abrufen der Items');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error("Fehler beim Laden der Items:", err);
    }
  };

  // Funktion zum Hinzufügen eines neuen Items
  const handleAddItem = async () => {
    if (!newItem.name || !newItem.description) {
      alert('Bitte beide Felder ausfüllen!'); // Oder eine nette UI-Nachricht
      return;
    }
    if (newItem.name && newItem.description) {
      try {
        const response = await fetch(`${API_URL}/api/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        });
        if (!response.ok) throw new Error('Fehler beim Hinzufügen des Items');
        const addedItem = await response.json();
        setItems((prevItems) => [...prevItems, addedItem]);  // Füge das neue Item zur Liste hinzu
        setNewItem({ name: '', description: '' });  // Setze die Eingabewerte zurück
      } catch (err) {
        console.error("Fehler beim Hinzufügen des Items:", err);
      }
    }
  };

  // Funktion zum Löschen eines Items
  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/items/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setItems(items.filter((item) => item.id !== id));  // Entferne das gelöschte Item aus der Liste
      } else {
        throw new Error('Fehler beim Löschen des Items');
      }
    } catch (err) {
      console.error("Fehler beim Löschen des Items:", err);
    }
  };

  // Funktion zum Bearbeiten eines Items
  const handleEditItem = (item) => {
    setEditingItem(item);  // Setze das Item in den Bearbeitungsmodus
  };

  // Funktion zum Aktualisieren eines Items
  const handleUpdateItem = async () => {
    if (editingItem) {
      try {
        const response = await fetch(`${API_URL}/api/items/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: editingItem.name,
            description: editingItem.description,
          }),
        });
        if (!response.ok) throw new Error('Fehler beim Aktualisieren des Items');
        const updatedItem = await response.json();
        setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));  // Update das Item in der Liste
        setEditingItem(null);  // Beende den Bearbeitungsmodus
      } catch (err) {
        console.error("Fehler beim Aktualisieren des Items:", err);
      }
    }
  };

  return (
    <div>
      <h1>Items</h1>

      {/* Eingabefelder für neues Item */}
      <div>
        <h2>Neues Item hinzufügen</h2>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Beschreibung"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button onClick={handleAddItem}>Hinzufügen</button>
      </div>

      {/* Anzeige der Items */}
      <div>
        <h2>Alle Items</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {editingItem && editingItem.id === item.id ? (
                <div>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editingItem.description}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, description: e.target.value })
                    }
                  />
                  <button onClick={handleUpdateItem}>Aktualisieren</button>
                </div>
              ) : (
                <>
                  <span>{item.name} - {item.description}</span>
                  <button onClick={() => handleEditItem(item)}>Bearbeiten</button>
                  <button onClick={() => handleDeleteItem(item.id)}>Löschen</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
