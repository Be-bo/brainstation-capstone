import { useState, useEffect } from 'react';
import './Playground.scss';
import PlaygroundCarousel from '../PlaygroundCarousel/PlaygroundCarousel';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import GeneratedItem from '../GeneratedItem/GeneratedItem';
import FaceUpload from '../FaceUpload/FaceUpload';
import axios from 'axios';
import {addCategory} from '../Playground/PlaygroundSlice';
import {useSelector, useDispatch} from 'react-redux';
import { playgroundDataSchema, setUpDefaultReduxCategoryItem } from '../../helpers';


function Playground() {
    const dispatch = useDispatch();
    const reduxUserData = useSelector((state) => state.playgroundData.user_data);
    const reduxClothingCategories = useSelector((state) => state.playgroundData.categories);
    const userDataObject = { "userId": "test-user" }
    const [categoriesBaseData, setCategoriesBaseData] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedItem, setGeneratedItem] = useState();
    const [generationRequest, setGenerationRequest] = useState({ ...userDataObject, ...playgroundDataSchema });

    const handleGenerate = async () => {
        // setIsGenerating(true);
        // const generationResponse = await axios.post(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/generate`, generationRequest);
        // console.log(generationResponse);
        // setGeneratedItem(generationResponse.data);
        // setIsGenerating(false);
    }

    useEffect(()=>{
        async function fetchBaseData(){
            const categoriesResponse = await axios.get(`http://${process.env.REACT_APP_SERVER_IP_ADDRESS}/playground/clothing-categories`);
            const sortedCategories = categoriesResponse.data.sort((a, b) => a.carousel_index - b.carousel_index);

            if(reduxClothingCategories.length == 0)
                for(let i = 0; i<sortedCategories.length; i++)
                    dispatch(addCategory(setUpDefaultReduxCategoryItem(sortedCategories[i]['_id'])));
        }

        fetchBaseData();
    }, []);

    useEffect(() => {
        // console.log(reduxClothingCategories); // check if category data is being updated
    }, [reduxClothingCategories]);


    // MARK: Return Statement
    return (
        <div>
            {/* // MARK: Top */}
            <NavBar isPlayground={true} />
            <FaceUpload/>

            {/* // MARK: Carousels */}

            <div className='carousel-container'>
                {
                    reduxClothingCategories?.map((categoryItem, index) => {
                        return <PlaygroundCarousel key={index} defaultIndexOffset={2} defaultCardDimen={200} defaultItemWidth={232} categoryIndex={index} />
                    })
                }

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
            </div>

            <Footer />
        </div>
    );
}

export default Playground
