// MARK: Imports
import './PlaygroundCarousel.scss';
import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCategoryValue } from '../Playground/PlaygroundSlice';
import { getCssValue } from '../../helpers';
import axios from 'axios';
import PlaygroundCard from '../PlaygroundCard/PlaygroundCard';


// MARK: Component Function
function PlaygroundCarousel({ uiIndexOffset, defaultCardDimen, defaultItemWidth, categoryIndex }) {

    // MARK: Variables & Hooks
    const reduxCategories = useSelector((state) => state.playgroundData.categories);
    const reduxUserData = useSelector((state) => state.playgroundData.user_data);
    const dispatch = useDispatch();
    const [carouselEnabled, setCarouselEnabled] = useState(false);
    const [cardDimen, setCardDimen] = useState(defaultCardDimen);
    const [itemWidth, setItemWidth] = useState(defaultItemWidth);
    const [itemUiIndex, setItemUiIndex] = useState(0); // to convert from UI index to the corresponding array index subtract "uiIndexOffset"
    const [availableItems, setAvailableItems] = useState([]);
    const [currentColor, setCurrentColor] = useState('');
    const [availableColors, setAvailableColors] = useState([]);

    // MARK: Use Effect Hooks
    useEffect(() => {
        if (categoryIndex == 0) { // only enable first carousel interaction after a face image has been uploaded
            if (reduxUserData.hasOwnProperty('face_image') && reduxUserData['face_image'] != null) setCarouselEnabled(true);
        } else { // for every subsequent carousel enable interaction after the previous carousel has had its clothing item and color selected
            if (reduxCategories[categoryIndex - 1]['selected_color'] && reduxCategories[categoryIndex - 1]['selected_color'].length > 0) setCarouselEnabled(true);
        }
    }, [reduxUserData, reduxCategories]);

    useEffect(() => {
        async function fetchData() { // fetch all clothing items for this carousel's assigned clothing category
            try {
                const itemsResponse = await axios.get(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/category`, { params: { categoryId: reduxCategories[categoryIndex]['category_id'] } });
                setAvailableItems(itemsResponse.data);
                setAvailableColors(itemsResponse.data[uiIndexOffset].colors);
                dispatch(updateCategoryValue({ index: categoryIndex, key: 'selected_clothing_id', value: itemsResponse.data[uiIndexOffset]['_id'] }));
            } catch (error) {
                console.log(error);
            }
        }
        setCardDimen(getCssValue('--playground-card-dimen')); // dynamically update CSS values for carousel card dimensions
        setItemWidth(parseFloat(2 * getCssValue('--base-padding') + getCssValue('--playground-card-dimen')));
        fetchData();
    }, []);

    // MARK: Click Handlers
    const clothingItemClicked = (newIndex) => { // carousel's 0th position is always = -offset
        if (newIndex < -uiIndexOffset) newIndex = -uiIndexOffset; // if new index out of bounds
        else if (newIndex >= availableItems.length - uiIndexOffset - 1) newIndex = availableItems.length - uiIndexOffset - 1;
        setItemUiIndex(newIndex);
        dispatch(updateCategoryValue({ index: categoryIndex, key: 'selected_clothing_id', value: availableItems[newIndex + uiIndexOffset]['_id'] }));
    };

    const colorClicked = (clickedIndex) => {
        setCurrentColor(availableColors[clickedIndex]);
        dispatch(updateCategoryValue({ index: categoryIndex, key: 'selected_color', value: availableColors[clickedIndex] }));
    }


    // MARK: Return Statement
    return (
        <div className='carousel-container'>
            <div className='carousel'>
                <div className='carousel__section'>
                    <button className='carousel__arrow carousel__left-arrow' onClick={() => clothingItemClicked(itemUiIndex - 1)} style={itemUiIndex <= -uiIndexOffset ? { visibility: 'hidden' } : { visibility: 'visible' }} />
                    <div className='carousel__outer'>

                        {/* // MARK: Carousel Scrolling & Clothing Items */}
                        <div className='carousel__inner' style={
                            itemUiIndex <= availableItems.length - (2 * uiIndexOffset + 1) ? { // length - how many visible at one time (2*offset + middle item)
                                transform: `translate(-${itemUiIndex * itemWidth}px)` // current item capable of being in the middle
                            } : {
                                transform: `translate(-${(availableItems.length - (2 * uiIndexOffset + 1)) * itemWidth}px)`
                            }}>

                            {availableItems?.map((item, index) => {
                                let dimen = cardDimen;
                                if (index == itemUiIndex + uiIndexOffset) dimen = cardDimen * 1.5;
                                return <PlaygroundCard key={index} itemWidth={dimen} itemHeight={dimen}
                                    itemClick={() => clothingItemClicked(index - uiIndexOffset)} itemImgPath={item.image} itemName={item.name} />
                            })}
                        </div>

                    </div>
                    <button className='carousel__arrow carousel__right-arrow' onClick={() => clothingItemClicked(itemUiIndex + 1)} style={itemUiIndex >= availableItems.length - uiIndexOffset - 1 ? { visibility: 'hidden' } : { visibility: 'visible' }}/>
                </div>

                {/* // MARK: Color List */}
                <div className='carousel__color-container'>
                    {availableColors?.map((color, index) => {
                        return <div key={index} className={color == currentColor ? 'carousel__color-item--selected' : 'carousel__color-item'} style={{ backgroundColor: `${color[1]}` }}
                            onClick={() => colorClicked(index)}></div>
                    })}
                </div>
            </div>

            {!carouselEnabled && <div className='carousel-container__overlay'></div>}
        </div>

    )
}

export default PlaygroundCarousel
