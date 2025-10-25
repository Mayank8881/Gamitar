// import { GameState, Player, CellUpdate } from '../types/game';

// export class GameManager {
//   private gameState: GameState;
//   private sessionPlayers: Map<string, Set<string>>; // Track sessions

//   constructor() {
//     this.gameState = {
//       grid: Array(10).fill(null).map(() => Array(10).fill('')),
//       players: new Map<string, Player>(),
//       onlinePlayers: 0,
//       totalMoves: 0
//     };
//     this.sessionPlayers = new Map();
//   }

//   getGameState(): GameState {
//     return this.gameState;
//   }

//   getClientGameState(playerId: string) {
//     return {
//       grid: this.gameState.grid,
//       onlinePlayers: this.gameState.onlinePlayers,
//       playerId,
//       totalMoves: this.gameState.totalMoves
//     };
//   }

//   addPlayer(playerId: string): void {
//     // Extract session ID from playerId (first 8 characters)
//     const sessionId = playerId.substring(0, 8);
    
//     // Initialize session if not exists
//     if (!this.sessionPlayers.has(sessionId)) {
//       this.sessionPlayers.set(sessionId, new Set());
//     }

//     const session = this.sessionPlayers.get(sessionId)!;
    
//     // Only count as new player if this session hasn't seen this exact playerId
//     if (!session.has(playerId)) {
//       session.add(playerId);
      
//       const player: Player = {
//         id: playerId,
//         hasSubmitted: false,
//         connected: true,
//         connectedAt: new Date()
//       };

//       this.gameState.players.set(playerId, player);
      
//       // Count unique sessions, not connections
//       this.gameState.onlinePlayers = this.sessionPlayers.size;
//     }
//   }

//   removePlayer(playerId: string): void {
//     const sessionId = playerId.substring(0, 8);
//     const session = this.sessionPlayers.get(sessionId);
    
//     if (session) {
//       session.delete(playerId);
      
//       // If session has no more players, remove the session
//       if (session.size === 0) {
//         this.sessionPlayers.delete(sessionId);
//       }
      
//       this.gameState.players.delete(playerId);
//       this.gameState.onlinePlayers = this.sessionPlayers.size;
//     }
//   }

//   updateCell(update: Omit<CellUpdate, 'timestamp'>): { success: boolean; error?: string } {
//     const player = this.gameState.players.get(update.playerId);
    
//     if (!player) {
//       return { success: false, error: 'Player not found' };
//     }

//     if (player.hasSubmitted) {
//       return { success: false, error: 'Player has already submitted a move' };
//     }

//     const { row, col, character } = update;

//     // Validation
//     if (row < 0 || row >= 10 || col < 0 || col >= 10) {
//       return { success: false, error: 'Invalid cell coordinates' };
//     }

//     if (!character.trim()) {
//       return { success: false, error: 'Character cannot be empty' };
//     }

//     if (this.gameState.grid[row][col]) {
//       return { success: false, error: 'Cell is already occupied' };
//     }

//     // Update game state
//     this.gameState.grid[row][col] = character.trim();
//     player.hasSubmitted = true;
//     this.gameState.players.set(update.playerId, player);
//     this.gameState.totalMoves++;

//     return { success: true };
//   }

//   getPlayer(playerId: string): Player | undefined {
//     return this.gameState.players.get(playerId);
//   }

//   resetGame(): void {
//     this.gameState.grid = Array(10).fill(null).map(() => Array(10).fill(''));
//     this.gameState.players.clear();
//     this.sessionPlayers.clear();
//     this.gameState.onlinePlayers = 0;
//     this.gameState.totalMoves = 0;
//   }

//   isCellOccupied(row: number, col: number): boolean {
//     return !!this.gameState.grid[row][col];
//   }

//   getOnlinePlayersCount(): number {
//     return this.gameState.onlinePlayers;
//   }

//   resetPlayer(playerId: string): void {
//     const player = this.gameState.players.get(playerId);
//     if (player) {
//       player.hasSubmitted = false;
//       this.gameState.players.set(playerId, player);
//     }
//   }

//   resetAllPlayers(): void {
//     for (const [playerId, player] of this.gameState.players) {
//       player.hasSubmitted = false;
//       this.gameState.players.set(playerId, player);
//     }
//   }

//   isGameComplete(): boolean {
//     return this.gameState.totalMoves >= 100; // All cells filled
//   }

//   getAvailableCells(): number {
//     return 100 - this.gameState.totalMoves;
//   }

// }
import { GameState, Player, CellUpdate } from '../types/game';

export class GameManager {
  private gameState: GameState;

  constructor() {
    this.gameState = {
      grid: Array(10).fill(null).map(() => Array(10).fill('')),
      players: new Map<string, Player>(),
      onlinePlayers: 0,
      totalMoves: 0
    };
  }

  getGameState(): GameState {
    return this.gameState;
  }

  getClientGameState(playerId: string) {
    const player = this.gameState.players.get(playerId);
    return {
      grid: this.gameState.grid,
      onlinePlayers: this.gameState.onlinePlayers,
      playerId,
      totalMoves: this.gameState.totalMoves,
      hasSubmitted: player ? player.hasSubmitted : false
    };
  }

  addPlayer(playerId: string, hasMadeMove: boolean = false): void {
    const player: Player = {
      id: playerId,
      hasSubmitted: hasMadeMove,
      connected: true,
      connectedAt: new Date()
    };

    this.gameState.players.set(playerId, player);
    this.gameState.onlinePlayers = this.gameState.players.size;
  }

  removePlayer(playerId: string): void {
    this.gameState.players.delete(playerId);
    this.gameState.onlinePlayers = this.gameState.players.size;
  }

  updateCell(update: Omit<CellUpdate, 'timestamp'>): { success: boolean; error?: string } {
    const player = this.gameState.players.get(update.playerId);
    
    if (!player) {
      return { success: false, error: 'Player not found' };
    }

    if (player.hasSubmitted) {
      return { success: false, error: 'Player has already submitted a move' };
    }

    const { row, col, character } = update;

    if (row < 0 || row >= 10 || col < 0 || col >= 10) {
      return { success: false, error: 'Invalid cell coordinates' };
    }

    if (!character.trim()) {
      return { success: false, error: 'Character cannot be empty' };
    }

    if (this.gameState.grid[row][col]) {
      return { success: false, error: 'Cell is already occupied' };
    }

    this.gameState.grid[row][col] = character.trim();
    player.hasSubmitted = true;
    this.gameState.players.set(update.playerId, player);
    this.gameState.totalMoves++;

    return { success: true };
  }

  // Add the missing method
  getOnlinePlayersCount(): number {
    return this.gameState.onlinePlayers;
  }

  // Add the missing method
  resetGame(): void {
    this.gameState.grid = Array(10).fill(null).map(() => Array(10).fill(''));
    this.gameState.totalMoves = 0;
    
    // Reset all players' submission status
    for (const [playerId, player] of this.gameState.players) {
      player.hasSubmitted = false;
      this.gameState.players.set(playerId, player);
    }
  }

  // Add the missing method
  isGameComplete(): boolean {
    return this.gameState.totalMoves >= 100;
  }

  getPlayer(playerId: string): Player | undefined {
    return this.gameState.players.get(playerId);
  }
}