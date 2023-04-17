import React from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ConfirmDialog(props) {
    return (
        <Modal
            size="sm"
            show={true}
            onHide={props.onCancel}
        >
            <Modal.Header closeButton>
                <Modal.Title> Are you sure to delete {props.tasksCount} {props.tasksCount>1 ? "tasks" : "task"}? </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-evenly">
                <Button 
                variant="secondary"
                onClick={props.onSubmit}
                > Delete </Button>
                <Button 
                variant="outline-secondary"
                onClick={props.onCancel}
                > Cancel </Button>
                </div>
            
            </Modal.Body>
        </Modal>
    );
}

ConfirmDialog.propTypes = {
    tasksCount: PropTypes.number,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
}
export default ConfirmDialog;