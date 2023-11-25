import React from 'react'
import './PlaygroundCard.scss';

function PlaygroundCard({textToDisplay, itemWidth, itemHeight, itemClick}) {
  
  const itemStyle = {
    minWidth: `${itemWidth}px`,
    minHeight: `${itemHeight/2}px`,
    maxHeight: `${itemHeight/2}px`,
  };

  return (
    <div className='carousel-item' style={itemStyle} onClick={itemClick}>
      <p className='carousel-text'>{textToDisplay}</p>
    </div>
  )
}

export default PlaygroundCard
