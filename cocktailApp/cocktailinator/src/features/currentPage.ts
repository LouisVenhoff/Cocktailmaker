import {createSlice} from "@reduxjs/toolkit";
import { Page } from "../classes/pageLogic/pages";

export const currentPageSlice = createSlice({
    name:"currentPage",
    initialState:{value:{page: Page.SELECT_PAGE}},
    reducers:{
        switchPage:(state, action) => {
            state.value.page = action.payload;
        }
    }
});

export const {switchPage} = currentPageSlice.actions;

export default currentPageSlice.reducer;