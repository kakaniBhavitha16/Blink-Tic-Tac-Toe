import React from 'react';
import Board from './components/Board';
import PlayerSelection from './components/PlayerSelection';
import GameStatus from './components/GameStatus';
import HelpSection from './components/HelpSection';
import './App.css';
import './Game.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: {
        board: Array(9).fill(null),
        player1: { category: null, emojis: [], positions: [] },
        player2: { category: null, emojis: [], positions: [] },
        currentPlayer: 1,
        winner: null,
        winningCells: []
      },
      showHelp: false,
      gameStarted: false
    };
  }

  startGame = (player1Category, player2Category) => {
    if (!player1Category || !player2Category) {
      alert('Please select categories for both players!');
      return;
    }
    
    this.setState({
      gameState: {
        board: Array(9).fill(null),
        player1: { category: player1Category, emojis: [], positions: [] },
        player2: { category: player2Category, emojis: [], positions: [] },
        currentPlayer: 1,
        winner: null,
        winningCells: []
      },
      gameStarted: true
    });
  };

  resetGame = () => {
    this.setState({
      gameStarted: false,
      gameState: {
        board: Array(9).fill(null),
        player1: { category: null, emojis: [], positions: [] },
        player2: { category: null, emojis: [], positions: [] },
        currentPlayer: 1,
        winner: null,
        winningCells: []
      }
    });
  };

  updateGameState = (newGameState) => {
    this.setState({
      gameState: newGameState
    });
  };

  toggleHelp = () => {
    this.setState(prevState => ({
      showHelp: !prevState.showHelp
    }));
  };

  render() {
    const { gameState, showHelp, gameStarted } = this.state;

    return (
      <div className="app">
        <h1>Twisted Tic Tac Toe</h1>
        
        {!gameStarted ? (
          <PlayerSelection startGame={this.startGame} />
        ) : (
          <>
            <Board 
              gameState={gameState} 
              updateGameState={this.updateGameState} 
            />
            <GameStatus 
              gameState={gameState} 
              resetGame={this.resetGame} 
            />
          </>
        )}

        <button className="help-button" onClick={this.toggleHelp}>
          {showHelp ? 'Hide Help' : 'Show Help'}
        </button>
        
        {showHelp && <HelpSection />}
      </div>
    );
  }
}

export default App;