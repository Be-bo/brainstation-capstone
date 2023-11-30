import { useState, useRef } from 'react'
import './PlaygroundCard.scss';

function PlaygroundCard({ itemWidth, itemHeight, itemClick, itemImgPath, itemName }) {
  const radioRef = useRef(null);
  const [radioChecked, setRadioChecked] = useState(false);

  const itemStyle = {
    minWidth: `${itemWidth}px`,
    maxWidth: `${itemWidth}px`,
    minHeight: `${itemHeight}px`,
    maxHeight: `${itemHeight}px`,
  };

  const handleImageClick = () => {
    // radioRef.current.click();
    itemClick();
  }

  return (
    <div className='carousel-item' style={itemStyle} onClick={handleImageClick}>
      <div>
        {/* <input ref={radioRef} type='radio' name='options' className='carousel-item__radio' /> */}
        <img className='carousel-item__img' src={itemImgPath} />
      </div>
      <p className='carousel-item__label'>{itemName}</p>
    </div>
  )
}

export default PlaygroundCard
