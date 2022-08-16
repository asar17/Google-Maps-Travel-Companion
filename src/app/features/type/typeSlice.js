import {createSlice} from '@reduxjs/toolkit'

const initialState={
    type:'restaurants'
}

const typeSlice=createSlice({
    name:'type',
    initialState,
    reducers:{
        setType:(state,action)=>{
            state.type=action.payload.type
        }

    }
})
export default typeSlice.reducer
export const {setType}=typeSlice.actions