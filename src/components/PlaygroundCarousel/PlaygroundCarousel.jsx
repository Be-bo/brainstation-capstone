import React, { useState, useRef, useEffect } from 'react'
import PlaygroundCard from '../PlaygroundCard/PlaygroundCard'
import dummies from '../../data/carousel-dummy.json';
import './PlaygroundCarousel.scss';
import {getCssValue} from '../../helpers';

function PlaygroundCarousel() {
    const [leftmostIndex, setLeftmostIndex] = useState(1);
    const [cardDimen, setCardDimen] = useState(200);
    const [itemWidth, setItemWidth] = useState(232);

    useEffect(()=>{
        setCardDimen(getCssValue('--playground-card-dimen'));
        const newItemWidth = parseFloat(2*getCssValue('--base-padding') + getCssValue('--playground-card-dimen'));
        setItemWidth(newItemWidth);

        console.log(newItemWidth);
    }, []);

    const updateIndex = (newIndex) =>{
        if(newIndex < -1){
            newIndex = -1;
        }else if (newIndex>=dummies.length-2){
            newIndex = dummies.length-2;
        }
        setLeftmostIndex(newIndex);
    };


    return (
        <div className='carousel-outer'>
            <div className='carousel-inner'
                style={{ transform: `translate(-${leftmostIndex * itemWidth}px)` }}>
                {dummies.map((item, index) => {
                    let dimen = cardDimen;
                    if(index == leftmostIndex+1) dimen = cardDimen*1.5;
                    return <PlaygroundCard key={index} textToDisplay={item.name} itemWidth={dimen} itemHeight={dimen}
                    itemClick={()=>updateIndex(index-1)} />
                })}
            </div>

            <div className='carousel-buttons'>
                <button onClick={()=>updateIndex(leftmostIndex-1)}>Left</button>
                <button onClick={()=>updateIndex(leftmostIndex+1)}>Right</button>
            </div>
        </div>
    )
}

export default PlaygroundCarousel
