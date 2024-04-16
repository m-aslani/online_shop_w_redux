import { Link } from "react-router-dom";
import { productQuantity, shortenText } from "../helpers/helper";

import { BiSolidDetail } from "react-icons/bi";
import { TbShoppingBagPlus } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";

// import { useCart } from "../context/CartContext";

//REDUX//
import { useDispatch, useSelector } from "react-redux";


import styles from "./Card.module.css";
import { addItem, decrease, deleteItem, increase } from "../features/cart/cartSlice";

function Card({ data }) {
  const { id, title, image, price } = data;

  // const [state, dispatch] = useCart();
  const state = useSelector((store)=>store.cart);
  const dispatch = useDispatch();
  
  const quantity = productQuantity(state, id);

  // const clickHandler = (type) => {
  //   // dispatch({ type: type, payload: data });
  // };

  return (
    <div className={styles.card}>
      <img src={image} alt="" />
      <h3>{shortenText(title)}</h3>
      <p>{price} $</p>
      <div className={styles.action}>
        <Link to={`/products/${id}`}>
          <BiSolidDetail />
        </Link>
        <div>
          {quantity === 1 && (
            <button onClick={() => dispatch(deleteItem(data))}>
              <MdDeleteForever />
            </button>
          )}
          {quantity > 1 && (
            <button onClick={() => dispatch(decrease(data))}>-</button>
          )}
          <span>{quantity}</span>
          {quantity === 0 ? (
            <button onClick={() => dispatch(addItem(data))}>
              <TbShoppingBagPlus />
            </button>
          ) : (
            <button onClick={() => dispatch(increase(data))}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
