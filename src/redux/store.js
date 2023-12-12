import { combineReducers, applyMiddleware, createStore } from "redux";
import basketReducer from "./reducers/basketReducer";
import productReducer from "./reducers/productReducer";
import { thunk } from "redux-thunk";
//reducer'ları birleştirme
const rootReducer = combineReducers({ basketReducer, productReducer });

//store'u oluşturma
//apply middleware fonksiyonu ile
//thunk middleware'ini store'a tanıtma
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
