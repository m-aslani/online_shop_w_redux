import Loader from "../components/Loader";

import { Link, useParams } from "react-router-dom";

import { useProductDetails } from "../context/ProductContext";
import { FaTags } from "react-icons/fa";
import { IoArrowUndoSharp, IoPricetagsOutline } from "react-icons/io5";

import styles from "./DetailsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { useEffect } from "react";

function DetailsPage() {
  const { id } = useParams();
const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const productDetails = useSelector((store) =>
    store.products.products.find((i) => i.id === +id)
  );

  if (!productDetails) return <Loader />;

  return (
    <div className={styles.container}>
      <img src={productDetails.image} alt={productDetails.title} />
      <div className={styles.information}>
        <h3 className={styles.title}>{productDetails.title}</h3>
        <p className={styles.description}>{productDetails.description}</p>
        <p className={styles.category}>
          <FaTags />
          {productDetails.category}
        </p>
        <div>
          <span className={styles.price}>
            <IoPricetagsOutline />
            {productDetails.price} $
          </span>
          <Link to="/products">
            <IoArrowUndoSharp />
            <span>Back To Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
