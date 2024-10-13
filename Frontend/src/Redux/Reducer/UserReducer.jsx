const initialState={
    user:null,
    img:[],
    task:[],
    bids:[],
    message:[]
}

const UserReducer=(state=initialState,action)=>{
    console.log(action.type);
    switch(action.type){
        case "USER_LOGIN":
            // console.log(action.payload)
            return {
                ...state,
                user:action.payload
            };
        case "USER_LOG_OUT":
            return {
                ...state,
                user:null,
                img:[],
                task:[]
            };
        case "USER_ADD_IMG":
            return {
                ...state,
                img: [...state.img,action.payload],
            }
        case "USER_DEL_IMG":
            return{
                ...state,
                img: state.img.filter(img=>img.id!==action.payload.id)
            }
        case "ADD_USER_TASK":
            return{
                ...state,
                task: [...state.task,...action.payload],
            }
        case "EMPTY_USER_TASK":
            return{
                ...state,
                task:[]
            }
        case "ADD_USER_BIDS":
            return{
                ...state,
                bids: [...state.bids,...action.payload],
            }
        case "EMPTY_USER_BIDS":
            return{
                ...state,
                bids:[]
            }
        case "GET_USER_MESSAGE":
            return{
                ...state,
                message: [...state.message,...action.payload],
            }
        case "EMPTY_USER_MESSAGE":
            return{
                ...state,
                message:[]
            }
        default:
            return state;
    }
}
export default UserReducer;