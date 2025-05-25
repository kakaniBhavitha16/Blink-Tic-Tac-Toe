import React from 'react';
import Confetti from 'react-confetti';

class GameStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfetti: false,
      confettiPieces: 200,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    if (this.props.gameState.winner) {
      this.startConfetti();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.gameState.winner && this.props.gameState.winner) {
      this.startConfetti();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.confettiTimer) {
      clearTimeout(this.confettiTimer);
    }
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  startConfetti = () => {
    this.setState({
      showConfetti: true,
      confettiPieces: 200
    });
    
    this.confettiTimer = setTimeout(() => {
      this.setState({ confettiPieces: 0 });
    }, 5000);
  };

  render() {
    const { gameState, resetGame } = this.props;
    const { currentPlayer, player1, player2, winner } = gameState;
    const { showConfetti, confettiPieces, windowWidth, windowHeight } = this.state;

    return (
      <div className="game-status">
        {!winner ? (
          <p className="turn-indicator">
            Current Turn:{' '}
            <span className={`player-${currentPlayer}-indicator`}>
              Player {currentPlayer} ({currentPlayer === 1 ? player1.category : player2.category})
            </span>
          </p>
        ) : (
          <div className={`winner-message winner-${winner}`}>
            {showConfetti && (
              <Confetti
                width={windowWidth}
                height={windowHeight}
                numberOfPieces={confettiPieces}
                recycle={false}
                gravity={0.2}
                colors={['#6366f1', '#f59e0b', '#10b981', '#8b5cf6', '#f97316']}
              />
            )}
            
            <h2 className="winner-text">
              Player {winner} Wins! 🎉
            </h2>
            
            <div className="celebration">
              <div className="firework"></div>
              <div className="firework"></div>
              <div className="firework"></div>
            </div>
            
            <button className="play-again" onClick={resetGame}>
              Play Again
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default GameStatus;