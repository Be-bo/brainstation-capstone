import React, { useState, useRef, useEffect } from 'react'
import { getCssValue, convertCategoryToArray } from '../../helpers';
import axios from 'axios';
import PlaygroundCard from '../PlaygroundCard/PlaygroundCard'
import GeneratedItem from '../GeneratedItem/GeneratedItem';
import './PlaygroundCarousel.scss';




// MARK: Return Function
function PlaygroundCarousel() {
    const [cardDimen, setCardDimen] = useState(200);
    const [itemWidth, setItemWidth] = useState(232);
    const [generatedItem, setGeneratedItem] = useState();
    const [isGenerating, setIsGenerating] = useState(false);

    const [shirtIndex, setShirtIndex] = useState(1);
    const [topIndex, setTopIndex] = useState(1);
    const [bottomIndex, setBottomIndex] = useState(1);
    const [shirtColor, setShirtColor] = useState('Black');
    const [topColor, setTopColor] = useState('Black');
    const [bottomColor, setBottomColor] = useState('Black');

    const [shirtItems, setShirtItems] = useState([]);
    const [topItems, setTopItems] = useState([]);
    const [bottomItems, setBottomItems] = useState([]);
    const [shirtColors, setShirtColors] = useState([]);
    const [topColors, setTopColors] = useState([]);
    const [bottomColors, setBottomColors] = useState([]);
    
    const colorHexList = {
    "Black": {hex: "#000000"},
    "White": {hex: "#111111"},
    "Grey": {hex: "#808080"},
    "Brown": {hex: "#A52A2A"},
    "Beige": {hex: "#F5F5DC"},
    "Navy": {hex: "#000080"},
    "Olive": {hex: "#808000"},
    "Burgundy": {hex: "#800020"},
    "Red": {hex: "#B22222"},
    "Blue": {hex: "#4169E1"},
    "Green": {hex: "#228B22"},
    "Yellow": {hex: "#FFD700"},
    "Purple": {hex: "#6A0DAD"},
    "Teal": {hex: "#008B8B"},
    "Cream": {hex: "#FFEFD5"},
    "Charcoal": {hex: "#464646"},
    "Tan": {hex: "#F0E68C"},
    "Maroon": {hex: "#B03060"},
    "Pink": {hex: "#FFB6C1"}};



    // MARK: Use Effect
    useEffect(() => {
        async function fetchData() {
            try {
                const shirtResponse = await axios.get('http://3.145.198.110:80/playground/shirt-layer');
                setShirtItems(convertCategoryToArray(shirtResponse.data));
                setShirtColors(shirtResponse.data.colors);
                const topResponse = await axios.get('http://3.145.198.110:80/playground/top-layer');
                setTopItems(convertCategoryToArray(topResponse.data));
                setTopColors(topResponse.data.colors);
                const bottomResponse = await axios.get('http://3.145.198.110:80/playground/bottom-layer');
                setBottomItems(convertCategoryToArray(bottomResponse.data));
                setBottomColors(bottomResponse.data.colors);
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
    const updateShirtIndex = (newIndex) => {
        if (newIndex < -1) {
            newIndex = -1;
        } else if (newIndex >= shirtItems.length - 2) {
            newIndex = shirtItems.length - 2;
        }
        setShirtIndex(newIndex);
    };

    const updateTopIndex = (newIndex) => {
        if (newIndex < -1) {
            newIndex = -1;
        } else if (newIndex >= topItems.length - 2) {
            newIndex = topItems.length - 2;
        }
        setTopIndex(newIndex);
    };

    const updateBottomIndex = (newIndex) => {
        if (newIndex < -1) {
            newIndex = -1;
        } else if (newIndex >= bottomItems.length - 2) {
            newIndex = bottomItems.length - 2;
        }
        setBottomIndex(newIndex);
    };


    // MARK: Handle Image Generation
    const handleGenerate = async () => {
        setIsGenerating(true);
        const generationRequest = {
            "user-id": "test-user",
            "shirt": {
                "name": shirtItems[shirtIndex + 1].name,
                "color": shirtColor
            },
            "top": {
                "name": topItems[topIndex + 1].name,
                "color": topColor
            },
            "bottom": {
                "name": bottomItems[bottomIndex + 1].name,
                "color": bottomColor
            },
        }

        const generationResponse = await axios.post('http://3.145.198.110:80/playground/generate', generationRequest);
        console.log(generationResponse);
        setGeneratedItem(generationResponse.data);
        setIsGenerating(false);
    }


    // MARK: Click Handlers
    const shirtColorClicked = (clickedIndex) => { setShirtColor(shirtColors[clickedIndex]); }
    const topColorClicked = (clickedIndex) => { setTopColor(topColors[clickedIndex]); }
    const bottomColorClicked = (clickedIndex) => { setBottomColor(bottomColors[clickedIndex]); }


    // MARK: Return Statement
    return (
        <div className='carousel'>

            <h1 style={{ alignSelf: 'center' }}>TOGA</h1>

            {/* MARK: Shirt Section */}
            <h2>Shirt Layer:</h2>
            <div className='carousel__section'>
                {/* <button className='carousel__arrow carousel__left-arrow' onClick={() => updateIndex(leftmostIndex - 1)} /> */}
                <div className='carousel__outer'>
                    <div className='carousel__inner'
                        style={{ transform: `translate(-${shirtIndex * itemWidth}px)` }}>
                        {shirtItems?.map((item, index) => {
                            let dimen = cardDimen;
                            if (index == shirtIndex + 1) dimen = cardDimen * 1.5;
                            return <PlaygroundCard key={index} itemWidth={dimen} itemHeight={dimen}
                                itemClick={() => updateShirtIndex(index - 1)} itemImgPath={item.image} itemName={item.name} />
                        })}
                    </div>
                </div>
                {/* <button className='carousel__arrow carousel__right-arrow' onClick={() => updateIndex(leftmostIndex + 1)} /> */}
            </div>

            <div className='carousel__color-container'>
                {
                    shirtColors?.map((color, index) => {
                        return <div key={index} className={color == shirtColor ? 'carousel__color-item--selected' : 'carousel__color-item'} style={{ backgroundColor: `${colorHexList[color].hex}` }}
                            onClick={() => shirtColorClicked(index)}></div>
                    })
                }
            </div>


            {/* MARK: Top Layer */}
            <h2>Top Layer:</h2>
            <div className='carousel__section'>
                {/* <button className='carousel__arrow carousel__left-arrow' onClick={() => updateIndex(leftmostIndex - 1)} /> */}
                <div className='carousel__outer'>
                    <div className='carousel__inner'
                        style={{ transform: `translate(-${topIndex * itemWidth}px)` }}>
                        {topItems?.map((item, index) => {
                            let dimen = cardDimen;
                            if (index == topIndex + 1) dimen = cardDimen * 1.5;
                            return <PlaygroundCard key={index} itemWidth={dimen} itemHeight={dimen}
                                itemClick={() => updateTopIndex(index - 1)} itemImgPath={item.image} itemName={item.name} />
                        })}
                    </div>
                </div>
                {/* <button className='carousel__arrow carousel__right-arrow' onClick={() => updateIndex(leftmostIndex + 1)} /> */}
            </div>

            <div className='carousel__color-container'>
                {
                    topColors?.map((color, index) => {
                        return <div key={index} className={color == topColor ? 'carousel__color-item--selected' : 'carousel__color-item'} style={{ backgroundColor: `${colorHexList[color].hex}` }}
                            onClick={() => topColorClicked(index)}></div>
                    })
                }
            </div>




            {/* MARK: Bottom Layer */}
            <h2>Bottom Layer:</h2>
            <div className='carousel__section'>
                {/* <button className='carousel__arrow carousel__left-arrow' onClick={() => updateIndex(leftmostIndex - 1)} /> */}
                <div className='carousel__outer'>
                    <div className='carousel__inner'
                        style={{ transform: `translate(-${bottomIndex * itemWidth}px)` }}>
                        {bottomItems?.map((item, index) => {
                            let dimen = cardDimen;
                            if (index == bottomIndex + 1) dimen = cardDimen * 1.5;
                            return <PlaygroundCard key={index} itemWidth={dimen} itemHeight={dimen}
                                itemClick={() => updateBottomIndex(index - 1)} itemImgPath={item.image} itemName={item.name} />
                        })}
                    </div>
                </div>
                {/* <button className='carousel__arrow carousel__right-arrow' onClick={() => updateIndex(leftmostIndex + 1)} /> */}
            </div>

            <div className='carousel__color-container'>
                {
                    bottomColors?.map((color, index) => {
                        return <div key={index} className={color == bottomColor ? 'carousel__color-item--selected' : 'carousel__color-item'} style={{ backgroundColor: `${colorHexList[color].hex}` }}
                            onClick={() => bottomColorClicked(index)}></div>
                    })
                }
            </div>


            {/* // MARK: Generate Button & Loading Wheel */}
            <button className='carousel__generate-btn' onClick={handleGenerate}>Generate</button>
            <div>
                {isGenerating && (
                    <div className="loader">
                        <div className="spinner"></div>
                    </div>
                )}
            </div>


            {/* // MARK: Generated Item Result */}
            {generatedItem ? <GeneratedItem itemData={generatedItem} /> : <p style={{ alignSelf: 'center' }}>This is where your generated image will display.</p>}

        </div>
    )
}

export default PlaygroundCarousel
