import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value && this.props.value) {
      this.setState({ isAnimating: true });
      this.animationTimer = setTimeout(() => {
        this.setState({ isAnimating: false });
      }, 300);
    }
  }

  componentWillUnmount() {
    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
    }
  }

  render() {
    const { value, onClick, isWinningCell } = this.props;
    const { isAnimating } = this.state;

    return (
      <div
        className={`cell ${isWinningCell ? 'winning' : ''} ${isAnimating ? 'pop' : ''}`}
        onClick={onClick}
      >
        {value}
      </div>
    );
  }
}

export default Cell;