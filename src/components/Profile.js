import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { getCurrentUser } from "../ducks/userReducer";
import EditProfile from "./EditProfile";

const styles = theme => ({
    modalWrapper: {
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center"
    }
});

const Profile = props => {
    const { classes } = props;
    const [refresh, setRefresh] = useState(false);
    const [editable, setEditable] = useState(true);
    const [editModal, setEditModal] = useState(false);

    useEffect(() => {
        props.getCurrentUser();
        setRefresh(false);
    }, [refresh === true]);

    const openEdit = () => {
        setEditModal(true);
    };

    const closeEdit = () => {
        setEditModal(false);
        setRefresh(true);
    };

    return (
        <div>
            <Avatar src={props.user.avatar} alt="avatar" />
            <h1>{props.user.display_name}</h1>
            <h2>{props.user.email}</h2>
            {props.user.blizzard && (
                <>
                    <p>Blizzard:</p>
                    <p>{props.user.blizzard}</p>
                </>
            )}
            {props.user.epic && (
                <>
                    <p>Epic:</p>
                    <p>{props.user.epic}</p>
                </>
            )}
            {props.user.ps4 && (
                <>
                    <p>PlayStation:</p>
                    <p>{props.user.ps4}</p>
                </>
            )}
            {props.user.riot && (
                <>
                    <p>Riot:</p>
                    <p>{props.user.riot}</p>
                </>
            )}
            {props.user.steam && (
                <>
                    <p>Steam:</p>
                    <p>{props.user.steam}</p>
                </>
            )}
            {props.user.xbox && (
                <>
                    <p>Xbox:</p>
                    <p>{props.user.xbox}</p>
                </>
            )}
            {editable && <button onClick={openEdit}>Edit</button>}
            {editModal && (
                <Modal
                    className={classes.modalWrapper}
                    open={editModal}
                    onClose={closeEdit}
                >
                    <EditProfile
                        closeEdit={closeEdit}
                        display_name={props.user.display_name}
                        avatar={props.user.avatar}
                        blizzard={props.user.blizzard}
                        epic={props.user.epic}
                        ps4={props.user.ps4}
                        riot={props.user.riot}
                        steam={props.user.steam}
                        xbox={props.user.xbox}
                    />
                </Modal>
            )}
        </div>
    );
};

Profile.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return { user: state.user.user };
};

export default connect(
    mapStateToProps,
    { getCurrentUser }
)(withStyles(styles)(Profile));
