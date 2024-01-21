import {playgroundDataSchema} from '../../helpers';
import {createSlice} from '@reduxjs/toolkit';

export const playgroundSlice = createSlice ({
    name: 'playgroundSelection',
    initialState: {data: {
        shirtCategory:
        {
            name: '',
            color: '',
        },
        topCategory:
        {
            name: '',
            color: '',
        },
        bottomCategory:
        {
            name: '',
            color: ''
        },
    }},
    reducers: {
        updateProperty: (state, action) => {
            const { category, property, value } = action.payload;
            // Now you can use the category variable without issues
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.

            // TODO: LEFT OFF, just figured this out finally!
            try{
                state.data[category][property] = value;
            }catch(e){
                console.error('Error trying to save data to redux store: ', e)
            }
        }
    }
});

export const {updateProperty} = playgroundSlice.actions; // action creators are generated for each case reducer function
export default playgroundSlice.reducer;