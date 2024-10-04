const initialState={
    bidder:null,
    task:[]
}

const BidderReducer=(state=initialState,action)=>{
    switch(action.type){
        case "BIDDER_LOGIN":
            return{
                ...state,
                bidder:action.payload
            }
        case "BIDDER_LOG_OUT":
            return{
                ...state,
                bidder:null,
                task:[]
            }
        default:
            return{
                state
            }

    }
}
export default BidderReducer;