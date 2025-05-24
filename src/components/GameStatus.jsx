import React from 'react';
import './styles/GameStatus.css';

const GameStatus = ({ gameState, resetGame }) => {
  const { currentPlayer, player1, player2, winner } = gameState;

  return (
    <div className="game-status">
      {!winner ? (
        <p className="turn-indicator">
          Current Turn: <span className={`player-${currentPlayer}`}>
            Player {currentPlayer} ({currentPlayer === 1 ? player1.category : player2.category})
          </span>
        </p>
      ) : (
        <div className={`winner-message winner-${winner}`}>
          <h2 className="winner-text">Player {winner} Wins!</h2>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <button className="play-again" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameStatus;