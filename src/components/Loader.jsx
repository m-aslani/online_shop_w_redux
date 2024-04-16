import {Triangle } from "react-loader-spinner";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <Triangle
        height="200"
        width="200"
        color="#fab95b"
      />
    </div>
  );
}

export default Loader;
