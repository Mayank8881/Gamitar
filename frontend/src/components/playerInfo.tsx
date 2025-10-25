// import React from 'react';

// interface PlayerInfoProps {
//   onlinePlayers: number;
//   hasSubmitted: boolean;
//   totalMoves: number;
//   isConnected: boolean;
//   gameComplete?: boolean;
// }

// const PlayerInfo: React.FC<PlayerInfoProps> = ({ 
//   onlinePlayers, 
//   hasSubmitted, 
//   totalMoves,
//   isConnected,
//   gameComplete = false
// }) => {
//   return (
//     <div className="flex items-start space-x-4">
//       <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border text-center">
//         <div className="text-xs text-gray-300">Status</div>
//         <div className={`font-semibold ${isConnected ? 'text-green-300' : 'text-red-300'}`}>
//           {isConnected ? 'Connected' : 'Disconnected'}
//         </div>
//       </div>
      
//       <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
//         <div className="text-xs text-gray-300">Online Players</div>
//         <div className="font-semibold text-white">{onlinePlayers}</div>
//       </div>
      
//       <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
//         <div className="text-xs text-gray-300">Moves Made</div>
//         <div className="font-semibold text-white">{totalMoves}/100</div>
//       </div>
      
//       <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
//         <div className="text-xs text-gray-300">Your Status</div>
//         <div className="font-semibold text-white">
//           {gameComplete ? 'Game Complete!' :
//            hasSubmitted ? 'Move Submitted!' : 'Ready to Play'}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlayerInfo;
import type React from "react"

interface PlayerInfoProps {
  onlinePlayers: number
  hasSubmitted: boolean
  totalMoves: number
  isConnected: boolean
  gameComplete?: boolean
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({
  onlinePlayers,
  hasSubmitted,
  totalMoves,
  isConnected,
  gameComplete = false,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-card border border-border rounded-lg p-3">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Status</div>
        <div className={`text-lg font-bold ${isConnected ? "text-accent" : "text-destructive"}`}>
          {isConnected ? "● Online" : "● Offline"}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-3">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Players</div>
        <div className="text-lg font-bold text-secondary">{onlinePlayers}</div>
      </div>

      <div className="bg-card border border-border rounded-lg p-3">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Moves</div>
        <div className="text-lg font-bold text-foreground">{totalMoves}/100</div>
      </div>

      <div className="bg-card border border-border rounded-lg p-3">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Your Status</div>
        <div className="text-lg font-bold">
          {gameComplete ? (
            <span className="text-accent">✓ Complete</span>
          ) : hasSubmitted ? (
            <span className="text-secondary">⏳ Waiting</span>
          ) : (
            <span className="text-foreground">Ready</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlayerInfo
