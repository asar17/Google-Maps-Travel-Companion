import {configureStore} from '@reduxjs/toolkit'
import typeReducer from './features/type/typeSlice'
import ratingReducer from './features/rating/ratingSlice'
import restaurantDetailsReducer from './features/placesDetails/restaurantDetailsSlice'


const store=configureStore({
    reducer:{
        type2:typeReducer,
        rating:ratingReducer,
        restaurantDetails:restaurantDetailsReducer

    }
})
export default store