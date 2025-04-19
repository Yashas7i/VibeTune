import { useState } from 'react';
import './index.css';
import { motion } from 'framer-motion';

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
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-white flex flex-col items-center justify-center p-12 overflow-hidden"
    >
      {/* Background with soft color splashes */}
      <div className="absolute inset-0 bg-gradient-corners z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center space-y-8">
        <motion.h1 
          className="text-6xl font-extrabold text-pastel-purple mb-6 drop-shadow-xl" 
          whileHover={{ scale: 1.1 }}
        >
          🎧 VibeTune
        </motion.h1>
        <p className="text-2xl text-gray-700 italic">Select your mood and get your vibe playlist ✨</p>

        <div className="flex flex-wrap gap-6 mb-8 justify-center">
          {moods.map((m) => (
            <motion.button
              key={m}
              onClick={() => getSongs(m)}
              className="bg-soft-beige hover:bg-pastel-green text-gray-900 text-xl px-8 py-4 rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300"
              whileTap={{ scale: 0.95 }}
              whileHover={{ rotate: [0, 2, -2, 0] }}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </motion.button>
          ))}
        </div>

        {songs.length > 0 && (
          <motion.div 
            className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-xl animate-fade"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl text-pastel-purple font-semibold mb-4 border-b pb-3">Songs for {mood}</h2>
            <ul className="list-disc pl-8 text-gray-700 space-y-4">
              {songs.map((song, index) => (
                <li key={index} className="hover:text-pastel-purple transition-colors duration-200 cursor-pointer">{song}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default App;
