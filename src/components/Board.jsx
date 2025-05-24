import React from 'react';
import Cell from './Cell';
import { emojiCategories, winPatterns } from '../constants';
import './styles/Board.css';

const Board = ({ gameState, setGameState }) => {
  const { board, currentPlayer, player1, player2, winner } = gameState;

  const handleCellClick = (index) => {
    if (winner) return;

    const currentPlayerData = currentPlayer === 1 ? player1 : player2;
    
    // Don't allow placing on the oldest position when adding 4th emoji
    if (currentPlayerData.positions.length >= 3 && 
        currentPlayerData.positions[0] === index) {
      return;
    }

    // Get random emoji from player's category
    const category = currentPlayer === 1 ? player1.category : player2.category;
    const availableEmojis = emojiCategories[category];
    const randomEmoji = availableEmojis[Math.floor(Math.random() * availableEmojis.length)];

    // Handle vanishing rule
    let newEmojis = [...currentPlayerData.emojis];
    let newPositions = [...currentPlayerData.positions];
    const newBoard = [...board];

    if (newEmojis.length >= 3) {
      // Remove oldest emoji
      const oldestPosition = newPositions.shift();
      newEmojis.shift();
      newBoard[oldestPosition] = null;
    }

    // Add new emoji
    newEmojis.push(randomEmoji);
    newPositions.push(index);
    newBoard[index] = randomEmoji;

    // Check for winner
    let newWinner = null;
    let winningCells = [];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        if (player1.emojis.includes(newBoard[a])) {
          newWinner = 1;
        } else if (player2.emojis.includes(newBoard[a])) {
          newWinner = 2;
        }
        winningCells = pattern;
        break;
      }
    }

    // Update game state
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: currentPlayer === 1 ? 2 : 1,
      [currentPlayer === 1 ? 'player1' : 'player2']: {
        ...currentPlayerData,
        emojis: newEmojis,
        positions: newPositions
      },
      winner: newWinner,
      winningCells: newWinner ? winningCells : []
    }));
  };

  return (
    <div className="game-container">
      <div className={`player-info ${currentPlayer === 1 ? 'active' : ''}`}>
        <h3>Player 1 ({player1.category})</h3>
        <div className="emoji-list">
          {player1.emojis.map((emoji, i) => (
            <span key={`p1-emoji-${i}`}>{emoji}</span>
          ))}
        </div>
      </div>
      
      <div className="board">
        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onClick={() => handleCellClick(index)}
            isWinningCell={gameState.winningCells.includes(index)}
          />
        ))}
      </div>
      
      <div className={`player-info ${currentPlayer === 2 ? 'active' : ''}`}>
        <h3>Player 2 ({player2.category})</h3>
        <div className="emoji-list">
          {player2.emojis.map((emoji, i) => (
            <span key={`p2-emoji-${i}`}>{emoji}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;