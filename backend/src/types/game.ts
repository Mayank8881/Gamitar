export interface Player {
  id: string;
  hasSubmitted: boolean;
  connected: boolean;
  connectedAt: Date;
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
  players: Map<string, Player>;
  onlinePlayers: number;
  totalMoves: number;
}

export interface ClientGameState {
  grid: string[][];
  onlinePlayers: number;
  playerId: string;
  totalMoves: number;
}

export interface ServerToClientEvents {
  gameState: (state: ClientGameState) => void;
  playerCountUpdate: (count: number) => void;
  cellUpdated: (update: CellUpdate) => void;
  submissionComplete: () => void;
  error: (message: string) => void;
  playerJoined: (playerId: string) => void;
  playerLeft: (playerId: string) => void;
  gameReset: () => void;
  newGameStarted: () => void;
  sessionAssigned: (sessionId: string) => void;
}

export interface ClientToServerEvents {
  updateCell: (data: Omit<CellUpdate, 'playerId' | 'timestamp'>) => void;
  requestGameState: () => void;
  resetGame: () => void; // Add this
  requestNewGame: () => void;
  restoreSession: (sessionId: string) => void; 
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  playerId: string;
}
