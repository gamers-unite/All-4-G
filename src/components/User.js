import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { getCurrentUser, getUser } from "../ducks/userReducer";
import Report from "./Report";

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
    const [user, setUser] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [reportable, setReportable] = useState(true);
    const [modal, setModal] = useState(false);

    const getUsers = async () => {
        const { email } = props;
        await props.getCurrentUser();
        await axios.get("/users/", { email }).then(response => {
            setUser(response.data);
            if (props.user.email === response.data.email) {
                setReportable(false);
            }
        });
    };

    useEffect(() => {
        getUsers();
        setRefresh(false);
    }, [refresh === true]);

    const openReport = () => {
        setModal(true);
    };

    const closeReport = () => {
        setModal(false);
        setRefresh(true);
    };

    const submitReport = () => {
        const { id } = user;
        axios.post("/api/reports", { id });
    };

    return (
        <div>
            <Avatar src={user.avatar} alt="avatar" />
            <h1>{user.display_name}</h1>
            <h2>{user.email}</h2>
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
            {reportable && <button onClick={openReport}>Report User</button>}
            {modal && (
                <Modal
                    className={classes.modalWrapper}
                    open={modal}
                    onClose={closeReport}
                >
                    <Report closeReport={closeReport} user_id={user.user_id} />
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
