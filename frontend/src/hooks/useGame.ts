// import { useState, useEffect } from 'react';
// import { GameState, CellPosition, CellUpdate } from '../types/game';
// import { useSocket } from './useSocket';

// const initialGameState: GameState = {
//   grid: Array(10).fill(null).map(() => Array(10).fill('')),
//   onlinePlayers: 0,
//   playerId: '',
//   totalMoves: 0
// };

// export const useGame = () => {
//   const { socket, isConnected } = useSocket();
//   const [gameState, setGameState] = useState<GameState>(initialGameState);
//   const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
//   const [character, setCharacter] = useState('');
//   const [hasSubmitted, setHasSubmitted] = useState(false);
//   const [error, setError] = useState('');

//   // Clear error after 3 seconds
//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => setError(''), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   // Socket event handlers
//   useEffect(() => {
//     if (!socket) return;

//     const handleGameState = (state: GameState) => {
//       setGameState(state);
//     };

//     const handlePlayerCountUpdate = (count: number) => {
//       setGameState(prev => ({ ...prev, onlinePlayers: count }));
//     };

//     const handleCellUpdated = (update: CellUpdate) => {
//       setGameState(prev => {
//         const newGrid = [...prev.grid];
//         newGrid[update.row][update.col] = update.character;
//         return { ...prev, grid: newGrid };
//       });
//     };

//     const handleSubmissionComplete = () => {
//       setHasSubmitted(true);
//       setSelectedCell(null);
//       setCharacter('');
//     };

//     const handleError = (message: string) => {
//       setError(message);
//     };

//     // Register event listeners
//     socket.on('gameState', handleGameState);
//     socket.on('playerCountUpdate', handlePlayerCountUpdate);
//     socket.on('cellUpdated', handleCellUpdated);
//     socket.on('submissionComplete', handleSubmissionComplete);
//     socket.on('error', handleError);

//     return () => {
//       socket.off('gameState', handleGameState);
//       socket.off('playerCountUpdate', handlePlayerCountUpdate);
//       socket.off('cellUpdated', handleCellUpdated);
//       socket.off('submissionComplete', handleSubmissionComplete);
//       socket.off('error', handleError);
//     };
//   }, [socket]);

//   const handleCellSelect = (row: number, col: number) => {
//     if (hasSubmitted) return;
//     if (gameState.grid[row][col]) return;
//     setSelectedCell({ row, col });
//   };

//   const handleCharacterSubmit = () => {
//     if (!socket) {
//       setError('Not connected to server');
//       return;
//     }

//     if (!selectedCell) {
//       setError('Please select a cell first');
//       return;
//     }

//     if (!character.trim()) {
//       setError('Please enter a character');
//       return;
//     }

//     if (hasSubmitted) {
//       setError('You have already submitted your move');
//       return;
//     }

//     socket.emit('updateCell', {
//       row: selectedCell.row,
//       col: selectedCell.col,
//       character: character.trim()
//     });
//   };

//   const isSubmitDisabled = !selectedCell || !character.trim() || hasSubmitted || !isConnected;

//   return {
//     gameState,
//     selectedCell,
//     character,
//     setCharacter,
//     hasSubmitted,
//     error,
//     setError,
//     isConnected,
//     handleCellSelect,
//     handleCharacterSubmit,
//     isSubmitDisabled
//   };
// };

import { useState, useEffect } from 'react';
import { GameState, CellPosition, CellUpdate } from '../types/game';
import { useSocket } from './useSocket';

// Remove hasSubmitted from GameState since it's not in the backend type
const initialGameState: GameState = {
  grid: Array(10).fill(null).map(() => Array(10).fill('')),
  onlinePlayers: 0,
  playerId: '',
  totalMoves: 0
};

export const useGame = () => {
  const { socket, isConnected } = useSocket();
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [character, setCharacter] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [gameComplete, setGameComplete] = useState(false);

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    const handleGameState = (state: GameState) => {
      console.log('🎮 Received game state');
      setGameState(state);
      // We'll determine hasSubmitted based on server response or local state
    };

    const handlePlayerCountUpdate = (count: number) => {
      setGameState(prev => ({ ...prev, onlinePlayers: count }));
    };

    const handleCellUpdated = (update: CellUpdate) => {
      setGameState(prev => {
        const newGrid = [...prev.grid];
        newGrid[update.row][update.col] = update.character;
        const totalMoves = newGrid.flat().filter(cell => cell).length;
        
        if (totalMoves >= 100) {
          setGameComplete(true);
        }
        
        return { ...prev, grid: newGrid, totalMoves };
      });
    };

    const handleSubmissionComplete = () => {
      console.log('✅ Submission complete - disabling future moves');
      setHasSubmitted(true);
      setSelectedCell(null);
      setCharacter('');
    };

    const handleError = (message: string) => {
      setError(message);
    };

    const handleGameReset = () => {
      console.log('🔄 Game reset - re-enabling moves');
      setGameState(initialGameState);
      setHasSubmitted(false);
      setSelectedCell(null);
      setCharacter('');
      setError('');
      setGameComplete(false);
    };

    const handleNewGameStarted = () => {
      console.log('🎮 New game started');
      setHasSubmitted(false);
      setSelectedCell(null);
      setCharacter('');
      setGameComplete(false);
    };

    // Register event listeners
    socket.on('gameState', handleGameState);
    socket.on('playerCountUpdate', handlePlayerCountUpdate);
    socket.on('cellUpdated', handleCellUpdated);
    socket.on('submissionComplete', handleSubmissionComplete);
    socket.on('error', handleError);
    socket.on('gameReset', handleGameReset);
    socket.on('newGameStarted', handleNewGameStarted);

    return () => {
      socket.off('gameState', handleGameState);
      socket.off('playerCountUpdate', handlePlayerCountUpdate);
      socket.off('cellUpdated', handleCellUpdated);
      socket.off('submissionComplete', handleSubmissionComplete);
      socket.off('error', handleError);
      socket.off('gameReset', handleGameReset);
      socket.off('newGameStarted', handleNewGameStarted);
    };
  }, [socket]);

  const handleCellSelect = (row: number, col: number) => {
    if (hasSubmitted) {
      setError('You have already submitted your move!');
      return;
    }
    if (gameComplete) return;
    if (gameState.grid[row][col]) {
      setError('This cell is already occupied!');
      return;
    }
    setSelectedCell({ row, col });
  };

  const handleCharacterSubmit = () => {
    if (!socket) {
      setError('Not connected to server');
      return;
    }

    if (hasSubmitted) {
      setError('You have already submitted your move!');
      return;
    }

    if (!selectedCell) {
      setError('Please select a cell first');
      return;
    }

    if (!character.trim()) {
      setError('Please enter a character');
      return;
    }

    if (gameComplete) {
      setError('Game is complete! Waiting for new game...');
      return;
    }

    socket.emit('updateCell', {
      row: selectedCell.row,
      col: selectedCell.col,
      character: character.trim()
    });
  };

  const isSubmitDisabled = hasSubmitted || !selectedCell || !character.trim() || !isConnected || gameComplete;

  return {
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
  };
};