import React from 'react';
import Cell from './Cell';
import { emojiCategories, winPatterns } from '../constants';

class Board extends React.Component {
  handleCellClick = (index) => {
    const { gameState } = this.props;
    const { currentPlayer, player1, player2, winner, board } = gameState;
    
    if (winner || !board) return;

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

    // Check for winner - now properly checks player ownership
    let newWinner = null;
    let winningCells = [];
    
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[b] && newBoard[c]) {
        // Check if all three belong to the same player
        const aBelongsToPlayer1 = player1.emojis.includes(newBoard[a]);
        const bBelongsToPlayer1 = player1.emojis.includes(newBoard[b]);
        const cBelongsToPlayer1 = player1.emojis.includes(newBoard[c]);
        
        const aBelongsToPlayer2 = player2.emojis.includes(newBoard[a]);
        const bBelongsToPlayer2 = player2.emojis.includes(newBoard[b]);
        const cBelongsToPlayer2 = player2.emojis.includes(newBoard[c]);
        
        if (aBelongsToPlayer1 && bBelongsToPlayer1 && cBelongsToPlayer1) {
          newWinner = 1;
          winningCells = pattern;
          break;
        }
        
        if (aBelongsToPlayer2 && bBelongsToPlayer2 && cBelongsToPlayer2) {
          newWinner = 2;
          winningCells = pattern;
          break;
        }
      }
    }

    // Update game state
    const newGameState = {
      ...gameState,
      board: newBoard,
      currentPlayer: currentPlayer === 1 ? 2 : 1,
      [currentPlayer === 1 ? 'player1' : 'player2']: {
        ...currentPlayerData,
        emojis: newEmojis,
        positions: newPositions
      },
      winner: newWinner,
      winningCells: winningCells
    };

    this.props.updateGameState(newGameState);
  };

  render() {
    const { gameState } = this.props;
    const { currentPlayer, player1, player2, board } = gameState;

    if (!board) return null;

    return (
      <div className="game-container">
        <div className={`player-info player-${currentPlayer} ${currentPlayer === 1 ? 'active' : ''}`}>
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
              onClick={() => this.handleCellClick(index)}
              isWinningCell={gameState.winningCells.includes(index)}
            />
          ))}
        </div>
        
        <div className={`player-info player-${currentPlayer} ${currentPlayer === 2 ? 'active' : ''}`}>
          <h3>Player 2 ({player2.category})</h3>
          <div className="emoji-list">
            {player2.emojis.map((emoji, i) => (
              <span key={`p2-emoji-${i}`}>{emoji}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;