import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getCssValue, convertCategoryToArray, colorHexList } from '../../helpers';
import './PlaygroundCarousel.scss';
import PlaygroundCard from '../PlaygroundCard/PlaygroundCard';
import {updateCategoryValue, updateProperty} from '../Playground/PlaygroundSlice';
import {useSelector, useDispatch} from 'react-redux';



// MARK: Return Function
function PlaygroundCarousel({defaultIndexOffset, defaultCardDimen, defaultItemWidth, categoryIndex}) {
    const cardIndexOffset = defaultIndexOffset;
    const reduxCategories = useSelector((state) => state.playgroundData.categories);
    const reduxUserData = useSelector((state) => state.playgroundData.user_data);
    const dispatch = useDispatch();

    const [carouselEnabled, setCarouselEnabled] = useState(false);

    const [cardDimen, setCardDimen] = useState(defaultCardDimen);
    const [itemWidth, setItemWidth] = useState(defaultItemWidth);

    const [itemIndex, setItemIndex] = useState(0);
    const [availableItems, setAvailableItems] = useState([]);

    const [currentColor, setCurrentColor] = useState('Blue');
    const [availableColors, setAvailableColors] = useState([]);

    useEffect(() => {
        if(categoryIndex == 0){ // first exception
            if(reduxUserData.hasOwnProperty('face_image') && reduxUserData['face_image'] != null) setCarouselEnabled(true);
        }else{ // standard case
            if(reduxCategories[categoryIndex-1]['selected_color'] && reduxCategories[categoryIndex-1]['selected_color'].length > 0) setCarouselEnabled(true);
        }
    }, [reduxUserData, reduxCategories]);


    // MARK: Use Effect
    useEffect(() => {
        async function fetchData() {
            try {
                const itemsResponse = await axios.get(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/category`, {params: {categoryId: reduxCategories[categoryIndex]['category_id']}});
                setAvailableItems(itemsResponse.data);
                setAvailableColors(itemsResponse.data[defaultIndexOffset].colors);
                dispatch(updateCategoryValue({index: categoryIndex, key: 'selected_clothing_id', value: itemsResponse.data[defaultIndexOffset]['_id']}));
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
        dispatch(updateCategoryValue({index: categoryIndex, key: 'selected_clothing_id', value: availableItems[newIndex+defaultIndexOffset]['_id']}));
    };

    const colorClicked = (clickedIndex) => {
        setCurrentColor(availableColors[clickedIndex]);
        dispatch(updateCategoryValue({index: categoryIndex, key: 'selected_color', value: availableColors[clickedIndex]}));
    }



    // MARK: Return Statement
    return (
        <div className='carousel-container'>
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

            {!carouselEnabled && <div className='carousel-container__overlay'></div>}
        </div>

    )
}

export default PlaygroundCarousel
