import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { Doughnut } from 'react-chartjs-2';
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
    const [totalCount, setTotalCount] = useState(0);
    const [gameCountArr, setGameCountArr] = useState([])
    const [refresh, setRefresh] = useState(false);
    const [removable, setRemovable] = useState(false)
    const [reportable, setReportable] = useState(true);
    const [reported, setReported] = useState(false);
    const [modal, setModal] = useState(false);

    const labels = ["League of Legends", "Smite", "Diablo 3", "Destiny 2", "Overwatch"]

    const getUsers = async () => {
        const { email } = props;
        props.getCurrentUser();
        const userData = await axios.get(`/users/${email}`);
        setUser(userData.data[0]);
        const user_id = userData.data[0].user_id
        if (props.user.email === userData.data[0].email) {
            setReportable(false);
        }
        if (props.user.id === props.creator_id) {
            setRemovable(true)
        }
        const fullCount = await axios.get(`/api/teams/count/${user_id}`)
        setTotalCount(fullCount.data[0].count)
        const countObj = await axios.get(`/api/teams/count/game/${user_id}`)
        setGameCountArr(countObj.data);

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

    const data = {
        labels: labels,
        datasets: [{
            data: gameCountArr,
            backgroundColor: [
                '#ced4da',
                '#868e96',
                '#343a40',
                "#212529",
                "#000"

            ],
            hoverBackgroundColor: [
                '#FFF',
                '#FFF',
                '#FFF',
                "#FFF",
                "#FFF"
            ]
        }]
    }

    const options = {
        maintainAspectRatio: false,
        responsive: false,
        legend: {
            position: 'left',
            labels: {
                boxWidth: 10
            }
        }
    }

    return (
        <div>
            <Avatar src={user.avatar} alt="avatar" />
            <h1>{user.display_name}</h1>
            <h2>{user.email}</h2>
            <h2>Games Played:</h2>
            <h2>{totalCount}</h2>
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
            <Doughnut data={data} options={options} />
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
