import styles from "./styles.module.scss";

import MoonLoader from "react-spinners/MoonLoader";

const Loader = () => {
  return (
    <div className={styles.container}>
      <MoonLoader
        color="#FFFFFF"
        loading={true}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
