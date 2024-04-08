// MARK: Imports
import './PlaygroundCarousel.scss';
import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCategoryValue } from '../Playground/PlaygroundSlice';
import { getCssValue, serverIP } from '../../helpers';
import axios from 'axios';
import PlaygroundCard from '../PlaygroundCard/PlaygroundCard';


/**
 * PlaygroundCarousel contains a single moveable carousel with a list of clothing items for the specified clothing category.
 * @param {number} defaultUiIndexOffset - The default difference between the card UI index and what index that card corresponds to within the source data.
 * @param {number} defaultCardDimen - Default CSS size of a Playground clothing item card in pixels.
 * @param {number} defaultItemWidth - The initial value for the --playground-card-dimen CSS root variable.
 * @param {number} categoryIndex - Integer representing which spot this carousel is supposed to occupy (in Playground) and also the index of the clothing category it corresponds to.
 * @returns {JSX.Element} React element representing a single clothing category Playground carousel component with a list of clothing items for that category.
 */
function PlaygroundCarousel({ defaultUiIndexOffset, defaultCardDimen, defaultItemWidth, categoryIndex }) {

    // MARK: Variables & Hooks
    const reduxCategories = useSelector((state) => state.playgroundData.categories);
    const reduxUserData = useSelector((state) => state.playgroundData.user_data);
    const dispatch = useDispatch();
    const [carouselEnabled, setCarouselEnabled] = useState(false);
    const [cardDimen, setCardDimen] = useState(defaultCardDimen);
    const [itemWidth, setItemWidth] = useState(defaultItemWidth);
    const [uiIndexOffset, setUiIndexOffset] = useState(defaultUiIndexOffset);
    // to convert from UI index to the corresponding array index subtract "uiIndexOffset", starting at 0 == starting in the middle so for 5 items 0 in UI corresponds to -2:
    const [itemUiIndex, setItemUiIndex] = useState(0); 
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
                const itemsResponse = await axios.get(`http://${serverIP}/playground/category`, { params: { categoryId: reduxCategories[categoryIndex]['category_id'] } });
                setAvailableItems(itemsResponse.data);
                setAvailableColors(itemsResponse.data[uiIndexOffset].colors);
                dispatch(updateCategoryValue({ index: categoryIndex, key: 'selected_clothing_id', value: itemsResponse.data[uiIndexOffset]['_id'] }));
            } catch (error) {
                console.log(error);
            }
        }
        setCardDimen(getCssValue('--playground-card-dimen')); // dynamically update CSS values for carousel card dimensions
        setItemWidth(parseFloat(2 * getCssValue('--base-padding') + getCssValue('--playground-card-dimen')));
        setUiIndexOffset(getCssValue('--carousel-index-offset'));
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
                            itemUiIndex <= availableItems.length - (2 * uiIndexOffset + 1) ? { // length - how many carousel capable displaying at one time (2 * offset + middle item)
                                transform: `translate(-${itemUiIndex * itemWidth}px)` // currently selected item is capable of being in the middle (meaning there's enough offset to fill all visible carousel spots)
                            } : {
                                transform: `translate(-${(availableItems.length - (2 * uiIndexOffset + 1)) * itemWidth}px)` // currently selected item cannot be in the middle - don't scroll further
                            }}>

                            {availableItems?.map((item, index) => {
                                let dimen = cardDimen;
                                if (index == itemUiIndex + uiIndexOffset) dimen = cardDimen * 1.5; // currently selected item is 1.5x bigger than standard item
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
