import { useState } from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ConfirmDialog from "../Todo/ConfirmDialog";
import styles from "./deleteSelected.module.css";


function DeleteSelected(props) {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);


    const toggleConfirmDialod = () => {
        setIsConfirmDialogOpen(!isConfirmDialogOpen);
    }


    return (
        <>
            <Button
                variant="dark"
                className={styles.deleteSelected}
                onClick={toggleConfirmDialod}
                disabled={props.disabled}
            >
                <FontAwesomeIcon icon={faTrashCan} />
                Delete Selected
            </Button>
            {isConfirmDialogOpen &&
                <ConfirmDialog
                tasksCount={props.tasksCount}
                    onCancel={toggleConfirmDialod}
                    onSubmit={()=>{
                        props.onSubmit();
                        toggleConfirmDialod();
                    }}
                    
                />}
        </>
    );

}

DeleteSelected.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default DeleteSelected;


