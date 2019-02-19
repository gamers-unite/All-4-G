import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { getCurrentUser } from "../ducks/userReducer";
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
    const [game, setGame] = useState(0)
    const [refresh, setRefresh] = useState(false);
    const [reportable, setReportable] = useState(true);
    const [reported, setReported] = useState(false);
    const [modal, setModal] = useState(false);

    const getUsers = async () => {
        const { email } = props;
        let user_id;
        await props.getCurrentUser();
        const userData = await axios.get("/users", { email });
        setUser(userData.data);
        user_id = userData.data.user_id
        if (props.user.email === response.data.email) {
            setReportable(false);
        }
        const gameCount = await axios.get('/api/teams/count', { user_id })
        console.log(gameCount.data)
        setGame(gameCount.data.count)


    };

    const getReports = async () => {
        const { user_id } = props;
        await axios.get("/reports", { user_id }).then(response => {
            if (response.data[0]) {
                setReported(true);
            }
        });
    };

    useEffect(() => {
        getUsers();
        getReports();
        setRefresh(false);
    }, [refresh === true]);

    const openReport = () => {
        setModal(true);
    };

    const closeReport = () => {
        setModal(false);
        setRefresh(true);
    };

    return (
        <div>
            <Avatar src={user.avatar} alt="avatar" />
            <h1>{user.display_name}</h1>
            <h2>{user.email}</h2>
            <h2>Games Played:</h2>
            <h2>{game}</h2>
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
            {reportable && !reported && (
                <button onClick={openReport}>Report User</button>
            )}
            {reportable && reported && <button disabled>Report Sent</button>}
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
    { getCurrentUser }
)(withStyles(styles)(Profile));
