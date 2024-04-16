import { useDispatch, useSelector } from "react-redux";
import BasketCard from "../components/BasketCard";
import BasketSideBar from "../components/BasketSideBar";
// import {useCart} from "../context/CartContext"

import styles from "./CheckoutPage.module.css"

function CheckoutPage() {

  // const [state, dispatch] = useCart();

  const state = useSelector(store=>store.cart);

  // const clickHandler = (type ,payload) => {
  //   // dispatch({ type, payload });
  // };

  if(!!!state.selecteditems.length){
    return (
      <div className={styles.container}>
        <p style={{color:"#f6f4ef" , textAlign:"center" , background:"#516184", margin:"auto" , padding:"10px" , borderRadius:"20px", width:"30%"}}>no items added to cart!</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <BasketSideBar state={state}/>
      <div className={styles.products}>
        {state.selecteditems.map(product=> (
          <BasketCard key={product.id} data={product}/>
        ))}
      </div>
    </div>
  )
}

export default CheckoutPage