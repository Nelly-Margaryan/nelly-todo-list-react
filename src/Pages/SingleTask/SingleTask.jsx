import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import TaskApi from "../../Api/taskApi";
import TaskModal from "../../Components/TaskModal/TaskModal";


import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faTrashCan, faHistory } from '@fortawesome/free-solid-svg-icons';
// import { useDispatch } from "react-redux";
// import setLoader from "../../Redux/Reducers/isLoading";
import { formatDate } from "../../Utils/helpers";
import styles from "./singleTask.module.css";


const taskApi = new TaskApi();

function SingleTask() {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    useEffect(() => {
        taskApi.getSingle(taskId)
            .then((task) => {
                setTask(task);
            })
            .catch((err) => {
                toast.error(err.message);
            })
    }, [taskId]);

    const onEditTask = (editedTask) => {
        // dispatch(setLoader(true));
        taskApi
            .update(editedTask)
            .then((updatedTask) => {
                setTask(updatedTask);
                toast.success(`The task has been edited successfully!`);
                setIsEditTaskModalOpen(false);
            })
            .catch((err) => {
                toast.error(err.message);
            })
            // .finally(() => {
            //     dispatch(setLoader(false))
            // });
    }

    const onTaskDelete = () => {
        taskApi
            .delete(taskId)
            .then(() => {
                navigate("/");
                toast.success('The task has been deleted successfully!');
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }

    return (
        <div className={styles.singleTaskPageView}>
            <Container>
                <Row>
                    <div className="d-flex justify-content-center">
                        <Col xs="12" lg="10" xl="9">
                            <Card className={`mb-2 mt-2 ${styles.singleTaskContainer}`}>
                                {task ?
                                    <Card.Body>
                                        <Card.Title className={styles.singleTaskTitle}>{task.title}</Card.Title>
                                        <hr></hr>
                                        <Card.Text className={styles.alignText}>{task.description}</Card.Text>
                                        <hr></hr>
                                        <Card.Text className={styles.alignText}><b>Status: </b> {task.status}</Card.Text>
                                        <Card.Text className={styles.alignText}><b>Created at: </b> {formatDate(task.created_at)}</Card.Text>
                                        <Card.Text className={styles.alignText}><b>Deadline: </b> {formatDate(task.date)}</Card.Text>
                                        <div className="d-grid gap-2 mt-5 d-flex justify-content-end">
                                            {
                                                task.status === "active" ?
                                                    <Button
                                                        title="Mark as done"
                                                        variant="success"
                                                        onClick={() => onEditTask({ status: "done", _id: task._id })}>
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </Button> :
                                                    <Button
                                                        title="Mark as active"
                                                        variant="info"
                                                        onClick={() => onEditTask({ status: "active", _id: task._id })}>
                                                        <FontAwesomeIcon icon={faHistory} />
                                                    </Button>
                                            }
                                            <Button
                                                title="Edit"
                                                variant="secondary"
                                                onClick={() => { setIsEditTaskModalOpen(true) }}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>
                                            <Button
                                                title="Delete"
                                                variant="danger"
                                                onClick={onTaskDelete}
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </Button>
                                        </div>
                                    </Card.Body>
                                    :
                                    <div>Task not found</div>}
                            </Card>
                        </Col>
                        {isEditTaskModalOpen &&
                            <TaskModal
                                onCancel={() => { setIsEditTaskModalOpen(false) }}
                                onSave={onEditTask}
                                data={task}
                            />
                        }
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default SingleTask;