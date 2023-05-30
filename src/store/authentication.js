import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated : localStorage.getItem('isLoggedIn') === 'true',
    token : localStorage.getItem('token2'),
    userEmail : localStorage.getItem('email2')
}



 const authSlice = createSlice({
    name : 'authentication',
    initialState : initialAuthState,
    reducers : {
        login(state, action) {
            state.isAuthenticated = true
            state.token = action.payload.token
            state.userEmail = action.payload.email
            localStorage.setItem('token2', action.payload.token)
            localStorage.setItem('email2', action.payload.email)
            localStorage.setItem('isLoggedIn', true)
        },
        logout(state) {
            state.isAuthenticated = false
            localStorage.removeItem('token2')
            localStorage.removeItem('email2')
            localStorage.setItem('isLoggedIn', false)
            state.token = null
        }
    }
})

export const authActions = authSlice.actions

export default authSlice.reducer