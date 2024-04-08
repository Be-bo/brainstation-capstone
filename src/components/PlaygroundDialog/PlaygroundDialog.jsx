import React from 'react';
import './PlaygroundDialog.scss';

function PlaygroundDialog({imageUrl, cancelDialog}) {
    return (
        <div className='playground-dialog'>

            {/* // MARK: Image Layer */}
            {imageUrl != '' && ( <>
                <i className='fa-solid fa-xmark fa-2x playground-dialog__cancel-icon' onClick={cancelDialog} />
                <img className='playground-dialog__image' src={imageUrl} />
            </>)}

            {/* // MARK: Loading Layer */}
            {imageUrl == '' &&
                < div >
                    <h2 className='upload-container__text'>Working on it!</h2>
                    <div className="loader">
                        <div className="spinner"></div>
                    </div>
                    <p>Cooking your outfit...</p>
                </div>
            }
        </div >
    )
}

export default PlaygroundDialog
