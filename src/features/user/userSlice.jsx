import {createSlice} from '@reduxjs/toolkit';

const initialState={
    userDetails:{},
    isLoggedIn:false
}

var userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.userDetails={...action.payload}
            state.isLoggedIn=true
            
        },
        logout:(state)=>{
            state.userDetails={};
            state.isLoggedIn=false
        }
    }
})
var userReducer = userSlice.reducer;
export var {login,logout} = userSlice.actions;
export default userReducer;