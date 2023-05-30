import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    data : {}
}

const expenseSlice = createSlice({
    name : 'expense',
    initialState : initialExpenseState,
    reducers : {
        receivedData(state,action) {
            state.data = action.payload
            console.log('cv ',state.data);
        }
    }
})



export const expenseActions = expenseSlice.actions

export default expenseSlice.reducer