import { useState, useEffect } from "react";
import Task from "../Task/Task";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ConfirmDialog from "./ConfirmDialog";
import DeleteSelected from "../DeleteSelected/DeleteSelected";
import TaskApi from "../../api/taskApi";

const taskApi = new TaskApi();

function ToDo() {

    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        taskApi.getAll().then((tasks) => {
            setTasks(tasks);
        });
    }, [])

    const handleInputChange = (event) => {
        setNewTaskTitle(event.target.value);
    }

    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
            addNewTask();
        }
    }

    const addNewTask = () => {
        const trimedTitle = newTaskTitle.trim();
        if (!trimedTitle) {
            return;
        }

        const newTask = {
            title: trimedTitle,
        }

        taskApi.add(newTask)
            .then((task) => {
                const tasksCopy = [...tasks];
                tasksCopy.push(task);
                setTasks(tasksCopy);
                setNewTaskTitle("");
            });
    };

    const onTaskDelete = (taskId) => {
        const newTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(newTasks);

        if (selectedTasks.has(taskId)) {
            const newSelectedTasks = new Set(selectedTasks);
            newSelectedTasks.delete(taskId);
            setSelectedTasks(newSelectedTasks);
        }
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
        const newTasks = [];

        tasks.forEach((task) => {
            if (!selectedTasks.has(task._id)) {
                newTasks.push(task);
            }
        });
        setTasks(newTasks);
        setSelectedTasks(new Set());
    }


    const tasksJsx = tasks.map((task) => {
        return (
            <Task
                data={task}
                key={task._id}
                onTaskDelete={setTaskToDelete}
                onTaskSelect={onTaskSelect}
            />
        );
    })


    const isAddNewTaskButtonDisabled = newTaskTitle.trim() === "";

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs="10" sm="8" md="6">
                    <InputGroup className="mb-3 mt-4">
                        <Form.Control
                            placeholder="Task title"
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            value={newTaskTitle}
                        />
                        <Button
                            variant="success"
                            onClick={addNewTask}
                            disabled={isAddNewTaskButtonDisabled}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Add
                        </Button>
                    </InputGroup>

                </Col>
            </Row>
            <Row>
                {tasksJsx}
            </Row>

            <DeleteSelected
                disabled={!selectedTasks.size}
                tasksCount={selectedTasks.size}
                onSubmit={deleteSelectedTasks}
            />
            {taskToDelete &&
                <ConfirmDialog
                    tasksCount={1}
                    onCancel={() => { setTaskToDelete(null) }}
                    onSubmit={() => {
                        onTaskDelete(taskToDelete);
                        setTaskToDelete(null);
                    }}

                />}
                

        </Container>

    );

}
export default ToDo;


