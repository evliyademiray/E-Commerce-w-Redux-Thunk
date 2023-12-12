//Senkron aksiyonlar
import axios from "axios";
import { ActionTypes } from "./../actionTypes";

axios.defaults.baseURL = "http://localhost:4000";

export const setBasketLoading = () => ({
  type: ActionTypes.SET_BASKET_LOADING,
});

export const setBasket = (payload) => ({
  type: ActionTypes.SET_BASKET,
  payload,
});

export const setBasketError = () => ({
  type: ActionTypes.SET_BASKET_ERROR,
});

//Asenkron Aksiyonlar

//API'dan sepetteki ürünleri alıp store'a aktarır.
export const getBasketData = () => (dispatch) => {
  axios
    .get("/basket")
    .then((res) => dispatch(setBasket(res.data)))
    .catch((err) => dispatch(setBasketError()));
};
//API'daki sepete yeni ürün ekler ve ekleme başarılı olursa eklenen ürünü reducer'a aktarır
export const addToBasket = (product) => (dispatch) => {
  //1-yeni bir obje oluşturup ürünün bilgilerine adet ekleme
  const newProduct = { ...product, adet: 1 };
  //2-objeden gereksiz verileri kaldır.
  // delete newProduct.renk;
  // delete newProduct.ozellikler;
  // delete newProduct.baslik;
  //3-API'a yeni ürünü kaydet
  axios
    .post("/basket", newProduct)
    .then((res) =>
      dispatch({
        type: ActionTypes.ADD_TO_BASKET,
        payload: newProduct,
      })
    )
    .catch((err) => setBasketError());
};

//API'daki ürünün miktarını 1 arttırır ve reducer'a bilgi gönderir.
export const updateItem = (product) => (dispatch) => {
  axios.patch(`/basket/${product.id}`, { adet: product.adet + 1 }).then(() =>
    //API güncellenirse reducer'u güncelleyecek olan aksiyonu çalıştırır
    dispatch({ type: ActionTypes.UPDATE_ITEM, payload: product.id })
  );
};

//API'dan bir ürün kaldırır ve bu ürünün id'sini reducer'a gönderir.
export const removeItem = (delete_id) => (dispatch) => {
  axios
    .delete(`/basket/${delete_id}`).then(()=>
    //Ekranın güncellenmesi için reducer'a haber ver
    dispatch({type:ActionTypes.REMOVE_ITEM, payload: delete_id}))
};
