import { shortenText } from '../helpers/helper'
import { MdDeleteForever } from 'react-icons/md'

import styles from "./BasketCard.module.css"
import { useDispatch } from 'react-redux'
import { decrease, deleteItem, increase } from '../features/cart/cartSlice';

function BasketCard({data }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.card}>
        <img src={data.image} alt={data.title} />
        <p>{shortenText(data.title)}</p>
        <div className={styles.action}>
            {data.quantity === 1 && (
                <button onClick={()=>dispatch(deleteItem(data))}>
                    <MdDeleteForever/>
                </button>
            )}
            {data.quantity>1 && <button onClick={()=>dispatch(decrease(data))}>-</button>}
            <span>{data.quantity}</span>
            <button onClick={()=>dispatch(increase(data))}>+</button>
        </div>
    </div>
  )
}

export default BasketCard