import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import styles from "./notFound.module.css";

function NotFound() {

    return (
        <div className={styles.errorPageView}>
            <FontAwesomeIcon icon={faCloud} />
            <h1>404 Page not found</h1>
            <p>The page you're looking for doesn't exist, or the url has been changed.</p>
            <Link to="/">← Back to Home</Link>
        </div>

    )
}

export default NotFound;