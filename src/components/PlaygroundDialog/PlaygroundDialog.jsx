import React from 'react';
import './PlaygroundDialog.scss';

function PlaygroundDialog(props) {
    const { imageUrl, cancelDialog } = props;
    return (
        <div className='playground-dialog'>
            {imageUrl != '' && <i className='fa-solid fa-xmark fa-2x playground-dialog__cancel-icon' onClick={cancelDialog} />}

            {imageUrl == '' &&
                < div >
                    <h2 className='upload-container__text'>Working on it!</h2>
                    <div className="loader">
                        <div className="spinner"></div>
                    </div>
                    <p>Cooking your outfit...</p>
                </div>
            }

            {imageUrl != '' && <img className='playground-dialog__image' src={imageUrl} />}
            {/* {imageUrl != '' && <button>Download</button>} */}
        </div >
    )
}

export default PlaygroundDialog
