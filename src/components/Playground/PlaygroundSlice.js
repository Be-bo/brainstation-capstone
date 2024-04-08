import {createSlice} from '@reduxjs/toolkit';

// MARK: Slice Definition
export const playgroundSlice = createSlice ({

    // MARK: Info
    name: 'playgroundData',
    
    // MARK: Initial State
    initialState:{
        user_data: {},
        categories: [],
    },

    // MARK: Reducers
    reducers: {

        // MARK: User Data
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

        // MARK: Clothing Categories
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
        },
    }
});

// MARK: Exports
export const {setUserData, updateUserData, addCategory, updateCategoryValue} = playgroundSlice.actions;
export default playgroundSlice.reducer;