import { useState } from 'react';
import './Playground.scss';
import dummies from '../../data/carousel-dummy.json';
import PlaygroundCarousel from '../PlaygroundCarousel/PlaygroundCarousel';


function Playground() {

    return (
        <div>
            <PlaygroundCarousel/>
        </div>
    );
}

export default Playground
