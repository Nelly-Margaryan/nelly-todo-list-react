import { memo } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from "./navBar.module.css"


function NavBar() {
    return (
        <Navbar className={styles.bgMenu}>
            <Container>
                <Navbar.Brand href="#home">
                    <FontAwesomeIcon className="me-1" icon={faHouse} />
                    ToDo
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#">Tasks</Nav.Link>
                    <Nav.Link href="#">About</Nav.Link>
                    <Nav.Link href="#">Contact us</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default memo(NavBar);