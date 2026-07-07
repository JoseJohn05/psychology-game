import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainMenu from './pages/MainMenu'
import GameMenu from './pages/GameMenu'
import CognitiveChallenge from './games/CognitiveChallenge'
import MemoryPalace from './games/MemoryPalace'
import EmotionalIntelligence from './games/EmotionalIntelligence'
import PatternRecognition from './games/PatternRecognition'
import Profile from './pages/Profile'

function App() {
  const [playerStats, setPlayerStats] = useState({
    username: 'Player',
    level: 1,
    totalScore: 0,
    gamesPlayed: 0,
    achievements: [],
  })

  return (
    <Router>
      <div className="min-h-screen animated-bg overflow-hidden">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/menu" element={<GameMenu />} />
          <Route path="/cognitive" element={<CognitiveChallenge playerStats={playerStats} setPlayerStats={setPlayerStats} />} />
          <Route path="/memory" element={<MemoryPalace playerStats={playerStats} setPlayerStats={setPlayerStats} />} />
          <Route path="/emotional" element={<EmotionalIntelligence playerStats={playerStats} setPlayerStats={setPlayerStats} />} />
          <Route path="/pattern" element={<PatternRecognition playerStats={playerStats} setPlayerStats={setPlayerStats} />} />
          <Route path="/profile" element={<Profile playerStats={playerStats} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
