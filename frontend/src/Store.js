import { createContext,useReducer } from "react";

const Store = createContext()


const initialAuth = {
    userInformation: localStorage.getItem('userInformation')? JSON.parse(localStorage.getItem('userInformation')) : null
}

function authReducer(state, action){
    switch(action.type){
        case 'USER_LOGIN':
            return {...state, userInformation: action.payload}
        case 'USER_LOGOUT':
            return {...state, userInformation: null}
        default:
            return state
    }
}


const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialAuth)
    const value = {state,dispatch}
    
  return (
    <Store.Provider value={value}>
        {props.children}
    </Store.Provider>
  )
}

export {Store, StoreProvider}