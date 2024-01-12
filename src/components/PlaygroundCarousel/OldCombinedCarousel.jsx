import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { getCssValue, convertCategoryToArray, colorHexList } from '../../helpers';
import './PlaygroundCarousel.scss';
import PlaygroundCard from '../PlaygroundCard/PlaygroundCard'
import GeneratedItem from '../GeneratedItem/GeneratedItem';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';



// MARK: Return Function
function OldCombinedCarousel() {
    const cardIndexOffset = 2;

    const [cardDimen, setCardDimen] = useState(200);
    const [itemWidth, setItemWidth] = useState(232);
    const [generatedItem, setGeneratedItem] = useState();
    const [isGenerating, setIsGenerating] = useState(false);

    const [shirtIndex, setShirtIndex] = useState(0);
    const [topIndex, setTopIndex] = useState(0);
    const [bottomIndex, setBottomIndex] = useState(0);
    const [shirtItems, setShirtItems] = useState([]);
    const [topItems, setTopItems] = useState([]);
    const [bottomItems, setBottomItems] = useState([]);

    const [shirtColor, setShirtColor] = useState('Blue');
    const [topColor, setTopColor] = useState('Blue');
    const [bottomColor, setBottomColor] = useState('Blue');
    const [shirtColors, setShirtColors] = useState([]);
    const [topColors, setTopColors] = useState([]);
    const [bottomColors, setBottomColors] = useState([]);


    // MARK: Use Effect
    useEffect(() => {
        async function fetchData() {
            try {
                const shirtResponse = await axios.get(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/shirt-layer`);
                setShirtItems(convertCategoryToArray(shirtResponse.data));
                setShirtColors(shirtResponse.data.colors);
                const topResponse = await axios.get(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/top-layer`);
                setTopItems(convertCategoryToArray(topResponse.data));
                setTopColors(topResponse.data.colors);
                const bottomResponse = await axios.get(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/bottom-layer`);
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
        if (newIndex < -cardIndexOffset) {
            newIndex = -cardIndexOffset;
        } else if (newIndex >= shirtItems.length - cardIndexOffset - 1) {
            newIndex = shirtItems.length - cardIndexOffset - 1;
        }
        setShirtIndex(newIndex);
    };

    const updateTopIndex = (newIndex) => {
        if (newIndex < -cardIndexOffset) {
            newIndex = -cardIndexOffset;
        } else if (newIndex >= topItems.length - cardIndexOffset - 1) {
            newIndex = topItems.length - cardIndexOffset - 1;
        }
        setTopIndex(newIndex);
    };

    const updateBottomIndex = (newIndex) => {
        if (newIndex < -cardIndexOffset) {
            newIndex = -cardIndexOffset;
        } else if (newIndex >= bottomItems.length - cardIndexOffset - 1) {
            newIndex = bottomItems.length - cardIndexOffset - 1;
        }
        setBottomIndex(newIndex);
    };


    // MARK: Click Handlers
    const shirtColorClicked = (clickedIndex) => { setShirtColor(shirtColors[clickedIndex]); }
    const topColorClicked = (clickedIndex) => { setTopColor(topColors[clickedIndex]); }
    const bottomColorClicked = (clickedIndex) => { setBottomColor(bottomColors[clickedIndex]); }


    // MARK: Handle Image Generation
    const handleGenerate = async () => {
        setIsGenerating(true);
        const generationRequest = {
            "userId": "test-user",
            "shirt": {
                "name": shirtItems[shirtIndex + cardIndexOffset].name,
                "color": shirtColor
            },
            "top": {
                "name": topItems[topIndex + cardIndexOffset].name,
                "color": topColor
            },
            "bottom": {
                "name": bottomItems[bottomIndex + cardIndexOffset].name,
                "color": bottomColor
            },
        }

        const generationResponse = await axios.post(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/generate`, generationRequest);
        console.log(generationResponse);
        setGeneratedItem(generationResponse.data);
        setIsGenerating(false);
    }


    // MARK: Return Statement
    return (
        <div>
            <NavBar isPlayground={true} />

            <div className='carousel'>

                {/* MARK: Top Layer */}
                {/* <h2>Top</h2> */}

                <div className='carousel__section'>
                    <button className='carousel__arrow carousel__left-arrow' onClick={() => updateTopIndex(topIndex - 1)}
                        style={topIndex <= -cardIndexOffset ? { visibility: 'hidden' } : { visibility: 'visible' }}
                    />
                    <div className='carousel__outer'>
                        <div className='carousel__inner'
                            style={topIndex <= topItems.length - 1 - 2 * cardIndexOffset ? { transform: `translate(-${topIndex * itemWidth}px)` } :
                                { transform: `translate(-${(topItems.length - 1 - 2 * cardIndexOffset) * itemWidth}px)` }}>
                            {topItems?.map((item, index) => {
                                let dimen = cardDimen;
                                if (index == topIndex + cardIndexOffset) dimen = cardDimen * 1.5;
                                return <PlaygroundCard key={index} itemWidth={dimen} itemHeight={dimen}
                                    itemClick={() => updateTopIndex(index - cardIndexOffset)} itemImgPath={item.image} itemName={item.name} />
                            })}
                        </div>
                    </div>
                    <button className='carousel__arrow carousel__right-arrow' onClick={() => updateTopIndex(topIndex + 1)}
                        style={topIndex >= topItems.length - cardIndexOffset - 1 ? { visibility: 'hidden' } : { visibility: 'visible' }}
                    />
                </div>

                <div className='carousel__color-container'>
                    {
                        topColors?.map((color, index) => {
                            return <div key={index} className={color == topColor ? 'carousel__color-item--selected' : 'carousel__color-item'} style={{ backgroundColor: `${colorHexList[color].hex}` }}
                                onClick={() => topColorClicked(index)}></div>
                        })
                    }
                </div>


                {/* MARK: Shirt Section */}
                {/* <h2>Shirt</h2> */}

                <div className='carousel__section'>
                    <button className='carousel__arrow carousel__left-arrow' onClick={() => updateShirtIndex(shirtIndex - 1)}
                        style={shirtIndex <= -cardIndexOffset ? { visibility: 'hidden' } : { visibility: 'visible' }}
                    />
                    <div className='carousel__outer'>
                        <div className='carousel__inner'
                            style={shirtIndex <= shirtItems.length - 1 - 2 * cardIndexOffset ? { transform: `translate(-${shirtIndex * itemWidth}px)` } : {}}>
                            {shirtItems?.map((item, index) => {
                                let dimen = cardDimen;
                                if (index == shirtIndex + cardIndexOffset) dimen = cardDimen * 1.5;
                                return <PlaygroundCard key={index} itemWidth={dimen} itemHeight={dimen}
                                    itemClick={() => updateShirtIndex(index - cardIndexOffset)} itemImgPath={item.image} itemName={item.name} />
                            })}
                        </div>
                    </div>
                    <button className='carousel__arrow carousel__right-arrow' onClick={() => updateShirtIndex(shirtIndex + 1)}
                        style={shirtIndex >= shirtItems.length - cardIndexOffset - 1 ? { visibility: 'hidden' } : { visibility: 'visible' }}
                    />
                </div>

                <div className='carousel__color-container'>
                    {
                        shirtColors?.map((color, index) => {
                            return <div key={index} className={color == shirtColor ? 'carousel__color-item--selected' : 'carousel__color-item'} style={{ backgroundColor: `${colorHexList[color].hex}` }}
                                onClick={() => shirtColorClicked(index)}></div>
                        })
                    }
                </div>


                {/* MARK: Bottom Layer */}
                {/* <h2>Bottom</h2> */}

                <div className='carousel__section'>
                    <button className='carousel__arrow carousel__left-arrow' onClick={() => updateBottomIndex(bottomIndex - 1)}
                        style={bottomIndex <= -cardIndexOffset ? { visibility: 'hidden' } : { visibility: 'visible' }}
                    />
                    <div className='carousel__outer'>
                        <div className='carousel__inner'
                            style={bottomIndex <= bottomItems.length - 1 - 2 * cardIndexOffset ? { transform: `translate(-${bottomIndex * itemWidth}px)` } :
                                { transform: `translate(-${bottomItems.length - 1 - 2 * cardIndexOffset * itemWidth}px)` }}>
                            {bottomItems?.map((item, index) => {
                                let dimen = cardDimen;
                                if (index == bottomIndex + cardIndexOffset) dimen = cardDimen * 1.5;
                                return <PlaygroundCard key={index} itemWidth={dimen} itemHeight={dimen}
                                    itemClick={() => updateBottomIndex(index - cardIndexOffset)} itemImgPath={item.image} itemName={item.name} />
                            })}
                        </div>
                    </div>
                    <button className='carousel__arrow carousel__right-arrow' onClick={() => updateBottomIndex(bottomIndex + 1)}
                        style={bottomIndex >= bottomItems.length - cardIndexOffset - 1 ? { visibility: 'hidden' } : { visibility: 'visible' }}
                    />
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

            <Footer/>
        </div>

    )
}

export default OldCombinedCarousel
