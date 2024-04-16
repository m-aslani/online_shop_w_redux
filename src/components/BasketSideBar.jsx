import { MdOutlinePriceChange, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";

import { useDispatch } from "react-redux";
import {checkOut} from "../features/cart/cartSlice"

import styles from "./BasketSideBar.module.css";

function BasketSideBar({state}) {

  const dispatch = useDispatch();

  return (
    <div className={styles.sideBar}>
        <div>
            <MdOutlinePriceChange/>
            <p>Total : </p>
            <span>{state.total} $</span>
        </div>
        <div>
            <MdOutlineProductionQuantityLimits/>
            <p>Quantity : </p>
            <span>{state.itemsCount}</span>
        </div>
        <div>
            <BsFillCartCheckFill/>
            <p>Status : </p>
            <span>{!state.checkout && "Pending..."}</span>
        </div>
        <button  onClick={()=>dispatch(checkOut())}>CheckOut</button>
    </div>
  )
}

export default BasketSideBar