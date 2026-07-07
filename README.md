# 🧠 MindMaze - Psychology Web Game

An interactive, immersive web-based psychology game that explores cognitive biases, emotional intelligence, memory, and pattern recognition through engaging challenges and beautiful 3D environments.

## 🎮 Features

### 1. **🎯 Cognitive Bias Challenge**
- Test your decision-making under pressure
- Uncover cognitive biases like survivorship bias and sunk cost fallacy
- Learn psychology insights after each question
- Real-time feedback on your reasoning patterns

### 2. **🏛️ Memory Palace**
- Navigate stunning environments to enhance spatial memory
- Study objects carefully and recall them under time pressure
- Progressive difficulty levels
- Track your accuracy and improvement

### 3. **💭 Emotional Intelligence (EQ) Assessment**
- Navigate complex social scenarios
- Choose empathetic, assertive, logical, or avoidant responses
- Get real-time EQ scoring and psychological insights
- Understand different emotional response patterns

### 4. **🔮 Pattern Recognition**
- Solve numerical sequences
- Identify letter and logical patterns
- Time-pressure challenges
- Progressive difficulty levels

## 🚀 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **3D Graphics**: Three.js & React Three Fiber
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **HTTP Client**: Axios

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Game Mechanics

### Scoring System
- **Cognitive Challenge**: 10 points per correct answer
- **Emotional Intelligence**: Variable EQ score (1-10) per response
- **Pattern Recognition**: 15 points per correct pattern
- **Memory Palace**: 10 points per correctly remembered object

### Progression
- Track total score across all games
- Unlock achievements
- Increase player level
- View detailed profile statistics

## 🧠 Psychology Behind the Game

MindMaze is designed based on cognitive psychology principles:

1. **Cognitive Biases**: Learn about decision-making errors and mental shortcuts
2. **Memory Systems**: Leverage spatial memory and chunking techniques
3. **Emotional Intelligence**: Develop empathy and social awareness
4. **Pattern Recognition**: Exercise visual and logical reasoning

## 🎨 Design Philosophy

- **Glassmorphism**: Modern, frosted glass UI elements
- **Smooth Animations**: Framer Motion for delightful transitions
- **Accessibility**: High contrast colors and clear typography
- **Responsive Design**: Works on desktop and tablet devices

## 📊 Game Flow

```
Main Menu
    ↓
Game Menu (Choose Challenge)
    ↓
Game Selection:
    ├─ Cognitive Bias Challenge
    ├─ Memory Palace
    ├─ Emotional Intelligence
    └─ Pattern Recognition
    ↓
Game Play
    ↓
Results & Score
    ↓
Profile Update
```

## 🏆 Achievements

Potential achievements to unlock:
- 🌟 First Step: Complete your first challenge
- 🧠 Master Mind: Score 100+ points
- 🎯 Perfect Score: Get all answers correct
- 💭 Empathy Expert: Achieve 90%+ EQ score
- 🔮 Pattern Prophet: Solve all patterns correctly

## 🔮 Future Features

- [ ] Multiplayer leaderboards
- [ ] Daily challenges
- [ ] Advanced 3D environments
- [ ] Custom avatars
- [ ] Detailed psychology reports
- [ ] Integration with psychology research APIs
- [ ] Voice-based interactive scenarios
- [ ] AR mode for immersive gameplay
- [ ] Community challenges
- [ ] Psychology articles and educational content

## 🛠️ Development

### Project Structure
```
src/
├── components/          # Reusable React components
├── games/              # Game implementations
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

### Key Components

- **CognitiveChallenge**: Question-based psychology challenge
- **MemoryPalace**: 3D-inspired memory game
- **EmotionalIntelligence**: Scenario-based EQ assessment
- **PatternRecognition**: Puzzle solving challenges

## 📝 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Contributions welcome! Please feel free to submit issues and enhancement requests.

## 📚 Educational Resources

Learn more about the psychology concepts in the game:
- [Cognitive Biases](https://en.wikipedia.org/wiki/Cognitive_bias)
- [Emotional Intelligence](https://en.wikipedia.org/wiki/Emotional_intelligence)
- [Memory Palace Technique](https://en.wikipedia.org/wiki/Method_of_loci)
- [Pattern Recognition](https://en.wikipedia.org/wiki/Pattern_recognition)

---

**Made with ❤️ by José John - Exploring the Psychology of Gaming**
