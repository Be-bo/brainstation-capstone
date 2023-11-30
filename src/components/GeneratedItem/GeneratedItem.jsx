import { useState, useEffect } from 'react'
import './GeneratedItem.scss';
import QRCode from 'qrcode.react';
import bomber from '../../assets/clothing/bomber.png';
import { colorHexList, topUrlList, shirtUrlList, bottomUrlList } from '../../helpers';

function GeneratedItem({ itemData}) {
  const [qrCodeValue, setQRCodeValue] = useState('');

  useEffect(() => {
    if (itemData?.images[0]) generateQRCode(itemData?.images[0]);
  }, []);

  const generateQRCode = (url) => {
    setQRCodeValue(url);
  };

  return (
    <div className='item'>
      <h3 className='item__heading'>{itemData?.name}</h3>
      <img className='item__generated-image' src={itemData?.images[0]} />

      <div className='item__details-container'>
        <div className='item__details-wrapper'>
          <img className='item__details-item' src={topUrlList[itemData?.top.name]}/>
          <div className='item__color-ribbon' style={{ backgroundColor: `${colorHexList[itemData?.top.color].hex}` }}></div>
        </div>
        <div className='item__details-wrapper'>
          <img className='item__details-item' src={shirtUrlList[itemData?.shirt.name]} />
          <div className='item__color-ribbon' style={{ backgroundColor: `${colorHexList[itemData?.shirt.color].hex}` }}></div>
        </div>
        <div className='item__details-wrapper'>
          <img className='item__details-item' src={bottomUrlList[itemData?.bottom.name]} />
          <div className='item__color-ribbon' style={{ backgroundColor: `${colorHexList[itemData?.bottom.color].hex}` }}></div>
        </div>
        <div className='item__details-wrapper'>
          <QRCode className='item__qr' value={qrCodeValue} size={192} />
        </div>
      </div>
    </div>
  )
}

export default GeneratedItem
