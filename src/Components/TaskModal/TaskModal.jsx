import { useState, memo, useLayoutEffect, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { formatDate } from "../../Utils/helpers";
import styles from "./taskModal.module.css";

function TaskModal(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [isTitleValid, setIsTitleValid] = useState(false);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(()=>{
        titleRef.current.focus();
    }, []);

    const handleClick = (event) => {
        const {key} = event;
        if(title && key === "Enter"){
            event.preventDefault();
            descriptionRef.current.focus();
        }
    }
    

    useEffect(() => {
        const { data } = props;
        if (data) {
            setTitle(data.title);
            setDescription(data.description);
            setDate(data.date ? new Date(data.date) : new Date());
            setIsTitleValid(true);
        }
    }, [props]);

    const saveTask = () => {
        const newTask = {
            title: title.trim(),
            description: description.trim(),
            date: formatDate(date),
        }
        if (props.data) {
            newTask._id = props.data._id;
        }
        props.onSave(newTask);
    }

    const onTitleChange = (event) => {
        const { value } = event.target;
        const trimedTitle = value.trim();
        setIsTitleValid(!!trimedTitle);
        setTitle(value);
        const {key} = event;
    }

    useLayoutEffect(() => {
        const keydownHandler = (event) => {
            const { key, ctrlKey, metaKey } = event;
            if (key === "s" && (ctrlKey || metaKey)) {
                event.preventDefault();
                saveTask();
            }
        }
        document.addEventListener("keydown", keydownHandler);
        return () => {
            document.removeEventListener("keydown", keydownHandler);
        };
        // eslint-disable-next-line
    }, [title, description, date])

    const modalTitle = props.data ? "Edit task" : "Add new task";

    return (
        <Modal
            size="md"
            show={true}
            onHide={props.onCancel}
        >
            <Modal.Header closeButton>
                <Modal.Title> {modalTitle} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    placeholder="Title"
                    className={!isTitleValid ? styles.invalid : ""}
                    value={title}
                    onChange={onTitleChange}
                    ref={titleRef}
                    onKeyDown={handleClick}
                />
                <Form.Control
                    placeholder="Description"
                    as="textarea"
                    rows={4}
                    className='mt-3 mb-3'
                    value={description}
                    ref={descriptionRef}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <h6 className={styles.italic}>Deadline:</h6>
                <DatePicker
                className={styles.lineLength}
                    showIcon
                    selected={date}
                    onChange={setDate}
                />
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex justify-content-evenly gap-2">
                    <Button
                        variant="success"
                        disabled={!isTitleValid}
                        onClick={saveTask}
                    > Save </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={props.onCancel}
                    > Cancel </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

TaskModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    data: PropTypes.object,
}
export default memo(TaskModal);