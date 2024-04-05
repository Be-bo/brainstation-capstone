import {playgroundDataSchema} from '../../helpers';
import {createSlice} from '@reduxjs/toolkit';

export const playgroundSlice = createSlice ({
    name: 'playgroundData',
    initialState:{
        user_data: {},
        categories: [],
    },

    reducers: {

        setUserData(state, action){
            return {
                ...state,
                user_data: action.payload,
            };
        },

        updateUserData(state, action){
            const {key, value} = action.payload;
            return{
                ...state,
                user_data: {
                    ...state.user_data,
                    [key]: value,
                }
            };
        },

        addCategory(state, action){
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };
        },

        updateCategoryValue(state, action){
            const {index, key, value} = action.payload;
            let updatedCategories = [...state.categories];
            updatedCategories[index][key] = value;
            // with the logic below the "state" would've been modified and this function would be returning at the same time
            // Immer does not allow this, it has to be one or the other
            // return {
            //     ...state,
            //     categories: updatedCategories,
            // };
        },
    }
});

export const {setUserData, updateUserData, addCategory, updateCategoryValue} = playgroundSlice.actions; // action creators are generated for each case reducer function
export default playgroundSlice.reducer;