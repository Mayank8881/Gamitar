import React from 'react';

interface ControlPanelProps {
  character: string;
  onCharacterChange: (char: string) => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
  hasSubmitted: boolean;
  selectedCell: { row: number; col: number } | null;
  onCellSelect: (row: number, col: number) => void;
  gameComplete: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  character,
  onCharacterChange,
  onSubmit,
  isSubmitDisabled,
  hasSubmitted,
  selectedCell,
  onCellSelect,
  gameComplete
}) => {
  const popularEmojis = ['⭐', '🎯', '❤️', '🔥', '🚀', '🎮', '🐱', '👑', '💎', '🌙'];

  const handleEmojiClick = (emoji: string) => {
    if (!hasSubmitted && !gameComplete) {
      onCharacterChange(emoji);
    }
  };

  const getSelectionText = () => {
    if (!selectedCell) return 'No cell selected';
    return `Selected: Row ${selectedCell.row + 1}, Column ${selectedCell.col + 1}`;
  };

  const getSubmitButtonText = () => {
    if (gameComplete) return 'Game Complete!';
    if (hasSubmitted) return '✅ Move Submitted!';
    if (!selectedCell) return 'Select a cell first';
    if (!character.trim()) return 'Enter a character';
    return 'Submit Character';
  };

  const selectCell = (row: number, col: number) => {
    if (!hasSubmitted && !gameComplete) {
      onCellSelect(row, col);
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-6 sticky top-6">
      {/* Game Status Banners */}
      {gameComplete && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 text-center animate-pulse">
          <h3 className="text-lg font-bold mb-2">🎉 Game Complete! 🎉</h3>
          <p className="text-sm">All 100 cells are filled! New game starting soon...</p>
        </div>
      )}

      {hasSubmitted && !gameComplete && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4 text-center">
          <h3 className="text-lg font-bold mb-2">⏳ Waiting for other players...</h3>
          <p className="text-sm">You've submitted your move. Waiting for others to play.</p>
          <p className="text-xs opacity-90 mt-1">Even if you reload the page, you won't be able to make another move.</p>
        </div>
      )}

    

      {/* Character Input */}
      <div className="space-y-4">
        <label htmlFor="character-input" className="block text-lg font-bold text-gray-800 text-center">
          Enter Unicode Character:
        </label>
        
        <input
          id="character-input"
          type="text"
          value={character}
          onChange={(e) => onCharacterChange(e.target.value)}
          maxLength={1}
          placeholder="e.g., ♠, ♥, ♦, ♣"
          disabled={hasSubmitted || gameComplete}
          className={`w-full p-4 text-2xl text-center border-2 rounded-lg font-bold transition-colors ${
            character.trim() 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 bg-white'
          } ${
            hasSubmitted || gameComplete ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
        
        {!hasSubmitted && !gameComplete && (
          <div className="space-y-3">
            <p className="text-center font-semibold text-gray-700">Quick select:</p>
            <div className="grid grid-cols-5 gap-2">
              {popularEmojis.map((emoji, index) => (
                <button
                  key={index}
                  className={`p-3 text-2xl rounded-lg border-2 transition-all duration-200 ${
                    character === emoji
                      ? 'bg-blue-500 text-white border-blue-600 scale-110'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:scale-105'
                  }`}
                  onClick={() => handleEmojiClick(emoji)}
                  type="button"
                  disabled={hasSubmitted || gameComplete}
                  title={`Use ${emoji}`}
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
        className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
          hasSubmitted
            ? 'bg-gray-500 text-white cursor-not-allowed'
            : gameComplete
            ? 'bg-green-600 text-white cursor-not-allowed'
            : isSubmitDisabled
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 hover:shadow-lg'
        }`}
      >
        {getSubmitButtonText()}
      </button>

      {/* Instructions */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">How to Play:</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Select a grid position</strong> from the selection grid</li>
          <li><strong>Enter a character</strong> or select from quick picks</li>
          <li><strong>Click "Submit Character"</strong> to place your character</li>
          <li><strong>Wait for other players</strong> to make their moves</li>
          <li><strong>New games start automatically</strong> when all cells are filled</li>
        </ol>
      </div>
    </div>
  );
};

export default ControlPanel;