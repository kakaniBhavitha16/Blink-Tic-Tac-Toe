import React from 'react';
import { emojiCategories } from '../constants';

class PlayerSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1Category: null,
      player2Category: null
    };
  }

  handleCategoryChange = (player, category) => {
    if (player === 1) {
      this.setState({ player1Category: category });
    } else {
      this.setState({ player2Category: category });
    }
  };

  startGame = () => {
    const { player1Category, player2Category } = this.state;
    this.props.startGame(player1Category, player2Category);
  };

  render() {
    const { player1Category, player2Category } = this.state;

    return (
      <div className="category-selection">
        <h2>Select Emoji Categories</h2>
        
        {/* Player 1 Selection */}
        <div className="player-selection">
          <h3>Player 1 Category:</h3>
          <div className="category-options">
            {Object.keys(emojiCategories).map(category => (
              <button 
                key={`p1-${category}`}
                className={player1Category === category ? 'selected' : ''}
                onClick={() => this.handleCategoryChange(1, category)}
                disabled={player2Category === category}
              >
                {emojiCategories[category][0]} {category}
              </button>
            ))}
          </div>
          {!player1Category && <p className="selection-hint">Please select a category</p>}
        </div>
        
        {/* Player 2 Selection */}
        <div className="player-selection">
          <h3>Player 2 Category:</h3>
          <div className="category-options">
            {Object.keys(emojiCategories).map(category => (
              <button 
                key={`p2-${category}`}
                className={player2Category === category ? 'selected' : ''}
                onClick={() => this.handleCategoryChange(2, category)}
                disabled={player1Category === category}
              >
                {emojiCategories[category][0]} {category}
              </button>
            ))}
          </div>
          {!player2Category && <p className="selection-hint">Please select a category</p>}
        </div>
        
        <button 
          className="start-button" 
          onClick={this.startGame}
          disabled={!player1Category || !player2Category}
        >
          Start Game
        </button>
      </div>
    );
  }
}

export default PlayerSelection;
