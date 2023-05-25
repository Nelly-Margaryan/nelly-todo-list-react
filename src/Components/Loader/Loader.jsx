import styles from "./loader.module.css";

 function Loader() {

    return (
        <div className={styles.loaderContainer}>
            <div className={styles.ldsSpinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        </div>
    );
}

export default Loader;