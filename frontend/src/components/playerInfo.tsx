import React from 'react';

interface PlayerInfoProps {
  onlinePlayers: number;
  hasSubmitted: boolean;
  totalMoves: number;
  isConnected: boolean;
  gameComplete?: boolean;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ 
  onlinePlayers, 
  hasSubmitted, 
  totalMoves,
  isConnected,
  gameComplete = false
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
        <div className="text-xs text-gray-300">Status</div>
        <div className={`font-semibold ${isConnected ? 'text-green-300' : 'text-red-300'}`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
        <div className="text-xs text-gray-300">Online Players</div>
        <div className="font-semibold text-white">{onlinePlayers}</div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
        <div className="text-xs text-gray-300">Moves Made</div>
        <div className="font-semibold text-white">{totalMoves}/100</div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
        <div className="text-xs text-gray-300">Your Status</div>
        <div className="font-semibold text-white">
          {gameComplete ? 'Game Complete!' :
           hasSubmitted ? 'Move Submitted!' : 'Ready to Play'}
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;