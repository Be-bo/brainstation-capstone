import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import {setUserData} from '../Playground/PlaygroundSlice';
import {useSelector, useDispatch} from 'react-redux';
import './FaceUpload.scss';


function FaceUpload() {
    const dispatch = useDispatch();
    const reduxUserData = useSelector((state) => state.playgroundData.user_data);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const onDrop = (files) => {
        setSelectedFiles(files);
        if (files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setThumbnail(reader.result);
                dispatch(setUserData({'face_image': reader.result}));
            };
            reader.readAsDataURL(files[0]);
        }
    };
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
        },
        onDrop
    });

    useEffect(() => {
        // console.log(reduxUserData); // Log the latest playgroundData when it changes
    }, [reduxUserData]);


    return (
        <div className='upload-container'>
            {thumbnail ?
                <h2 className='upload-container__text'>Looking Great!</h2>
                :
                <h2 className='upload-container__text'>Upload a Pretty Face ;)</h2>
            }

            <div {...getRootProps({ className: "dropzone" })} className="upload-container__image-area">
                <input {...getInputProps()} />
                {thumbnail ?
                    <div className="upload-container__thumbnail-mask">
                        <img className="upload-container__thumbnail" src={thumbnail} alt="Selected file thumbnail" />

                        <div className="upload-container__thumbnail-overlay">
                            <i className="fa-solid fa-pen-to-square fa-5x"/>
                        </div>
                    </div>
                    :
                    <i className='upload-container__upload-icon fa-solid fa-upload fa-5x' />}
            </div>

            {!thumbnail && (
                <>
                    <h3>Drag and Drop <span style={{ display: 'block' }}>OR</span></h3>
                    <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <button>Browse</button>
                    </div>
                    <p>Supports PNG and JPG</p>
                </>
            )}

        </div>
    )
}

export default FaceUpload
