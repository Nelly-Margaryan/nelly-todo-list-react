
import { Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from "./task.module.css";

function Task(props) {
    const task = props.data;
    return (
        <Col xs={12} sm={6} md={4} lg={3}>
            <Card bg="light" className="mb-2 mt-2">
                <Card.Body>
                    <div className={styles.oneLine}>
                        <Card.Title>{task.title}</Card.Title>
                        <Form.Check 
                        className={styles.checkboxTask} 
                        onClick= {()=> props.onTaskSelect(task.id)}
                        />
                    </div>

                    <Card.Text>
                        Description
                    </Card.Text>
                    <div className="d-grid gap-2 d-flex justify-content-end">
                        <Button variant="secondary">
                            <FontAwesomeIcon icon={faPenToSquare} />


                        </Button>
                        <Button 
                        variant="danger"
                        onClick={()=> props.onTaskDelete(task.id)}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />

                        </Button>
                    </div>

                </Card.Body>
            </Card>

        </Col>
    );


}

export default Task;