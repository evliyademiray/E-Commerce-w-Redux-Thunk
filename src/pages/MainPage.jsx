import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductData,
  setError,
  setLoading,
  setProducts,
} from "../redux/actions/productActions";
import Loading from "../components/Loading";
import axios from "axios";
import Card from "../components/Card";
import {
  getBasketData,
  setBasketLoading,
} from "../redux/actions/basketActions";

const MainPage = () => {
  const dispatch = useDispatch();
  //store'a abone olma
  const state = useSelector((store) => store.productReducer);

  useEffect(() => {
    //store'daki yükleniyor değerini güncelledik
    dispatch(setLoading());
    dispatch(setBasketLoading());

    //2.Yol -Thunk aksiyonu ile ürün verisi alma
    dispatch(getProductData());

    //sepet verisi alma
    dispatch(getBasketData());
  }, []);

  return (
    <div>
      {/* Yükleniyorsa */}
      {state.isLoading && <Loading />}
      {/* Hata olduysa */}
      {state.isError && <p>Hata oluştu</p>}
      <div className="d-flex flex-wrap gap-4 p-5 justify-content-center">
        {/* veriler geldiyse */}
        {state?.products.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
