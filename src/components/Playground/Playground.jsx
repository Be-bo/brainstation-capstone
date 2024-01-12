import { useState } from 'react';
import './Playground.scss';
import PlaygroundCarousel from '../PlaygroundCarousel/PlaygroundCarousel';
import OldCombinedCarousel from '../PlaygroundCarousel/OldCombinedCarousel';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import GeneratedItem from '../GeneratedItem/GeneratedItem';
import axios from 'axios';


function Playground() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedItem, setGeneratedItem] = useState();
    const [generationRequest, setGenerationRequest] = useState({
        "userId": "test-user",
        "shirt": {
            "name": "Bomber",
            "color": "Blue"
        },
        "top": {
            "name": "Polo",
            "color": "Blue"
        },
        "bottom": {
            "name": "Jeans",
            "color": "Blue"
        }
    });

    const handleGenerate = async () => {
        setIsGenerating(true);
        const generationResponse = await axios.post(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/generate`, generationRequest);
        console.log(generationResponse);
        setGeneratedItem(generationResponse.data);
        setIsGenerating(false);
    }

    const updateCarouselValue = (carouselType, isColor, newValue) => {
        if(isColor){
            setGenerationRequest((prevState) => ({
                ...prevState,
                [carouselType]: {
                    ...prevState[carouselType],
                    "color": newValue
                }
            }));
        }else{
            setGenerationRequest((prevState) => ({
                ...prevState,
                [carouselType]: {
                    ...prevState[carouselType],
                    "name": newValue
                }
            }));
        }

        setTimeout(() => {
            console.log(generationRequest);
        }, 2000);
    }

    return (
        <div>
            {/* // MARK: Top */}
            <NavBar isPlayground={true} />

            {/* // MARK: Carousels */}
            <PlaygroundCarousel defaultIndexOffset={2} defaultCardDimen={200} defaultItemWidth={232} pullUrl={`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/top-layer`} updateCarouselValue={(carouselType, isColor, newValue) => updateCarouselValue(carouselType, isColor, newValue)}/>
            <PlaygroundCarousel defaultIndexOffset={2} defaultCardDimen={200} defaultItemWidth={232} pullUrl={`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/shirt-layer`} updateCarouselValue={(carouselType, isColor, newValue) => updateCarouselValue(carouselType, isColor, newValue)}/>
            <PlaygroundCarousel defaultIndexOffset={2} defaultCardDimen={200} defaultItemWidth={232} pullUrl={`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/bottom-layer`} updateCarouselValue={(carouselType, isColor, newValue) => updateCarouselValue(carouselType, isColor, newValue)}/>


            {/* // MARK: Bottom */}
            <button className='carousel__generate-btn' onClick={handleGenerate}>Generate</button>
                <div>
                    {isGenerating && (
                        <div className="loader">
                            <div className="spinner"></div>
                        </div>
                    )}
                </div>

            {generatedItem ? <GeneratedItem itemData={generatedItem} /> : <p style={{ alignSelf: 'center' }}>This is where your generated image will display.</p>}

            <Footer/>
        </div>
    );
}

export default Playground
