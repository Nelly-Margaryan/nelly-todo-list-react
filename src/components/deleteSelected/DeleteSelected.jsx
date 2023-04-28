import { useState, memo } from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";


function DeleteSelected(props) {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const toggleConfirmDialod = () => { setIsConfirmDialogOpen(!isConfirmDialogOpen) };

    return (
        <>
            <Button
                variant="dark"
                onClick={toggleConfirmDialod}
                disabled={props.disabled}
            >
                <FontAwesomeIcon className="me-2" icon={faTrashCan} />
                Delete Selected
            </Button>
            {isConfirmDialogOpen &&
                <ConfirmDialog
                    tasksCount={props.tasksCount}
                    onCancel={toggleConfirmDialod}
                    onSubmit={() => {
                        props.onSubmit();
                        toggleConfirmDialod();
                    }}

                />}
        </>
    );

}

DeleteSelected.propTypes = {
    disabled: PropTypes.bool.isRequired,
    tasksCount: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default memo(DeleteSelected);


