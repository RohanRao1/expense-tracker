import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authentication'
import expenseSlice from './expenses'

const store = configureStore({
    reducer : {authentication : authSlice,
            expense : expenseSlice
    }
})

export default store