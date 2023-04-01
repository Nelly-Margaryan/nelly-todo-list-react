import { Component } from "react";
import Task from "../Task/Task";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { idGenerator } from "../../utils/helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from "./todo.module.css";


class ToDo extends Component {

    state = {
        tasks: [],
        newTaskTitle: "",
        selectedTasks: new Set(),
    }

    handleInputChange = (event) => {
        const newTaskTitle = event.target.value;
        this.setState({ newTaskTitle });
    }

    handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
            this.addNewTask();
        }
    }

    addNewTask = () => {
        const trimedTitle = this.state.newTaskTitle.trim();
        if (!trimedTitle) {
            return;
        }
        const newTask = {
            id: idGenerator(),
            title: trimedTitle,
        }
        const tasks = [...this.state.tasks];
        tasks.push(newTask);
        this.setState({
            tasks,
            newTaskTitle: "",
        });
    }

    onTaskDelete = (taskId) => {
        const { selectedTasks, tasks } = this.state;
        const newTasks = tasks.filter((task) => task.id !== taskId);
        const newState = {tasks: newTasks,}
        
        if (selectedTasks.has(taskId)) {
            const newSelectedTasks = new Set(selectedTasks);
            newSelectedTasks.delete(taskId);
            newState.selectedTasks = newSelectedTasks;
        }
        this.setState(newState)
    }


    onTaskSelect = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        } else {
            selectedTasks.add(taskId);
        }
        this.setState({
            selectedTasks,
        })
    }

    deleteSelectedTasks = () => {
        const newTasks = [];
        const { selectedTasks, tasks } = this.state;
        tasks.forEach((task) => {
            if (!selectedTasks.has(task.id)) {
                newTasks.push(task);
            }
        });
        this.setState({
            tasks: newTasks,
            selectedTasks: new Set(),
        });
    }

    render() {
        const tasksJsx = this.state.tasks.map((task) => {
            return (
                <Task
                    data={task}
                    key={task.id}
                    onTaskDelete={this.onTaskDelete}
                    onTaskSelect={this.onTaskSelect}
                />
            );
        })

        const isAddNewTaskButtonDisabled = this.state.newTaskTitle.trim() === "";

        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs="10" sm="8" md="6">
                        <InputGroup className="mb-3 mt-4">
                            <Form.Control
                                placeholder="Task title"
                                onChange={this.handleInputChange}
                                onKeyDown={this.handleInputKeyDown}
                                value={this.state.newTaskTitle}
                            />
                            <Button
                                variant="success"
                                onClick={this.addNewTask}
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
                <Button
                    variant="dark"
                    className={styles.deleteSelected}
                    onClick={this.deleteSelectedTasks}
                    disabled={!this.state.selectedTasks.size}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                    Delete Selected
                </Button>
            </Container>
        );
    }
}
export default ToDo;


