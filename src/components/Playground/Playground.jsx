// MARK: Imports
import './Playground.scss';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory } from '../Playground/PlaygroundSlice';
import { setUpDefaultReduxCategoryItem } from '../../helpers';
import axios from 'axios';
import PlaygroundCarousel from '../PlaygroundCarousel/PlaygroundCarousel';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import FaceUpload from '../FaceUpload/FaceUpload';
import PlaygroundDialog from '../PlaygroundDialog/PlaygroundDialog';


/**
 * Playground contains the core feature of the application - the user selects a face picture and makes clothing and color selections for all clothing categories within their respective carousels.
 * When the selection has been made the generation button will appear that allows the user to submit a generation request to get the resulting generated and face-swapped image.
 * Lastly, it manages the PlaygroundDialog used to display the final result of a single generation item.
 * @returns {JSX.Element} React element containing the entire Playground feature component of the application.
 */
function Playground() {

    // MARK: Variables & Hooks
    const dispatch = useDispatch();
    const reduxClothingCategories = useSelector((state) => state.playgroundData.categories);
    const [isGenerating, setIsGenerating] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [readyToGenerate, setReadyToGenerate] = useState(false);
    const [selectedFaceImage, setSelectedFaceImage] = useState(null);

    // MARK: Event Handlers
    const handleFileUpload = (file) => {setSelectedFaceImage(file);};
    const handleGenerate = async () => {
        setIsGenerating(true);
        setImageUrl('');

        try {
            const formData = new FormData();
            formData.append('face_image', selectedFaceImage); // attach face image to the payload
            formData.append('categories', JSON.stringify(reduxClothingCategories)); // attach user selection from all clothing carousels
            const generationResponse = await axios.post(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/generate`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', generationResponse.data);
            setImageUrl(generationResponse.data.result_image); // save image url for the playground dialog to use

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    // MARK: Use Effect Hooks
    useEffect(() => {
        async function fetchBaseData() { // fetch all existing clothing categories info
            const categoriesResponse = await axios.get(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/clothing-categories`);
            const sortedCategories = categoriesResponse.data.sort((a, b) => a.carousel_index - b.carousel_index); // sort data into intended display order
            if (reduxClothingCategories.length == 0)
                for (let i = 0; i < sortedCategories.length; i++)
                    dispatch(addCategory(setUpDefaultReduxCategoryItem(sortedCategories[i]['_id']))); // set up empty selection template in Redux
        }
        fetchBaseData();
    }, []);

    useEffect(() => {
        for (let i = 0; i < reduxClothingCategories.length; i++) { // if selection made for all categories display generate button
            if (!reduxClothingCategories[i]['selected_color'] || reduxClothingCategories[i]['selected_color'].length <= 0) break;
            if (i >= reduxClothingCategories.length - 1) setReadyToGenerate(true);
        }
    }, [reduxClothingCategories]);


    // MARK: Return Statement
    return (
        <div className='playground'>
            <div className='playground__container'>
                <NavBar isPlayground={true} />

                {/* // MARK: Carousels & Face Upload */}
                <div className='playground__content'>
                    <FaceUpload onFileUpload={handleFileUpload} />
                    {reduxClothingCategories?.map((categoryItem, index) => {
                            return <PlaygroundCarousel key={index} uiIndexOffset={2} defaultCardDimen={200} defaultItemWidth={232} categoryIndex={index} />
                    })}
                    {readyToGenerate && !isGenerating && <button className='carousel__generate-btn' onClick={handleGenerate}>Generate</button>}
                </div>

                <Footer />
            </div>

            {/* // MARK: Opacity Overlay & Image Dialog */}
            {isGenerating && <PlaygroundDialog imageUrl={imageUrl} cancelDialog={() => setIsGenerating(false)} />}
            {isGenerating && <div className='playground__overlay'></div>}
        </div>
    );
}

export default Playground
