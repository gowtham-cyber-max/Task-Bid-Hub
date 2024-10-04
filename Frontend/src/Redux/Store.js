import UserReducer from "./Reducer/UserReducer";
import BidderReducer from "./Reducer/BidderReducer";
import {configureStore} from "@reduxjs/toolkit"
export const API_URL="http://localhost:5000";

export default configureStore({
    reducer:{
        user:UserReducer,
        bidder:BidderReducer
        }
});