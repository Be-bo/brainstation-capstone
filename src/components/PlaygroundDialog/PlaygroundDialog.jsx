import React from 'react';
import './PlaygroundDialog.scss';

/**
 * This component displays an overlay dialog containing the resulting, generated image after the processing has finished on the Playground page.
 * @param {string} props.imageUrl - The server URL for the image to display within the dialog.
 * @param {function} props.cancelDialog - Click handler for the cancel icon, to notify the parent element (Playground) and hide this dialog.
 * @returns {JSX.Element} React element representing the PlaygroundDialog component.
 */
function PlaygroundDialog({ imageUrl, errorText, cancelDialog }) {
    return (
        <div className='playground-dialog'>

            {errorText === '' ? (
                <>
                    {/* // MARK: Image Layer */}
                    {imageUrl != '' && (<>
                        <i className='fa-solid fa-xmark fa-2x playground-dialog__cancel-icon' onClick={cancelDialog} />
                        <img className='playground-dialog__image' src={imageUrl} />
                    </>)}

                    {/* // MARK: Loading Layer */}
                    {imageUrl == '' &&
                        <div>
                            <h2 className='upload-container__text'>Working on it!</h2>
                            <div className="loader">
                                <div className="spinner"></div>
                            </div>
                            <p>Cooking your outfit...</p>
                        </div>
                    }
                </>
            ) : (

                // MARK: Show error upon failure
                <>
                    <i className='fa-solid fa-xmark fa-2x playground-dialog__cancel-icon' onClick={cancelDialog} />
                    <p className='playground-dialog__error-text'>Error: {errorText}</p>
                </>
            )}


        </div >
    )
}

export default PlaygroundDialog
