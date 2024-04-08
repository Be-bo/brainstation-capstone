import {configureStore} from '@reduxjs/toolkit';
import playgroundReducer from '../components/Playground/PlaygroundSlice';

export default configureStore({
    reducer: {
        playgroundData: playgroundReducer, // core reducer for all playground data (carousel selection & face image path)
    },
});