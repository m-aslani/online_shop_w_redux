import { createQueryObject } from '../helpers/helper';
import { categories } from '../constants/categoriesList';

import { FaList } from 'react-icons/fa';

import styles from "./SideBar.module.css"


function SideBar({query,setQuery}) {

    const categoryHandler = (event) => {
        const { tagName } = event.target;
        const category = event.target.innerText.toLowerCase();
    
        if (tagName !== "LI") return;
    
        setQuery((query) => createQueryObject(query , {category}));
      };


  return (
    <div className={styles.sidebar}>
    <div>
      <FaList />
      <p>Categories</p>
    </div>
    <ul onClick={categoryHandler}>
      {categories.map((c)=>(
        <li key={c.id} className={c.type.toLowerCase() === query.category ? styles.selected : null}>{c.type}</li>
      ))}
    </ul>
  </div>
  )
}

export default SideBar