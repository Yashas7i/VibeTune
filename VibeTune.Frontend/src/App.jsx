import { useState } from 'react';
import './index.css';

const moods = ["happy", "sad", "energetic", "chill", "romantic"];

function App() {
  const [songs, setSongs] = useState([]);
  const [mood, setMood] = useState('');

  const getSongs = async (selectedMood) => {
    setMood(selectedMood);
    const res = await fetch(`http://localhost:5000/recommend?mood=${selectedMood}`);
    const data = await res.json();
    setSongs(data.songs);
  };

  return (
    <div className="min-h-screen bg-pastel-peach flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-pastel-purple mb-4">🎧 VibeTune</h1>
      <p className="mb-6 text-lg text-gray-700">Select your mood and get your vibe playlist ✨</p>
      <div className="flex gap-3 mb-6">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => getSongs(m)}
            className="bg-pastel-blue hover:bg-pastel-green text-white px-4 py-2 rounded-2xl shadow-md"
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
      {songs.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-xl text-pastel-purple font-semibold mb-2">Songs for {mood}</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
