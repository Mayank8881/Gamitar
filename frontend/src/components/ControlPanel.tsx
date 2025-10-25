// import React from 'react';

// interface ControlPanelProps {
//   character: string;
//   onCharacterChange: (char: string) => void;
//   onSubmit: () => void;
//   isSubmitDisabled: boolean;
//   hasSubmitted: boolean;
//   selectedCell: { row: number; col: number } | null;
//   onCellSelect: (row: number, col: number) => void;
//   gameComplete: boolean;
// }

// const ControlPanel: React.FC<ControlPanelProps> = ({
//   character,
//   onCharacterChange,
//   onSubmit,
//   isSubmitDisabled,
//   hasSubmitted,
//   selectedCell,
//   onCellSelect,
//   gameComplete
// }) => {
//   const popularEmojis = ['⭐', '🎯', '❤️', '🔥', '🚀', '🎮', '🐱', '👑', '💎', '🌙'];

//   const handleEmojiClick = (emoji: string) => {
//     if (!hasSubmitted && !gameComplete) {
//       onCharacterChange(emoji);
//     }
//   };

//   const getSubmitButtonText = () => {
//     if (gameComplete) return 'Game Complete!';
//     if (hasSubmitted) return 'Move Submitted';
//     if (!selectedCell) return 'Select a cell first';
//     if (!character.trim()) return 'Enter a character';
//     return 'Submit Character';
//   };

//   return (
//     <div className="bg-white rounded-2xl border w-[420px] border-gray-200 shadow-lg p-5 space-y-4 sticky top-6">
//       {/* Game Status Banners */}
//       {gameComplete && (
//         <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl p-3 text-center shadow-md">
//           <div className="text-2xl mb-1">🎉</div>
//           <h3 className="font-bold text-sm">Game Complete!</h3>
//           <p className="text-xs opacity-90 mt-1">New game starting soon...</p>
//         </div>
//       )}

//       {hasSubmitted && !gameComplete && (
//         <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl p-3 text-center shadow-md">
//           <div className="text-2xl mb-1">⏳</div>
//           <h3 className="font-bold text-sm">Waiting for others...</h3>
//           <p className="text-xs opacity-90 mt-1">Your move is locked in</p>
//         </div>
//       )}

//       {/* Character Input Section */}
//       <div className="space-y-3">
//         <div className="flex items-center justify-between">
//           <label htmlFor="character-input" className="text-sm font-bold text-gray-700">
//             Your Character
//           </label>
//           {selectedCell && (
//             <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
//               Row {selectedCell.row + 1}, Col {selectedCell.col + 1}
//             </span>
//           )}
//         </div>
        
//         <input
//           id="character-input"
//           type="text"
//           value={character}
//           onChange={(e) => onCharacterChange(e.target.value)}
//           maxLength={1}
//           placeholder="Type or select below"
//           disabled={hasSubmitted || gameComplete}
//           className={`w-full p-3 text-3xl text-center border-2 rounded-xl font-bold transition-all ${
//             character.trim() 
//               ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
//               : 'border-gray-300 bg-gray-50 focus:border-blue-400 focus:bg-white'
//           } ${
//             hasSubmitted || gameComplete ? 'opacity-50 cursor-not-allowed' : 'focus:outline-none'
//           }`}
//         />
        
//         {!hasSubmitted && !gameComplete && (
//           <div className="space-y-2">
//             <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Quick Pick</p>
//             <div className="grid grid-cols-5 gap-1.5">
//               {popularEmojis.map((emoji, index) => (
//                 <button
//                   key={index}
//                   className={`p-2.5 text-2xl rounded-lg transition-all duration-150 ${
//                     character === emoji
//                       ? 'bg-blue-500 text-white shadow-md scale-105'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 active:scale-95'
//                   }`}
//                   onClick={() => handleEmojiClick(emoji)}
//                   type="button"
//                   disabled={hasSubmitted || gameComplete}
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button
//         onClick={onSubmit}
//         disabled={isSubmitDisabled}
//         className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 ${
//           hasSubmitted
//             ? 'bg-gray-400 text-white cursor-not-allowed'
//             : gameComplete
//             ? 'bg-emerald-600 text-white cursor-not-allowed'
//             : isSubmitDisabled
//             ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg active:scale-98'
//         }`}
//       >
//         {getSubmitButtonText()}
//       </button>

