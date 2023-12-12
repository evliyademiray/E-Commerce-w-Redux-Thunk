import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBasketData,
  setBasketLoading,
} from "../redux/actions/basketActions";
import Loading from "./../components/Loading";
import BasketItem from "../components/BasketItem";

const BasketPages = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.basketReducer);

  useEffect(() => {
    dispatch(setBasketLoading());
    //sepetteki ürünleri api'den alıp store'a
    //aktaracak asenkron aksiyon
    dispatch(getBasketData());
  }, []);

  const total_count = state.basket.reduce(
    (total, item) => total + item.adet * item.fiyat,
    0
  );

  return (
    <div className=" row px-4 py-5">
      {/* Ürünler Yüklenirken */}
      {state.isLoading && <Loading />}

      {/* Hata olursa */}
      {state.isError && <p>Hata oluştu</p>}

      <div className="col-md-8">
        {/* Veriler gelirse */}
        {state.basket.length > 0 ? (
          state.basket.map((item) => <BasketItem item={item} key={item.id} />)
        ) : (
          <p className="my-5 text-center fs-7">Sepet boş, ürün ekleyiniz</p>
        )}
      </div>
      <div className=" d-flex flex-column align-items-start justify-content-start col-md-4">
        <div className="bg-white text-black p-5 rounded w-100">
          <h5 className="text-center">Toplam Tutar: {total_count} TL</h5>
          <button className="w-100 btn btn-success my-2 fw-bold text-black">
            Alışverişi Tamamla
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketPages;
