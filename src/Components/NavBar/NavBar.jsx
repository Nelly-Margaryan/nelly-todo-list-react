import { memo } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from "./navBar.module.css"


const activeLinkClassName = ({ isActive }) => {
    const classes = [styles.navPages];
    if(isActive){
        classes.push(styles.active);
    }
    return classes.join(" ");
}

function NavBar() {
    return (
        <Navbar className={styles.bgMenu}>
            <Container>
                <NavLink to="/" className={activeLinkClassName}>
                    <FontAwesomeIcon className="me-1" icon={faHouse} />
                    ToDo
                </NavLink>
                <Nav className="me-auto">
                    <NavLink to="/about" className={activeLinkClassName}> About </NavLink>
                    <NavLink to="/contact" className={activeLinkClassName}> Contact us </NavLink>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default memo(NavBar);