import { memo } from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faTrashCan, faHistory } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from "../../Utils/helpers";
import styles from "./task.module.css";

function Task(props) {
    const task = props.data;

    return (
        <Col xs="9" sm="6" md="4" lg="3">
            <Card className="mb-2 mt-2">
                <Card.Body>
                    <div className={styles.oneLine}>
                        <Card.Title className={styles.truncateText}>{props.number}. {task.title}</Card.Title>
                        <Form.Check
                            className={styles.checkboxTask}
                            onChange={() => props.onTaskSelect(task._id)}
                            checked={props.checked}
                        />
                    </div>
                    <Card.Text className={styles.truncateText}>{task.description}</Card.Text>
                    <Card.Text className={styles.distance}><b>Status: </b>{task.status}</Card.Text>
                    <Card.Text className={styles.distance}><b>Created at: </b>{formatDate(task.created_at)}</Card.Text>
                    <Card.Text className={styles.distance}><b>Deadline: </b>{formatDate(task.date)}</Card.Text>
                    <Link to={`/task/${task._id}`}>
                        <Card.Text className={styles.linkView}>Show more ...</Card.Text>
                    </Link>
                    <div className="d-grid gap-2 mt-3 d-flex justify-content-end">
                        {
                            task.status === "active" ?
                                <Button
                                    className={styles.btnSize}
                                    title="Mark as done"
                                    variant="success"
                                    onClick={() => props.onStatusChange({ status: "done", _id: task._id })}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </Button> :
                                <Button
                                    className={styles.btnSize}
                                    title="Mark as active"
                                    variant="info"
                                    onClick={() => props.onStatusChange({ status: "active", _id: task._id })}>
                                    <FontAwesomeIcon icon={faHistory} />
                                </Button>
                        }
                        <Button className={styles.btnSize}
                            title="Edit"
                            variant="secondary"
                            onClick={() => { props.onTaskEdit(task) }}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button className={styles.btnSize}
                            title="Delete"
                            variant="danger"
                            onClick={() => props.onTaskDelete(task._id)}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );


}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
    onTaskSelect: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
}
export default memo(Task);