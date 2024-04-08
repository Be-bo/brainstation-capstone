import './Gallery.scss';
import { useState, useEffect } from 'react';
import { serverIP } from '../../helpers';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

/**
 * Displays all generated items created to date by first pulling all their data from the server and then using the result_image url to display the final image.
 * @returns {JSX.Element} React element representing the Gallery component.
 */
function Gallery() {
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        async function fetchAllGeneratedItems() {
            const response = await axios.get(`http://${serverIP}/gallery`);
            const sortedItems = response.data.sort((a, b) => b.timestamp - a.timestamp);
            setGalleryItems(sortedItems);
        }
        fetchAllGeneratedItems();
    }, []);

    return (
        <div className='gallery'>
            <NavBar isPlayground={false}/>
            <div className='gallery__container'>
                {
                    galleryItems.map((item, index) => (
                        <div key={index} className='gallery__item'>
                            <img className='gallery__image' src={item.result_image} alt={'A generated gallery image'} />
                        </div>
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default Gallery
