import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer : {
        ui : uiSlice.reducer,
        cart : ''
    }
})


export default store