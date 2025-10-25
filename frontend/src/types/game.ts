export interface CellPosition {
  row: number;
  col: number;
}

export interface CellUpdate {
  row: number;
  col: number;
  character: string;
  playerId: string;
  timestamp: Date;
}

export interface GameState {
  grid: string[][];
  onlinePlayers: number;
  playerId: string;
  totalMoves: number;
}

export interface PlayerInfo {
  onlinePlayers: number;
  hasSubmitted: boolean;
  totalMoves: number;
}

// export interface SocketEvents {
//   // Server to client events
//   gameState: (state: GameState) => void;
//   playerCountUpdate: (count: number) => void;
//   cellUpdated: (update: CellUpdate) => void;
//   submissionComplete: () => void;
//   error: (message: string) => void;
//   playerJoined: (playerId: string) => void;
//   playerLeft: (playerId: string) => void;
//   gameReset: () => void;
  
//   // Client to server events
//   updateCell: (data: Omit<CellUpdate, 'playerId' | 'timestamp'>) => void;
//   requestGameState: () => void;
// }

export interface SocketEvents {
  // Server to client events
  gameState: (state: GameState) => void;
  playerCountUpdate: (count: number) => void;
  cellUpdated: (update: CellUpdate) => void;
  submissionComplete: () => void;
  error: (message: string) => void;
  playerJoined: (playerId: string) => void;
  playerLeft: (playerId: string) => void;
  gameReset: () => void;
  newGameStarted: () => void;
  sessionAssigned: (sessionId: string) => void; // Add this
  
  // Client to server events
  updateCell: (data: Omit<CellUpdate, 'playerId' | 'timestamp'>) => void;
  requestGameState: () => void;
  resetGame: () => void;
  requestNewGame: () => void;
  restoreSession: (sessionId: string) => void; // Add this
}
