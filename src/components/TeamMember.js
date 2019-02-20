import React, { useState } from 'react'
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import User from './User'

const styles = theme => ({
    modalWrapper: {
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center"
    },

    modal: {
        position: "absolute",
        float: "left",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: theme.spacing.unit * 50,
        boxShadow: theme.shadows[10],
        padding: theme.spacing.unit * 4,
        background: "grey",
        border: ".5em solid black",
        borderRadius: "10%",
        outline: "none"
    }
});

const TeamMember = props => {
    const [modal, setModal] = useState(false)
    const { classes } = props;

    const openModal = () => {
        setModal(true)
    };

    const closeModal = () => {
        setModal(false)
    };

    return (
        <div>
            <img
                className="mini_avatar player"
                src={props.request.avatar}
                alt="mini"
                onClick={openModal}
            />
            <Modal
                className={classes.modalWrapper}
                open={modal}
                onClose={closeModal}
            >
                <div className={classes.modal}>

                    <User creator_id={props.request.creator_id}
                        email={props.request.email}
                    />

                </div>
            </Modal>
        </div>

    )
}

TeamMember.propTypes = {
    classes: PropTypes.object.isRequired
};

export default (withStyles(styles)(TeamMember));
