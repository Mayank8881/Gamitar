import React from 'react';
import { CellPosition } from '../types/game';

interface GridProps {
  grid: string[][];
  selectedCell: CellPosition | null;
  onCellSelect: (row: number, col: number) => void;
  hasSubmitted: boolean;
}

const Grid: React.FC<GridProps> = ({ 
  grid, 
  selectedCell, 
  onCellSelect, 
  hasSubmitted 
}) => {
  const handleCellClick = (row: number, col: number) => {
    if (hasSubmitted) return;
    if (grid[row][col]) return;
    onCellSelect(row, col);
  };

  return (
    <div className="inline-block bg-gray-800 rounded-lg p-3 shadow-2xl">
      <div className="grid grid-cols-[auto_repeat(10,1fr)] gap-1">
        {/* Top-left corner */}
        <div className="w-8 h-8"></div>
        
        {/* Column headers */}
        {Array.from({ length: 10 }, (_, col) => (
          <div 
            key={`col-header-${col}`}
            className="w-8 h-8 flex items-center justify-center text-white font-bold text-xs bg-gray-700 rounded"
          >
            {col + 1}
          </div>
        ))}
        
        {/* Grid rows with row labels */}
        {grid.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {/* Row label */}
            <div 
              key={`row-label-${rowIndex}`}
              className="w-8 h-8 flex items-center justify-center text-white font-bold text-xs bg-gray-700 rounded"
            >
              {rowIndex + 1}
            </div>
            
            {/* Grid cells */}
            {row.map((cell, colIndex) => {
              const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
              const isOccupied = !!cell;
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-8 h-8 flex items-center justify-center border-2 rounded transition-all duration-200 font-medium text-sm ${
                    isSelected
                      ? 'border-red-500 bg-yellow-200 scale-110 shadow-lg'
                      : isOccupied
                      ? 'border-gray-400 bg-gray-300 cursor-not-allowed'
                      : 'border-gray-300 bg-white hover:bg-gray-100 hover:scale-105 cursor-pointer'
                  } ${
                    hasSubmitted ? 'cursor-not-allowed hover:scale-100' : ''
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  title={
                    isOccupied 
                      ? `Occupied: ${cell}` 
                      : hasSubmitted 
                        ? 'Cannot select - already submitted' 
                        : `Row ${rowIndex + 1}, Col ${colIndex + 1}`
                  }
                >
                  {cell}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Grid;