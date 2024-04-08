// MARK: Imports
import './FaceUpload.scss';
import { React, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from "react-dropzone";
import { setUserData } from '../Playground/PlaygroundSlice';


/**
 * FaceUpload component contains the top section of the Playground page where the user uploads an image of a face to use for face swapping.
 * @param {function} props.onFileUpload - A local image selection click handler.
 * @returns {JSX.Element} React element representing the FaceUpload component.
 */
function FaceUpload({ onFileUpload }) {

    // MARK: Variables & Hooks
    const dispatch = useDispatch();
    const reduxUserData = useSelector((state) => state.playgroundData.user_data);
    const [thumbnail, setThumbnail] = useState(null);

    // MARK: DropZone Setup
    const onDrop = (files) => {
        if (files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setThumbnail(reader.result); // update thumbnail for the user
                onFileUpload(files[0]); // notify Playground (parent component) and pass along full image info
                dispatch(setUserData({ 'face_image': files[0].name })); // save path to image in Redux Playground Slice
            };
            reader.readAsDataURL(files[0]);
        }
    };
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpeg'], },
        onDrop
    });

    // MARK: Return Statement
    return (
        <div className='upload-container'>

            {/* // MARK: Thumbnail Header */}
            {thumbnail ? (
                <h2 className='upload-container__text'>Looking Great!</h2>
            ) : (
                <h2 className='upload-container__text'>Upload a Pretty Face ;)</h2>
            )}

            {/* // MARK: Thumbnail DropZone */}
            <div {...getRootProps({ className: "dropzone" })} className="upload-container__image-area">
                <input {...getInputProps()} />
                {thumbnail ? (
                    <div className="upload-container__thumbnail-mask">
                        <img className="upload-container__thumbnail" src={thumbnail} alt="Selected file thumbnail" />
                        <div className="upload-container__thumbnail-overlay">
                            <i className="fa-solid fa-pen-to-square fa-5x" />
                        </div>
                    </div>
                ) : (
                    <i className='upload-container__upload-icon fa-solid fa-upload fa-5x' />
                )}
            </div>

            {/* // MARK: DropZone Button Footer */}
            {!thumbnail && (
                <>
                    <h3>Drag and Drop <span style={{ display: 'block' }}>OR</span></h3>
                    <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <button>Browse</button>
                    </div>
                    <p>*Supports PNG and JPG</p>
                </>
            )}
        </div>
    )
}

export default FaceUpload
