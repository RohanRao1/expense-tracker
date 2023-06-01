import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    data : {},
    showDark : localStorage.getItem('darktheme') === 'true',
    showPremium : localStorage.getItem('isPremium') === true
}

const expenseSlice = createSlice({
    name : 'expense',
    initialState : initialExpenseState,
    reducers : {
        receivedData(state,action) {
            state.data = action.payload
        },
        premium(state) {
            state.showPremium = true
            localStorage.setItem('isPremium', true)
        },
        notPremium(state) {
            state.showPremium = false
            localStorage.setItem('isPremium', false)
        },
        toggle(state) {
            state.showDark = !state.showDark
            localStorage.setItem('darktheme', state.showDark )
            window.location.reload()
        }
    }
})



export const expenseActions = expenseSlice.actions

export default expenseSlice.reducer