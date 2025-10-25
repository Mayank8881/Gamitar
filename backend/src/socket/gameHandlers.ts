// import { Socket, Server } from 'socket.io';
// import { GameManager } from '../models/gameManager';
// import { ServerToClientEvents, ClientToServerEvents } from '../types/game';

// export class GameHandlers {
//   private io: Server;

//   constructor(private gameManager: GameManager, io: Server) {
//     this.io = io;
//   }

//   handleConnection(socket: Socket<ClientToServerEvents, ServerToClientEvents>): void {
//     console.log('Player connected:', socket.id);

//     // Add player to game
//     this.gameManager.addPlayer(socket.id);

//     // Send initial game state
//     const clientState = this.gameManager.getClientGameState(socket.id);
//     socket.emit('gameState', clientState);

//     // Notify all players about new connection
//     this.io.emit('playerCountUpdate', this.gameManager.getOnlinePlayersCount());
//     socket.broadcast.emit('playerJoined', socket.id);

//     // Setup event handlers
//     this.setupEventHandlers(socket);
//   }

//   private setupEventHandlers(socket: Socket<ClientToServerEvents, ServerToClientEvents>): void {
//     // Handle cell update
//     socket.on('updateCell', (data) => {
//       const result = this.gameManager.updateCell({
//         ...data,
//         playerId: socket.id
//       });

//       if (!result.success) {
//         socket.emit('error', result.error!);
//         return;
//       }

//       // Broadcast update to all players
//       const update = {
//         ...data,
//         playerId: socket.id,
//         timestamp: new Date()
//       };

//       this.io.emit('cellUpdated', update);
//       socket.emit('submissionComplete');
//       this.io.emit('playerCountUpdate', this.gameManager.getOnlinePlayersCount());
//     });

//     // Handle game state request
//     socket.on('requestGameState', () => {
//       const clientState = this.gameManager.getClientGameState(socket.id);
//       socket.emit('gameState', clientState);
//     });

//     // Handle disconnect
//     socket.on('disconnect', (reason) => {
//       console.log('Player disconnected:', socket.id, 'Reason:', reason);
//       this.handleDisconnection(socket.id);
//     });
//   }

//   private handleDisconnection(playerId: string): void {
//     this.gameManager.removePlayer(playerId);
    
//     // Notify remaining players
//     this.io.emit('playerCountUpdate', this.gameManager.getOnlinePlayersCount());
//     this.io.emit('playerLeft', playerId);
//   }

//   handleGameReset(): void {
//     this.gameManager.resetGame();
//     this.io.emit('gameReset');
//   }
// }
import { Socket, Server } from 'socket.io';
import { GameManager } from '../models/gameManager';
import { ServerToClientEvents, ClientToServerEvents } from '../types/game';

export class GameHandlers {
  private playerSessions: Map<string, string> = new Map(); // socket.id -> sessionId
  private sessionMoves: Map<string, boolean> = new Map(); // sessionId -> hasMoved

  constructor(private gameManager: GameManager, private io: Server) {}

  handleConnection(socket: Socket<ClientToServerEvents, ServerToClientEvents>): void {
    console.log('Player connected:', socket.id);

    // Get or create session ID from client
    const clientSessionId = socket.handshake.auth.sessionId || this.generateSessionId();
    
    // Store session mapping
    this.playerSessions.set(socket.id, clientSessionId);

    // Check if this session has already made a move
    const hasMadeMove = this.sessionMoves.get(clientSessionId) || false;

    // Add player to game
    this.gameManager.addPlayer(socket.id, hasMadeMove);

    // Send initial game state
    const clientState = this.gameManager.getClientGameState(socket.id);
    socket.emit('gameState', clientState);

    // Send session ID back to client
    socket.emit('sessionAssigned', clientSessionId);

    // Notify all players
    this.io.emit('playerCountUpdate', this.gameManager.getOnlinePlayersCount());

    // Setup event handlers
    this.setupEventHandlers(socket, clientSessionId);
  }

  private setupEventHandlers(socket: Socket<ClientToServerEvents, ServerToClientEvents>, sessionId: string): void {
    // Handle cell update
    socket.on('updateCell', (data) => {
      // Check if session has already made a move
      if (this.sessionMoves.get(sessionId)) {
        socket.emit('error', 'You have already submitted your move in this game!');
        return;
      }

      const result = this.gameManager.updateCell({
        ...data,
        playerId: socket.id
      });

      if (!result.success) {
        socket.emit('error', result.error!);
        return;
      }

      // Mark this session as having made a move
      this.sessionMoves.set(sessionId, true);

      // Broadcast update to all players
      const update = {
        ...data,
        playerId: socket.id,
        timestamp: new Date()
      };

      this.io.emit('cellUpdated', update);
      socket.emit('submissionComplete');

      // Check if game is complete
      if (this.gameManager.isGameComplete()) {
        setTimeout(() => {
          this.startNewGame();
        }, 5000);
      }
    });

    // Handle disconnect
    socket.on('disconnect', (reason) => {
      console.log('Player disconnected:', socket.id, 'Reason:', reason);
      this.playerSessions.delete(socket.id);
      this.gameManager.removePlayer(socket.id);
      this.io.emit('playerCountUpdate', this.gameManager.getOnlinePlayersCount());
    });
  }

  private startNewGame(): void {
    this.gameManager.resetGame();
    // Clear all move records for new game
    this.sessionMoves.clear();
    this.io.emit('gameReset');
    this.io.emit('newGameStarted');
    console.log('🔄 New game started! All moves reset.');
  }

  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substring(2, 15);
  }
}