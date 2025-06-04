import './App.css';
import PlayPage from "./pages/PlayPage.tsx"
import { DeckProvider } from "./context/DeckContext";
import {PlayerProvider} from "./context/PlayerContext.tsx";
import {EnemiesProvider} from "./context/EnemiesContext.tsx";
import {useEffect} from "react";


function App() {


  useEffect(() => {
    // Clear all items from localStorage
    localStorage.clear();
    console.log("localStorage cleared on refresh.");
  }, []); // Empty dependency array ensures this runs only once on mount


  return (
    <DeckProvider>
    <PlayerProvider>
    <EnemiesProvider>
      <div className="w-[100%] h-screen relative">
        <PlayPage/>
      </div>
    </EnemiesProvider>
    </PlayerProvider>
    </DeckProvider>

  );
}

export default App;
