import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquareFull, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../Components/Task/Task";
import ConfirmDialog from "../../Components/ConfirmDialog/ConfirmDialog";
import DeleteSelected from "../../Components/DeleteSelected/DeleteSelected";
import Filters from "../../Components/Filters/Filters";
import TaskApi from "../../Api/taskApi";
import TaskModal from "../../Components/TaskModal/TaskModal";
import { getTaskCount } from "../../Redux/Reducers/taskCount";
import { setLoader } from "../../Redux/Reducers/isLoading";
import styles from "./todo.module.css";

const taskApi = new TaskApi();

function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [editableTask, setEditableTask] = useState(null);

    const dispatch = useDispatch();
    const count = useSelector((state) => state.taskCount.count);

    const getTasks = (filters) => {
        dispatch(setLoader(true));
        taskApi.getAll(filters)
            .then((tasks) => {
                setTasks(tasks);
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => {
                dispatch(setLoader(false))
            });
    };

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        dispatch(getTaskCount(tasks.length));

    }, [tasks.length, dispatch]);

    const onAddNewTask = (newTask) => {
        dispatch(setLoader(true));
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
            })
            .finally(() => {
                dispatch(setLoader(false))
            });
    };

    const onTaskDelete = (taskId) => {
        dispatch(setLoader(true));
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
            })
            .finally(() => {
                dispatch(setLoader(false))
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
        dispatch(setLoader(true));
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
            })
            .finally(() => {
                dispatch(setLoader(false))
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
        dispatch(setLoader(true));
        taskApi
            .update(editedTask)
            .then((task) => {
                const newTasks = [...tasks];
                const foundIndex = newTasks.findIndex((t) => t._id === task._id);
                newTasks[foundIndex] = task;
                toast.success(`The task has been edited successfully!`);
                setTasks(newTasks);
                setEditableTask(null);
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => {
                dispatch(setLoader(false))
            });
    }

    const onFilter = (filters) => {
        getTasks(filters);
    };


    const tasksJsx = tasks.map((task, index) => {
        return (
            <Task
                number={index + 1}
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
            <Container>
                <Row>
                    <Col sm="3" md="2">
                        <div className={styles.addBtn}>
                            <Button
                                className="mt-1"
                                variant="success"
                                onClick={() => setIsAddTaskModalOpen(true)}
                            >
                                <FontAwesomeIcon className="me-2" icon={faSquarePlus} />
                                Add new task
                            </Button>
                        </div>
                    </Col>
                    <Col sm="9" md="10">
                        <Filters onFilter={onFilter} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className={styles.btnCheck}>
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
                            </Button>{" "}
                            <DeleteSelected
                                disabled={!selectedTasks.size}
                                tasksCount={selectedTasks.size}
                                onSubmit={deleteSelectedTasks}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={styles.counter}>
                            <p><i>Only tasks: {count}</i></p>
                        </div>
                    </Col>
                </Row>

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
            </Container>
        </>
    );
}
export default ToDo;


