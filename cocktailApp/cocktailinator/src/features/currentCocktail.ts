import {createSlice} from "@reduxjs/toolkit";


export const currentCocktailSlice = createSlice({
    name:"currentCocktail",
    initialState:{value:{objStr: ""}},
    reducers:{ 
        load: (state, action) => {
            state.value.objStr = action.payload;
        },

    }
});

export const {load} = currentCocktailSlice.actions;

export default currentCocktailSlice.reducer;




