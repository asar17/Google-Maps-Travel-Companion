import {createSlice} from '@reduxjs/toolkit'
import {setType} from '../type/typeSlice'

const initialState={
    rating:0
}

const ratingSlice=createSlice({
    name:'rating',
    initialState,
    reducers:{
        setRating:(state,action)=>{
            state.rating=action.payload.rating
        }

    },
    extraReducers:{
        [setType]:(state,action)=>{
            state.rating=0
        }
    }
})
export default ratingSlice.reducer
export const {setRating}=ratingSlice.actions