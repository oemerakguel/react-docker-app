import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/items`)
      .then((res) => {
        if (!res.ok) throw new Error("API-Fehler: " + res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Empfangene Daten:", data);
        setItems(data);
      })
      .catch((err) => console.error("Fehler beim Laden:", err));
  }, []);

  return (
    <div>
      <h1>Items from Backend:</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {items.length === 0 && <p>Keine Items gefunden! 🧐</p>}
    </div>
  );
}

export default App;