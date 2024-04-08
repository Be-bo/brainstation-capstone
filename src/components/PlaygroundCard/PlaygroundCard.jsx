import './PlaygroundCard.scss';

/**
 * PlaygroundCard component represents a single item in the playground carousel that displays a clothing item and its label.
 * @param {Object} props - The props object containing component properties.
 * @param {number} props.itemWidth - The width of the card's CSS override in pixels.
 * @param {number} props.itemHeight - The height of the card's CSS override in pixels.
 * @param {function} props.itemClick - The function to call when the card is clicked.
 * @param {string} props.itemImgPath - The path to the image displayed on the card.
 * @param {string} props.itemName - The name or label of the item displayed on the card.
 * @returns {JSX.Element} React element representing the PlaygroundCard component.
 */
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
        <img className='carousel-item__img' src={itemImgPath} alt={itemName}/>
      </div>
      <p className='carousel-item__label'>{itemName}</p>
    </div>
  )
}

export default PlaygroundCard
