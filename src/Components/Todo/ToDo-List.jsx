import { useState, useEffect } from "react";
import Task from "../Task/Task";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquareFull, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import DeleteSelected from "../DeleteSelected/DeleteSelected";
import NavBar from "../NavBar/NavBar";
import Filters from "../Filters/Filters";
import TaskApi from "../../Api/taskApi";
import TaskModal from "../TaskModal/TaskModal";
import styles from "./todo.module.css";

const taskApi = new TaskApi();

function ToDo() {

    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [editableTask, setEditableTask] = useState(null);


    const getTasks = (filters) => {
        taskApi.getAll(filters)
            .then((tasks) => {
                setTasks(tasks);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    useEffect(() => {
        getTasks();
    }, []);

    const onAddNewTask = (newTask) => {
        taskApi
            .add(newTask)
            .then((task) => {
                const tasksCopy = [...tasks];
                tasksCopy.push(task);
                setTasks(tasksCopy);
                setIsAddTaskModalOpen(false);
                toast.success('The task has been added successfully!');
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const onTaskDelete = (taskId) => {
        taskApi
            .delete(taskId)
            .then(() => {
                const newTasks = tasks.filter((task) => task._id !== taskId);
                setTasks(newTasks);

                if (selectedTasks.has(taskId)) {
                    const newSelectedTasks = new Set(selectedTasks);
                    newSelectedTasks.delete(taskId);
                    setSelectedTasks(newSelectedTasks);
                }
                toast.success('The task has been deleted successfully!');
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }


    const onTaskSelect = (taskId) => {
        const selectedTasksCopy = new Set(selectedTasks);
        if (selectedTasksCopy.has(taskId)) {
            selectedTasksCopy.delete(taskId);
        } else {
            selectedTasksCopy.add(taskId);
        }
        setSelectedTasks(selectedTasksCopy);
    }

    const deleteSelectedTasks = () => {
        taskApi
            .deleteMany([...selectedTasks])
            .then(() => {
                const newTasks = [];
                const deletedTasksCount = selectedTasks.size;
                tasks.forEach((task) => {
                    if (!selectedTasks.has(task._id)) {
                        newTasks.push(task);
                    }
                });
                setTasks(newTasks);
                setSelectedTasks(new Set());
                toast.success(`${deletedTasksCount} ${deletedTasksCount > 1 ? "tasks have" : "task has"} been deleted successfully!`);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }


    const selectAllTasks = () => {
        const taskIds = tasks.map((task) => task._id);
        setSelectedTasks(new Set(taskIds));
    }


    const resetSelectedTasks = () => {
        setSelectedTasks(new Set());
    }


    const onEditTask = (editedTask) => {
        taskApi
            .update(editedTask)
            .then((task) => {
                const newTasks = [...tasks];
                const foundIndex = newTasks.findIndex((t) => t._id === task._id);
                newTasks[foundIndex] = task;
                toast.success(`Task have been edited successfully!`);
                setTasks(newTasks);
                setEditableTask(null);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }

    const onFilter = (filters) => {
        getTasks(filters);
    };


    const tasksJsx = tasks.map((task) => {
        return (
            <Task
                data={task}
                key={task._id}
                onTaskDelete={setTaskToDelete}
                onTaskSelect={onTaskSelect}
                onTaskEdit={setEditableTask}
                checked={selectedTasks.has(task._id)}
                onStatusChange={onEditTask}
            />
        );
    })


    return (
        <>
            <NavBar />

            <Container>
                <Row className={styles.filterView}>
                    <Col sm="2">
                        <Button
                            className="mt-1"
                            variant="success"
                            onClick={() => setIsAddTaskModalOpen(true)}
                        >
                            <FontAwesomeIcon className="me-2" icon={faSquarePlus} />
                            Add new task
                        </Button>
                    </Col>
                    <Col sm="10">
                        <Filters onFilter={onFilter} />
                    </Col>
                </Row>
                <Row className="justify-content-start"></Row>
                <Button
                    className="mb-1"
                    variant="secondary"
                    onClick={selectAllTasks}
                >
                    <FontAwesomeIcon className="me-2" icon={faCheckSquare} />
                    Select All
                </Button>{" "}
                <Button
                    className="mb-1"
                    variant="outline-secondary"
                    onClick={resetSelectedTasks}
                >
                    <FontAwesomeIcon className="me-2" icon={faSquareFull} />
                    Reset selected
                </Button>


                {/* <Col xs="10" sm="4" md="3"> */}
                {/* <InputGroup className="mb-1 mt-1"> */}
                {/* <Button */}
                {/* variant="secondary" */}
                {/* onClick={selectAllTasks} */}
                {/* > */}
                {/* <FontAwesomeIcon className="me-2" icon={faCheckSquare} /> */}
                {/* Select All */}
                {/* </Button> */}
                {/* </InputGroup> */}
                {/*  */}
                {/* </Col> */}
                {/* <Col xs="10" sm="4" md="3"> */}
                {/* <InputGroup className="mb-1 mt-1"> */}
                {/*  */}
                {/* <Button */}
                {/* variant="outline-secondary" */}
                {/* onClick={resetSelectedTasks} */}
                {/* > */}
                {/* <FontAwesomeIcon className="me-2" icon={faSquareFull} /> */}
                {/* Reset selected */}
                {/* </Button> */}
                {/* </InputGroup> */}
                {/*  */}
                {/* </Col> */}
                {/* </Row> */}
                <Row>
                    {tasksJsx}
                </Row>

                {taskToDelete &&
                    <ConfirmDialog
                        tasksCount={1}
                        onCancel={() => { setTaskToDelete(null) }}
                        onSubmit={() => {
                            onTaskDelete(taskToDelete);
                            setTaskToDelete(null);
                        }}

                    />}

                {isAddTaskModalOpen &&
                    <TaskModal
                        onCancel={() => setIsAddTaskModalOpen(false)}
                        onSave={onAddNewTask}
                    />
                }
                {editableTask &&
                    <TaskModal
                        onCancel={() => setEditableTask(null)}
                        onSave={onEditTask}
                        data={editableTask}
                    />
                }
                <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </Container>


            <Container>
                <Navbar className={styles.bgFooter} fixed="bottom" >
                    <Container className="justify-content-end">
                        <Navbar.Brand>
                            <DeleteSelected
                                disabled={!selectedTasks.size}
                                tasksCount={selectedTasks.size}
                                onSubmit={deleteSelectedTasks}
                            />
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </Container>
        </>




    );

}
export default ToDo;

