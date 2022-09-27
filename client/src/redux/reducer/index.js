

const initialState ={
    clientes:[],
    cliente:{}
    
};

const rootReducer = ( state = initialState, action)=>{
    switch(action.type){
        case 'GET_ClIENTES':
            return{
                ...state,
                clientes:action.payload
            }
        case 'GET_INFO_CLIENTE':
            return{
                ...state,
                cliente:action.payload
            }
           
        default:
            return{...state}
    }
};

export default rootReducer;