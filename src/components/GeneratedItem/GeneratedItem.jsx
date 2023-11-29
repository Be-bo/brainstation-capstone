import React from 'react'
import './GeneratedItem.scss';

function GeneratedItem({itemData}) {
  return (
    <div className='item'>

        <h3 className='item__heading'>{itemData?.name}</h3>
        <img className='item__generated-image' src={itemData?.images[0]}/>
      
    </div>
  )
}

export default GeneratedItem
