const initialState={
    bidder:null,
    task_explore:[]
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
                task_explore: []
            }
        case "GET_TASK_BIDDER":
            return {
              ...state,
              task_explore: [...state.task_explore, ...action.payload]
        };
              
        case "EMPTY_TASK_BIDDERS":
            return{
                ...state,
                task_explore:[]
            }
        default:
            return state
    }
}
export default BidderReducer;