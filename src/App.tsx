import './App.css';
import PlayPage from "./pages/PlayPage.tsx"
import { DeckProvider } from "./context/DeckContext";
import {PlayerProvider} from "./context/PlayerContext.tsx";
import {EnemiesProvider} from "./context/EnemiesContext.tsx";


function App() {


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
