import axios from "axios";
import { ActionTypes } from "../actionTypes";

//aksiyon oluşturan fonksiyon

export const setLoading = () => {
  return {
    type: ActionTypes.SET_LOADING,
  };
};

export const setError = () => {
  return {
    type: ActionTypes.SET_ERROR,
  };
};

export const setProducts = (payload) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload,
  };
};

//Asenkron thunk Aksiyonu
export const getProductData = () => (dispatch) => {
  axios
    .get("http://localhost:4000/products")
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => dispatch(setError()));
};

/*
*Redux Thunk
*Asenkron Aksiyon - Thunk Aksiyonu

*Redux Thunk, redux kütüphanesini genişleten bir ara yazılımdır(middleware).
*Redux kendisi senkron işlemler desteklerken asenkron eylemleri desteklemez.
*İşte redux thunk bu durumda devreye girer

*Redux thunk, redux eylemlerinin(aksiyonlarının) asenkron olmasını sağlar.
*Bu özellikle ağ istekleri gibi asenkron işlemleri aksiyon içerisinde
* gerçekleştirebiliyoruz.

*Thunk, bir fonksiyonun içerisine farklı bir fonksiyon çağıran anlamına gelir.
*Redux

*/

// fetchTodoById is the "thunk action creator"

function ornekThunkAksiyonu() {
  //asenkron işlemleri yapacak asıl fonksiyon
  return async function (dispatch) {
    const data = await axios.get("...");
    dispatch({ type: "SET_VERI", payload: data });
  };
}

// Kısa yazımı (Arrow function ile)

const ornek2 = () => async (dispatch) => {
  const data = await axios.get("...");
  dispatch({ type: "SET_VERI", payload: data });
};