//       {/* Compact Instructions */}
//       <details className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden group">
//         <summary className="px-4 py-2.5 cursor-pointer font-semibold text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-between">
//           <span>📖 How to Play</span>
//           <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
//         </summary>
//         <div className="px-4 py-3 border-t border-gray-200 bg-white">
//           <ol className="space-y-1.5 text-xs text-gray-600">
//             <li className="flex items-start gap-2">
//               <span className="font-bold text-blue-600 mt-0.5">1.</span>
//               <span>Select a grid position</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="font-bold text-blue-600 mt-0.5">2.</span>
//               <span>Enter or quick-pick a character</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="font-bold text-blue-600 mt-0.5">3.</span>
//               <span>Submit and wait for others</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="font-bold text-blue-600 mt-0.5">4.</span>
//               <span>New game starts when board fills</span>
//             </li>
//           </ol>
//         </div>
//       </details>
//     </div>
//   );
// };

// export default ControlPanel;
"use client"

import type React from "react"

interface ControlPanelProps {
  character: string
  onCharacterChange: (char: string) => void
  onSubmit: () => void
  isSubmitDisabled: boolean
  hasSubmitted: boolean
  selectedCell: { row: number; col: number } | null
  gameComplete: boolean
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  character,
  onCharacterChange,
  onSubmit,
  isSubmitDisabled,
  hasSubmitted,
  selectedCell,
  gameComplete,
}) => {
  const popularEmojis = ["⭐", "🎯", "❤️", "🔥", "🚀", "🎮", "🐱", "👑", "💎", "🌙"]

  const handleEmojiClick = (emoji: string) => {
    if (!hasSubmitted && !gameComplete) {
      onCharacterChange(emoji)
    }
  }

  const getSubmitButtonText = () => {
    if (gameComplete) return "Game Complete"
    if (hasSubmitted) return "Move Submitted"
    if (!selectedCell) return "Select a cell first"
    if (!character.trim()) return "Choose a character"
    return "Submit Move"
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6 sticky top-24">
      {/* Game Status */}
      {gameComplete && (
        <div className="bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/30 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🎉</div>
          <h3 className="font-bold text-accent">Game Complete!</h3>
          <p className="text-xs text-muted-foreground mt-1">New round starting soon...</p>
        </div>
      )}

      {hasSubmitted && !gameComplete && (
        <div className="bg-gradient-to-br from-secondary/20 to-primary/20 border border-secondary/30 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">⏳</div>
          <h3 className="font-bold text-secondary">Waiting for Others</h3>
          <p className="text-xs text-muted-foreground mt-1">Your move is locked in</p>
        </div>
      )}

      {/* Character Selection */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">Your Character</label>
          {selectedCell && (
            <div className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded mb-3 inline-block">
              Position: Row {selectedCell.row + 1}, Col {selectedCell.col + 1}
            </div>
          )}
        </div>

        <input
          type="text"
          value={character}
          onChange={(e) => onCharacterChange(e.target.value)}
          maxLength={1}
          placeholder="Pick or type"
          disabled={hasSubmitted || gameComplete}
          className={`w-full p-4 text-4xl text-center border-2 rounded-lg font-bold transition-all bg-input ${
            character.trim() ? "border-accent text-accent" : "border-border text-muted-foreground"
          } ${
            hasSubmitted || gameComplete
              ? "opacity-50 cursor-not-allowed"
              : "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          }`}
        />

        {!hasSubmitted && !gameComplete && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Quick Pick</p>
            <div className="grid grid-cols-5 gap-2">
              {popularEmojis.map((emoji, index) => (
                <button
                  key={index}
                  className={`p-3 text-2xl rounded-lg transition-all duration-150 border ${
                    character === emoji
                      ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/50 scale-105"
                      : "bg-input border-border hover:border-accent hover:scale-105 active:scale-95"
                  }`}
                  onClick={() => handleEmojiClick(emoji)}
                  type="button"
                  disabled={hasSubmitted || gameComplete}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={isSubmitDisabled}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
          hasSubmitted
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : gameComplete
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : isSubmitDisabled
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-gradient-to-r from-accent to-secondary text-accent-foreground hover:shadow-lg hover:shadow-accent/30 active:scale-95"
        }`}
      >
        {getSubmitButtonText()}
      </button>

      {/* Instructions */}
      <details className="bg-muted border border-border rounded-lg overflow-hidden group">
        <summary className="px-4 py-3 cursor-pointer font-semibold text-sm text-foreground hover:bg-input transition-colors flex items-center justify-between">
          <span>📖 How to Play</span>
          <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="px-4 py-3 border-t border-border bg-input/50">
          <ol className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="font-bold text-accent mt-0.5">1.</span>
              <span>Click a grid position to select it</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-accent mt-0.5">2.</span>
              <span>Pick or type your character</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-accent mt-0.5">3.</span>
              <span>Submit your move</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-accent mt-0.5">4.</span>
              <span>Wait for other players</span>
            </li>
          </ol>
        </div>
      </details>
    </div>
  )
}

export default ControlPanel
