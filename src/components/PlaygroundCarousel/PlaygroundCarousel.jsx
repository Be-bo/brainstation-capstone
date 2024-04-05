import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getCssValue, convertCategoryToArray, colorHexList } from '../../helpers';
import './PlaygroundCarousel.scss';
import PlaygroundCard from '../PlaygroundCard/PlaygroundCard';
import {updateCategoryValue, updateProperty} from '../Playground/PlaygroundSlice';
import {useSelector, useDispatch} from 'react-redux';



// MARK: Return Function
function PlaygroundCarousel({defaultIndexOffset, defaultCardDimen, defaultItemWidth, categoryIndex}) {
    const reduxCategories = useSelector((state) => state.playgroundData.categories);
    const dispatch = useDispatch();

    const cardIndexOffset = defaultIndexOffset;

    const [cardDimen, setCardDimen] = useState(defaultCardDimen);
    const [itemWidth, setItemWidth] = useState(defaultItemWidth);

    const [itemIndex, setItemIndex] = useState(0);
    const [availableItems, setAvailableItems] = useState([]);

    const [currentColor, setCurrentColor] = useState('Blue');
    const [availableColors, setAvailableColors] = useState([]);

    useEffect(() => {
        // console.log(reduxCategories); // Log the latest update
        if(categoryIndex == 0){ // first exception

        }else if (categoryIndex >= reduxCategories.length-1){ // last exception
            
        }else{ // standard case
            if(reduxCategories[categoryIndex].color && reduxCategories[categoryIndex].color.length > 0){
                // TODO: allow next
            }
        }
    }, [reduxCategories]);


    // MARK: Use Effect
    useEffect(() => {
        async function fetchData() {
            try {
                const itemsResponse = await axios.get(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/category`, {params: {categoryId: reduxCategories[categoryIndex]['category_id']}});
                setAvailableItems(itemsResponse.data);
                setAvailableColors(itemsResponse.data[defaultIndexOffset].colors);
                dispatch(updateCategoryValue({index: categoryIndex, key: 'selected_clothing_id', value: itemsResponse.data[defaultIndexOffset].name}));
            } catch (error) {
                console.log(error);
            }
        }

        setCardDimen(getCssValue('--playground-card-dimen'));
        const newItemWidth = parseFloat(2 * getCssValue('--base-padding') + getCssValue('--playground-card-dimen'));
        setItemWidth(newItemWidth);
        fetchData();
    }, []);


    // MARK: Click Handlers
    const clothingItemClicked = (newIndex) => {
        if (newIndex < -cardIndexOffset) {
            newIndex = -cardIndexOffset;
        } else if (newIndex >= availableItems.length - cardIndexOffset - 1) {
            newIndex = availableItems.length - cardIndexOffset - 1;
        }
        setItemIndex(newIndex);
        // setAvailableColors(availableItems[newIndex+defaultIndexOffset].colors); // TODO: down the line different colors sets for different clothing items will be available, fake it for now
        dispatch(updateCategoryValue({index: categoryIndex, key: 'selected_clothing_id', value: availableItems[newIndex+defaultIndexOffset].name}));
    };

    const colorClicked = (clickedIndex) => { 
        setCurrentColor(availableColors[clickedIndex]);
        dispatch(updateCategoryValue({index: categoryIndex, key: 'selected_color', value: availableItems[itemIndex+defaultIndexOffset].colors[clickedIndex]}));
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
                            return <div key={index} className={color == currentColor ? 'carousel__color-item--selected' : 'carousel__color-item'} style={{ backgroundColor: `${color[1]}` }}
                                onClick={() => colorClicked(index)}></div>
                        })
                    }
                </div>

            </div>
        </div>

    )
}

export default PlaygroundCarousel
