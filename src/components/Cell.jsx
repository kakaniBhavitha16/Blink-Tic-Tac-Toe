import React from 'react';
import './styles/Cell.css';

const Cell = ({ value, onClick, isWinningCell }) => {
  return (
    <div 
      className={`cell ${isWinningCell ? 'winning' : ''}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default Cell;