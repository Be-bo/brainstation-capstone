import {configureStore} from '@reduxjs/toolkit';
import playgroundReducer from '../components/Playground/PlaygroundSlice';

export default configureStore({
    reducer: {
        playgroundSelection: playgroundReducer,
    },
});