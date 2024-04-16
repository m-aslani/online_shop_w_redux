import { TfiSearch } from 'react-icons/tfi'
import { createQueryObject } from '../helpers/helper';

import styles from "./SearchBox.module.css"

function SearchBox({search , setSearch , setQuery}) {

    const searchHandler = () => {
        setQuery((query) => createQueryObject(query , {search}));
      };


  return (
    <div className={styles.search}>
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
    />
    <button onClick={searchHandler}>
      <TfiSearch />
    </button>
  </div>
  )
}

export default SearchBox