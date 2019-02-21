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
        width: theme.spacing.unit * 40,
        // boxShadow: theme.shadows[10],
        padding: theme.spacing.unit * 4,
        background: "rgba(192, 192, 192, 0.9)",
        borderRadius: "5%",
        outline: "none",
        webkitBoxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)",
        mozBoxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)",
        boxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)"
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
                        req_id={props.request.req_id}
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
