import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { getCssValue, convertCategoryToArray, colorHexList } from '../../helpers';
import './PlaygroundCarousel.scss';
import PlaygroundCard from '../PlaygroundCard/PlaygroundCard';
import {updateProperty} from '../Playground/PlaygroundSlice';
import {useSelector, useDispatch} from 'react-redux';



// MARK: Return Function
function PlaygroundCarousel({defaultIndexOffset, defaultCardDimen, defaultItemWidth, pullUrl, carouselCategoryId }) {
    const playgroundData = useSelector((state) => state.playgroundSelection.data);
    const dispatch = useDispatch();

    const cardIndexOffset = defaultIndexOffset;

    const [cardDimen, setCardDimen] = useState(defaultCardDimen);
    const [itemWidth, setItemWidth] = useState(defaultItemWidth);

    const [itemIndex, setItemIndex] = useState(0);
    const [availableItems, setAvailableItems] = useState([]);

    const [currentColor, setCurrentColor] = useState('Blue');
    const [availableColors, setAvailableColors] = useState([]);

    useEffect(() => {
        // console.log(playgroundData); // Log the latest playgroundData when it changes
    }, [playgroundData]);


    // MARK: Use Effect
    useEffect(() => {
        async function fetchData() {
            try {
                const itemsResponse = await axios.get(pullUrl);
                const itemsArray = convertCategoryToArray(itemsResponse.data);
                setAvailableItems(itemsArray);
                setAvailableColors(itemsResponse.data.colors);

                dispatch(updateProperty({category: carouselCategoryId, property: 'name', value: itemsArray[cardIndexOffset].name}));
                dispatch(updateProperty({category: carouselCategoryId, property: 'color', value: 'Blue'}));   
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
    const clothingItemClicked = (newIndex) => {
        if (newIndex < -cardIndexOffset) {
            newIndex = -cardIndexOffset;
        } else if (newIndex >= availableItems.length - cardIndexOffset - 1) {
            newIndex = availableItems.length - cardIndexOffset - 1;
        }
        setItemIndex(newIndex);

        dispatch(updateProperty({ category: carouselCategoryId, property: 'name', value: availableItems[newIndex + cardIndexOffset].name}));
    };


    // MARK: Click Handlers
    const colorClicked = (clickedIndex) => { 
        setCurrentColor(availableColors[clickedIndex]);

        dispatch(updateProperty({ category: carouselCategoryId, property: 'color', value: availableColors[clickedIndex]}));
    }



    // MARK: Return Statement
    return (
        <div>
            <div className='carousel'>

                {/* MARK: Top Layer */}
                {/* <h2>Top</h2> */}

                <div className='carousel__section'>
                    <button className='carousel__arrow carousel__left-arrow' onClick={() => clothingItemClicked(itemIndex - 1)}
                        style={itemIndex <= -cardIndexOffset ? { visibility: 'hidden' } : { visibility: 'visible' }}
                    />
                    <div className='carousel__outer'>
                        <div className='carousel__inner'
                            style={itemIndex <= availableItems.length - 1 - 2 * cardIndexOffset ? { transform: `translate(-${itemIndex * itemWidth}px)` } :
                                { transform: `translate(-${(availableItems.length - 1 - 2 * cardIndexOffset) * itemWidth}px)` }}>
                            {availableItems?.map((item, index) => {
                                let dimen = cardDimen;
                                if (index == itemIndex + cardIndexOffset) dimen = cardDimen * 1.5;
                                return <PlaygroundCard key={index} itemWidth={dimen} itemHeight={dimen}
                                    itemClick={() => clothingItemClicked(index - cardIndexOffset)} itemImgPath={item.image} itemName={item.name} />
                            })}
                        </div>
                    </div>
                    <button className='carousel__arrow carousel__right-arrow' onClick={() => clothingItemClicked(itemIndex + 1)}
                        style={itemIndex >= availableItems.length - cardIndexOffset - 1 ? { visibility: 'hidden' } : { visibility: 'visible' }}
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
