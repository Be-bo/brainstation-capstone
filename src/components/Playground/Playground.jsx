import { useState, useEffect } from 'react';
import './Playground.scss';
import PlaygroundCarousel from '../PlaygroundCarousel/PlaygroundCarousel';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import GeneratedItem from '../GeneratedItem/GeneratedItem';
import FaceUpload from '../FaceUpload/FaceUpload';
import PlaygroundDialog from '../PlaygroundDialog/PlaygroundDialog';
import axios from 'axios';
import { addCategory } from '../Playground/PlaygroundSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setUpDefaultReduxCategoryItem } from '../../helpers';


function Playground() {
    const dispatch = useDispatch();
    const reduxUserData = useSelector((state) => state.playgroundData.user_data);
    const reduxClothingCategories = useSelector((state) => state.playgroundData.categories);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedItem, setGeneratedItem] = useState();
    const [imageUrl, setImageUrl] = useState('');
    const [readyToGenerate, setReadyToGenerate] = useState(false);
    // const [generationRequest, setGenerationRequest] = useState({});

    const [selectedFaceImage, setSelectedFaceImage] = useState(null);

    const handleFileUpload = (file) => {
        console.log(file.name);
        setSelectedFaceImage(file);
        // Dispatch action with the file (if needed)
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setImageUrl('');

        try {
            const formData = new FormData();
            formData.append('face_image', selectedFaceImage);
            formData.append('categories', JSON.stringify(reduxClothingCategories));

            const generationResponse = await axios.post(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/generate`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('File uploaded successfully:', generationResponse.data);
            setImageUrl(generationResponse.data.result_image);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    useEffect(() => {
        async function fetchBaseData() {
            const categoriesResponse = await axios.get(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/clothing-categories`);
            const sortedCategories = categoriesResponse.data.sort((a, b) => a.carousel_index - b.carousel_index);

            if (reduxClothingCategories.length == 0)
                for (let i = 0; i < sortedCategories.length; i++)
                    dispatch(addCategory(setUpDefaultReduxCategoryItem(sortedCategories[i]['_id'])));
        }

        fetchBaseData();
    }, []);

    useEffect(() => {
        for (let i = 0; i < reduxClothingCategories.length; i++) {
            if (!reduxClothingCategories[i]['selected_color'] || reduxClothingCategories[i]['selected_color'].length <= 0) break;
            if (i >= reduxClothingCategories.length - 1) {
                setReadyToGenerate(true);
                // const temp = {
                //     user_data: reduxUserData,
                //     categories: reduxClothingCategories
                // };
                // setGenerationRequest(temp);
            }
        }
    }, [reduxClothingCategories]);


    // MARK: Return Statement
    return (
        <div className='playground'>

            <div className='playground__container'>
                <NavBar isPlayground={true} />

                <div className='carousel-container'>
                    <FaceUpload onFileUpload={handleFileUpload} />

                    {
                        reduxClothingCategories?.map((categoryItem, index) => {
                            return <PlaygroundCarousel key={index} defaultIndexOffset={2} defaultCardDimen={200} defaultItemWidth={232} categoryIndex={index} />
                        })
                    }

                    {/* // MARK: Bottom */}
                    {readyToGenerate && !isGenerating && <button className='carousel__generate-btn' onClick={handleGenerate}>Generate</button>}
                </div>
                <Footer />
            </div>

            {isGenerating && <PlaygroundDialog imageUrl={imageUrl} cancelDialog={() => setIsGenerating(false)} />}
            {isGenerating && <div className='playground__overlay'></div>}
        </div>
    );
}

export default Playground
