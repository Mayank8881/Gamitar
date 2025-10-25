import React from 'react';
import { useGame } from '../hooks/useGame';
import Grid from './grid';
import PlayerInfo from './playerInfo';
import ControlPanel from './ControlPanel';
import ErrorAlert from './ErrorAlert';

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
    isSubmitDisabled
  } = useGame();

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[90vh] flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white px-6 py-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Multiplayer Grid Game</h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className={`w-3 h-3 rounded-full animate-pulse ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm">Server: {isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          <PlayerInfo 
            onlinePlayers={gameState.onlinePlayers}
            hasSubmitted={hasSubmitted}
            totalMoves={gameState.totalMoves}
            isConnected={isConnected}
            gameComplete={gameComplete}
          />
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <ErrorAlert 
          message={error} 
          onDismiss={() => setError('')} 
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Control Panel - Left Side */}
          <div className="lg:flex-1 lg:max-w-md">
            <ControlPanel
              character={character}
              onCharacterChange={setCharacter}
              onSubmit={handleCharacterSubmit}
              isSubmitDisabled={isSubmitDisabled}
              hasSubmitted={hasSubmitted}
              selectedCell={selectedCell}
              onCellSelect={handleCellSelect}
              gameComplete={gameComplete}
            />
          </div>

          {/* Grid Display - Right Side */}
          <div className="lg:flex-1">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                Live Game Grid {gameComplete && '(Complete!)'}
              </h3>
              <Grid
                grid={gameState.grid}
                selectedCell={selectedCell}
                onCellSelect={handleCellSelect}
                hasSubmitted={hasSubmitted}
              />
              <div className={`mt-4 p-4 rounded-lg font-semibold ${
                gameComplete 
                  ? 'bg-green-100 text-green-800 border-l-4 border-green-500' 
                  : selectedCell 
                    ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                    : 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500'
              }`}>
                {gameComplete 
                  ? '🎉 Game Complete! New game starting soon...'
                  : selectedCell 
                    ? `✅ Selected: Row ${selectedCell.row + 1}, Column ${selectedCell.col + 1}`
                    : 'Click on the grid or use the control panel to select a cell'
                }
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 px-6 py-4 text-center">
        <p className="text-gray-600 text-sm">
          Select a position → Choose a character → Submit your move!
        </p>
      </footer>
    </div>
  );
};

export default GridGame;