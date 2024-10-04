const initialState={
    user:null,
    img:[],
    task:[]
}

const UserReducer=(state=initialState,action)=>{
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
                img:[]
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
        default:
            return state;
    }
}
export default UserReducer;