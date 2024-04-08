import './PlaygroundCard.scss';

function PlaygroundCard({ itemWidth, itemHeight, itemClick, itemImgPath, itemName }) {
  const handleImageClick = () => {itemClick();}
  const itemStyle = { // dynamically apply CSS sizing
    minWidth: `${itemWidth}px`,
    maxWidth: `${itemWidth}px`,
    minHeight: `${itemHeight}px`,
    maxHeight: `${itemHeight}px`,
  };

  return (
    <div className='carousel-item' style={itemStyle} onClick={handleImageClick}>
      <div>
        <img className='carousel-item__img' src={itemImgPath} />
      </div>
      <p className='carousel-item__label'>{itemName}</p>
    </div>
  )
}

export default PlaygroundCard
