import {createSlice} from "@reduxjs/toolkit";


export const currentCocktailSlice = createSlice({
    name:"currentCocktail",
    initialState:{value:{objStr: ""}},
    reducers:{ 
        load: (state, action) => {
            state.value.objStr = JSON.stringify(action.payload);
        },

    }
});

export const {load} = currentCocktailSlice.actions;

export default currentCocktailSlice.reducer;




