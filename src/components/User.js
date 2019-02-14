import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { getCurrentUser, getUser } from "../ducks/userReducer";
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
    const [user, setUser] = useState(props.user);
    const [refresh, setRefresh] = useState(false);
    const [reportable, setReportable] = useState(false);
    const [editable, setEditable] = useState(true);
    const [editModal, setEditModal] = useState(false);

    const getUser = async () => {
        const { email } = props;
        axios.get("/users/", { email }).then(response => {
            setUser(response.data);

            setReportable(true);
            setEditable(false);
        });
    };

    useEffect(() => {
        props.getCurrentUser();
        if (props.email) {
            getUser();
        } else {
            setReportable(false);
            setEditable(true);
        }
        setRefresh(false);
    }, [refresh === true]);

    const openEdit = () => {
        setEditModal(true);
    };

    const closeEdit = () => {
        setEditModal(false);
        setRefresh(true);
    };

    const submitReport = () => {
        const { id } = user;
        axios.post("/api/reports", { id });
    };

    return (
        <div>
            <Avatar src={props.user.avatar} alt="avatar" />
            <h1>{props.user.display_name}</h1>
            <h2>{props.user.email}</h2>
            {user.blizzard && (
                <>
                    <p>Blizzard:</p>
                    <p>{user.blizzard}</p>
                </>
            )}
            {user.epic && (
                <>
                    <p>Epic:</p>
                    <p>{user.epic}</p>
                </>
            )}
            {user.ps4 && (
                <>
                    <p>PlayStation:</p>
                    <p>{user.ps4}</p>
                </>
            )}
            {user.riot && (
                <>
                    <p>Riot:</p>
                    <p>{user.riot}</p>
                </>
            )}
            {user.steam && (
                <>
                    <p>Steam:</p>
                    <p>{user.steam}</p>
                </>
            )}
            {user.xbox && (
                <>
                    <p>Xbox:</p>
                    <p>{user.xbox}</p>
                </>
            )}
            {reportable && <button onClick={submitReport}>Report User</button>}
            {editable && <button onClick={openEdit}>Edit</button>}
            {editModal && (
                <Modal
                    className={classes.modalWrapper}
                    open={editModal}
                    onClose={closeEdit}
                >
                    <EditProfile
                        closeEdit={closeEdit}
                        display_name={user.display_name}
                        avatar={user.avatar}
                        blizzard={user.blizzard}
                        epic={user.epic}
                        ps4={user.ps4}
                        riot={user.riot}
                        steam={user.steam}
                        xbox={user.xbox}
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
    { getCurrentUser, getUser }
)(withStyles(styles)(Profile));
