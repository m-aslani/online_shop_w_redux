import { useEffect, useState } from "react";
// import { useProducts } from "../context/ProductContext";
import { useSearchParams } from "react-router-dom";

import {filterProducts, getInitialQuery, searchProducts } from "../helpers/helper";

import Card from "../components/Card";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import SideBar from "../components/SideBar";

//REDUX//
import { fetchProducts } from "../features/products/productsSlice";
import { useSelector , useDispatch } from "react-redux";

import styles from "./ProductsPage.module.css";


function ProductsPage() {
  // const products = useProducts();
  const dispatch = useDispatch();
  const {products , loading} = useSelector(store => store.products);
  // const products = [];

  const [search, setSearch] = useState("");
  const [displayed, setDisplayed] = useState([]);
  const [query, setQuery] = useState({}); //what user searched or which category was choosen

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(()=>{
    dispatch(fetchProducts());
  },[])

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search);
    let finalproduct = searchProducts(products, query.search);
    finalproduct =  filterProducts(finalproduct,query.category);
    setDisplayed(finalproduct);
  }, [query]);



  return (
    <div className={styles.main}>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery}/>
      <div className={styles.container}>
        <div className={styles.products}>
          {loading && <Loader />}
          {displayed.map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </div>
        <SideBar query={query} setQuery={setQuery}/>
      </div>
    </div>
  );
}

export default ProductsPage;
