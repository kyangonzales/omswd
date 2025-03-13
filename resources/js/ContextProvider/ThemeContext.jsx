import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const ThemeContext = createContext();

// Custom hook to access ThemeContext
export const useTheme = () => useContext(ThemeContext);

// Available sound options
const soundOptions = [
  { name: "Korean", file: "storage/sounds/korean.mp3" },
  { name: "Pingding", file: "storage/sounds/pingding.mp3" },
  { name: "Ting", file: "storage/sounds/ting.mp3" },
  { name: "Tuturu", file: "storage/sounds/tuturu.mp3" },
];

export const ThemeProvider = ({ children }) => {
  // Load theme, sound settings, and selected sound from localStorage
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [soundEnabled, setSoundEnabled] = useState(localStorage.getItem("sound") !== "off");
  const [selectedSound, setSelectedSound] = useState(
    localStorage.getItem("selectedSound") || soundOptions[3].file
  );

  // Toggle theme mode
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    playSound();
  };

  // Toggle sound on/off
  const toggleSound = () => {
    const newSoundState = !soundEnabled;
    setSoundEnabled(newSoundState);
    localStorage.setItem("sound", newSoundState ? "on" : "off");
  };

  // Change selected sound effect
  const changeSound = (soundFile) => {
    setSelectedSound(soundFile);
    localStorage.setItem("selectedSound", soundFile);
    playSound();
  };

  // Play the selected sound if enabled
  const playSound = () => {
    if (soundEnabled) {
      const audio = new Audio(selectedSound);
      audio.play();
    }
  };

  // Apply theme class to `html` element
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ 
      theme, toggleTheme, 
      soundEnabled, toggleSound, 
      selectedSound, changeSound, 
      soundOptions 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
