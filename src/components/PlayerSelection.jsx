import React, { useState } from 'react';
import { emojiCategories } from '../constants';
import './styles/PlayerSelection.css';

const PlayerSelection = ({ startGame }) => {
  const [player1Category, setPlayer1Category] = useState('animals');
  const [player2Category, setPlayer2Category] = useState('food');

  return (
    <div className="category-selection">
      <h2>Select Emoji Categories</h2>
      <div className="player-selection">
        <h3>Player 1 Category:</h3>
        <div className="category-options">
          {Object.keys(emojiCategories).map(category => (
            <button 
              key={`p1-${category}`}
              className={player1Category === category ? 'selected' : ''}
              onClick={() => setPlayer1Category(category)}
            >
              {emojiCategories[category][0]} {category}
            </button>
          ))}
        </div>
      </div>
      <div className="player-selection">
        <h3>Player 2 Category:</h3>
        <div className="category-options">
          {Object.keys(emojiCategories).map(category => (
            <button 
              key={`p2-${category}`}
              className={player2Category === category ? 'selected' : ''}
              onClick={() => setPlayer2Category(category)}
            >
              {emojiCategories[category][0]} {category}
            </button>
          ))}
        </div>
      </div>
      <button 
        className="start-button" 
        onClick={() => startGame(player1Category, player2Category)}
      >
        Start Game
      </button>
    </div>
  );
};

export default PlayerSelection;