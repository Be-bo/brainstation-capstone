import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { getCssValue, convertCategoryToArray, colorHexList } from '../../helpers';
import './PlaygroundCarousel.scss';
import PlaygroundCard from '../PlaygroundCard/PlaygroundCard'
import GeneratedItem from '../GeneratedItem/GeneratedItem';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';



// MARK: Return Function
function PlaygroundCarousel({defaultIndexOffset, defaultCardDimen, defaultItemWidth, pullUrl, updateCarouselValue}) {
    const cardIndexOffset = defaultIndexOffset;
    const [cardDimen, setCardDimen] = useState(defaultCardDimen);
    const [itemWidth, setItemWidth] = useState(defaultItemWidth);

    const [itemIndex, setItemIndex] = useState(0);
    const [items, setItems] = useState([]);

    const [currentColor, setCurrentColor] = useState('Blue');
    const [availableColors, setAvailableColors] = useState([]);


    // MARK: Use Effect
    useEffect(() => {
        async function fetchData() {
            try {
                const itemsResponse = await axios.get(pullUrl);
                setItems(convertCategoryToArray(itemsResponse.data));
                setAvailableColors(itemsResponse.data.colors);
            } catch (error) {
                console.log(error);
            }
        }

        setCardDimen(getCssValue('--playground-card-dimen'));
        const newItemWidth = parseFloat(2 * getCssValue('--base-padding') + getCssValue('--playground-card-dimen'));
        setItemWidth(newItemWidth);
        fetchData();
    }, []);


    // MARK: Carousel Index Update Functions
    const updateItemIndex = (newIndex) => {
        if (newIndex < -cardIndexOffset) {
            newIndex = -cardIndexOffset;
        } else if (newIndex >= items.length - cardIndexOffset - 1) {
            newIndex = items.length - cardIndexOffset - 1;
        }
        setItemIndex(newIndex);

        updateCarouselValue() // TODO: left off realizing I need a better system
    };


    // MARK: Click Handlers
    const colorClicked = (clickedIndex) => { 
        setCurrentColor(availableColors[clickedIndex]);
    }



    // MARK: Return Statement
    return (
        <div>
            <div className='carousel'>

                {/* MARK: Top Layer */}
                {/* <h2>Top</h2> */}

                <div className='carousel__section'>
                    <button className='carousel__arrow carousel__left-arrow' onClick={() => updateItemIndex(itemIndex - 1)}
                        style={itemIndex <= -cardIndexOffset ? { visibility: 'hidden' } : { visibility: 'visible' }}
                    />
                    <div className='carousel__outer'>
                        <div className='carousel__inner'
                            style={itemIndex <= items.length - 1 - 2 * cardIndexOffset ? { transform: `translate(-${itemIndex * itemWidth}px)` } :
                                { transform: `translate(-${(items.length - 1 - 2 * cardIndexOffset) * itemWidth}px)` }}>
                            {items?.map((item, index) => {
                                let dimen = cardDimen;
                                if (index == itemIndex + cardIndexOffset) dimen = cardDimen * 1.5;
                                return <PlaygroundCard key={index} itemWidth={dimen} itemHeight={dimen}
                                    itemClick={() => updateItemIndex(index - cardIndexOffset)} itemImgPath={item.image} itemName={item.name} />
                            })}
                        </div>
                    </div>
                    <button className='carousel__arrow carousel__right-arrow' onClick={() => updateItemIndex(itemIndex + 1)}
                        style={itemIndex >= items.length - cardIndexOffset - 1 ? { visibility: 'hidden' } : { visibility: 'visible' }}
                    />
                </div>

                <div className='carousel__color-container'>
                    {
                        availableColors?.map((color, index) => {
                            return <div key={index} className={color == currentColor ? 'carousel__color-item--selected' : 'carousel__color-item'} style={{ backgroundColor: `${colorHexList[color].hex}` }}
                                onClick={() => colorClicked(index)}></div>
                        })
                    }
                </div>

            </div>
        </div>

    )
}

export default PlaygroundCarousel
