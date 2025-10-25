import { Router } from 'express';
import { GameManager } from '../models/gameManager';

const router = Router();
const gameManager = new GameManager();

// Get game statistics
router.get('/stats', (req, res) => {
  const gameState = gameManager.getGameState();
  
  res.json({
    onlinePlayers: gameState.onlinePlayers,
    totalMoves: gameState.totalMoves,
    grid: gameState.grid
  });
});

// Reset game (admin endpoint)
router.post('/reset', (req, res) => {
  // In a real app, you'd want authentication here
  gameManager.resetGame();
  
  res.json({ 
    success: true, 
    message: 'Game reset successfully' 
  });
});

// Get grid state
router.get('/grid', (req, res) => {
  const gameState = gameManager.getGameState();
  
  res.json({
    grid: gameState.grid,
    totalMoves: gameState.totalMoves
  });
});

export default router;