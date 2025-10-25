// import React from 'react';
// import { useGame } from '../hooks/useGame';
// import Grid from './grid';
// import PlayerInfo from './playerInfo';
// import ControlPanel from './ControlPanel';
// import ErrorAlert from './ErrorAlert';

// const GridGame: React.FC = () => {
//   const {
//     gameState,
//     selectedCell,
//     character,
//     setCharacter,
//     hasSubmitted,
//     error,
//     setError,
//     isConnected,
//     gameComplete,
//     handleCellSelect,
//     handleCharacterSubmit,
//     isSubmitDisabled
//   } = useGame();

//   return (
//     <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[90vh] flex flex-col">
//       {/* Header */}
//       <header className="bg-gray-800 text-white px-6 py-4">
//         <div className="text-center">
//           <h1 className="text-3xl md:text-4xl font-bold mb-3">Multiplayer Grid Game</h1>
//           <div className="gap-2 mb-3">
//             <div className={`w-3 h-3 rounded-full animate-pulse ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
//             <span className="text-sm">Server: {isConnected ? 'Connected' : 'Disconnected'}</span>
//           </div>
//           <PlayerInfo 
//             onlinePlayers={gameState.onlinePlayers}
//             hasSubmitted={hasSubmitted}
//             totalMoves={gameState.totalMoves}
//             isConnected={isConnected}
//             gameComplete={gameComplete}
//           />
//         </div>
//       </header>

//       {/* Error Alert */}
//       {error && (
//         <ErrorAlert 
//           message={error} 
//           onDismiss={() => setError('')} 
//         />
//       )}

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
//           {/* Control Panel - Left Side */}
//           <div className="lg:flex-1 lg:max-w-md">
//             <ControlPanel
//               character={character}
//               onCharacterChange={setCharacter}
//               onSubmit={handleCharacterSubmit}
//               isSubmitDisabled={isSubmitDisabled}
//               hasSubmitted={hasSubmitted}
//               selectedCell={selectedCell}
//               onCellSelect={handleCellSelect}
//               gameComplete={gameComplete}
//             />
//           </div>

//           {/* Grid Display - Right Side */}
//           <div className="lg:flex-1">
//             <div className="text-center">
//               <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
//                 Live Game Grid {gameComplete && '(Complete!)'}
//               </h3>
//               <Grid
//                 grid={gameState.grid}
//                 selectedCell={selectedCell}
//                 onCellSelect={handleCellSelect}
//                 hasSubmitted={hasSubmitted}
//               />
//               <div className={`mt-4 p-4 rounded-lg font-semibold ${
//                 gameComplete 
//                   ? 'bg-green-100 text-green-800 border-l-4 border-green-500' 
//                   : selectedCell 
//                     ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
//                     : 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500'
//               }`}>
//                 {gameComplete 
//                   ? '🎉 Game Complete! New game starting soon...'
//                   : selectedCell 
//                     ? `✅ Selected: Row ${selectedCell.row + 1}, Column ${selectedCell.col + 1}`
//                     : 'Click on the grid or use the control panel to select a cell'
//                 }
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-100 border-t border-gray-200 px-6 py-4 text-center">
//         <p className="text-gray-600 text-sm">
//           Select a position → Choose a character → Submit your move!
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default GridGame;
"use client"

import type React from "react"
import { useGame } from "../hooks/useGame"
import Grid from "./grid"
import PlayerInfo from "./playerInfo"
import ControlPanel from "./ControlPanel"
import ErrorAlert from "./ErrorAlert"

const GridGame: React.FC = () => {
  const {
    gameState,
    selectedCell,
    character,
    setCharacter,
    hasSubmitted,
    error,
    setError,
    isConnected,
    gameComplete,
    handleCellSelect,
    handleCharacterSubmit,
    isSubmitDisabled,
  } = useGame()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Grid Arena
              </h1>
              <p className="text-muted-foreground text-sm mt-1 bg-slate-600">Real-time multiplayer strategy gamee</p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${isConnected ? "bg-accent animate-pulse" : "bg-destructive"}`}
              ></div>
              <span className="text-sm font-medium text-muted-foreground">{isConnected ? "Connected" : "Offline"}</span>
            </div>
          </div>
          <PlayerInfo
            onlinePlayers={gameState.onlinePlayers/2}
            hasSubmitted={hasSubmitted}
            totalMoves={gameState.totalMoves}
            isConnected={isConnected}
            gameComplete={gameComplete}
          />
        </div>
      </header>

      {/* Error Alert */}
      {error && <ErrorAlert message={error} onDismiss={() => setError("")} />}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel - Left Side */}
          <div className="lg:col-span-1">
            <ControlPanel
              character={character}
              onCharacterChange={setCharacter}
              onSubmit={handleCharacterSubmit}
              isSubmitDisabled={isSubmitDisabled}
              hasSubmitted={hasSubmitted}
              selectedCell={selectedCell}
              gameComplete={gameComplete}
            />
          </div>

          {/* Grid Display - Right Side */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Live Game Board {gameComplete && <span className="text-accent">✓ Complete</span>}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {gameComplete
                    ? "Game finished! New round starting soon..."
                    : selectedCell
                      ? `Selected: Row ${selectedCell.row + 1}, Column ${selectedCell.col + 1}`
                      : "Click on the grid to select your position"}
                </p>
              </div>
              <div className="flex justify-center">
                <Grid
                  grid={gameState.grid}
                  selectedCell={selectedCell}
                  onCellSelect={handleCellSelect}
                  hasSubmitted={hasSubmitted}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default GridGame
