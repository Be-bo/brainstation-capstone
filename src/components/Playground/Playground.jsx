import { useState, useEffect } from 'react';
import './Playground.scss';
import PlaygroundCarousel from '../PlaygroundCarousel/PlaygroundCarousel';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import GeneratedItem from '../GeneratedItem/GeneratedItem';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { playgroundDataSchema } from '../../helpers';


function Playground() {
    const playgroundData = useSelector((state) => state.playgroundSelection.data);
    const userDataObject = {"userId": "test-user"}
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedItem, setGeneratedItem] = useState();
    const [generationRequest, setGenerationRequest] = useState({...userDataObject, ...playgroundDataSchema});

    const handleGenerate = async () => {
        setIsGenerating(true);
        const generationResponse = await axios.post(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/generate`, generationRequest);
        console.log(generationResponse);
        setGeneratedItem(generationResponse.data);
        setIsGenerating(false);
    }

    useEffect(() => {
        const updatedRequest = {...userDataObject, ...playgroundData}; // using spread operator
        setGenerationRequest(updatedRequest);
    }, [playgroundData]);


    // MARK: Return Statement
    return (
        <div>
            {/* // MARK: Top */}
            <NavBar isPlayground={true} />

            {/* // MARK: Carousels */}
            <PlaygroundCarousel defaultIndexOffset={2} defaultCardDimen={200} defaultItemWidth={232} pullUrl={`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/top-layer`} carouselCategoryId={'top'}/>
            <PlaygroundCarousel defaultIndexOffset={2} defaultCardDimen={200} defaultItemWidth={232} pullUrl={`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/shirt-layer`} carouselCategoryId={'shirt'}/>
            <PlaygroundCarousel defaultIndexOffset={2} defaultCardDimen={200} defaultItemWidth={232} pullUrl={`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/bottom-layer`} carouselCategoryId={'bottom'}/>


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
