import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { Doughnut } from 'react-chartjs-2';
import socketIOClient from 'socket.io-client';
import { getCurrentUser } from "../ducks/userReducer";
import Report from "./Report";
import styled from 'styled-components';

//MODAL TO DISPLAY USER INFO FROM REQUEST PAGE
//VIEWER CAN REPORT USER, AND CREATOR CAN REMOVE USER FROM TEAM

const socket = socketIOClient();

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
    const [reportable, setReportable] = useState(false);
    const [reports, setReports] = useState([])
    const [reported, setReported] = useState(false);
    const [modal, setModal] = useState(false);

    const labels = ["League of Legends", "Smite", "Diablo 3", "Destiny 2", "Overwatch"]

    const getUserData = async () => {
        const { email } = props;
        await props.getCurrentUser();
        const userData = await axios.get(`/users/${email}`);
        setUser(userData.data[0]);
        const user_id = userData.data[0].user_id
        if (props.user.id !== user_id) {
            setReportable(true);
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
        const id = user.user_id;
        axios.get(`api/reports/current/${id}`).then(response => {
            console.log('response', response)
            if (response.data[0]) {
                setReported(true);
            }
        });
        axios.get(`api/reports/${id}`).then(response => {
            setReports(response.data)
        });
    };

    const removeTeamMember = async () => {
        const { user_id } = user;
        const { req_id } = props;
        await axios.delete('/api/teams/user', { data: { user_id, req_id } })
        socket.emit('kick')
    }

    useEffect(() => {
        getUserData();
        setRefresh(false);
    }, [refresh === true]);

    useEffect(() => {
        if (user) getReports();
    }, [user])

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
            <User>{user.display_name} <Avatar className='UserAvatar' src={user.avatar} alt="avatar" /></User>
            <h2>{user.email}</h2>
            <h2>Open Reports: {reports.length}</h2>
            <h2>Games Played: {totalCount}</h2>
            <UserPlatforms>
                <div>
                {user.blizzard && (
                    <>
                        <h1>Blizzard: </h1>
                        <p>{user.blizzard}</p>
                    </>
                )}
                {user.epic && (
                    <>
                        <h1>Epic: </h1>
                        <p>{user.epic}</p>
                    </>
                )}
                </div>
                <div>
                    {user.ps4 && (
                        <>
                            <h1>PlayStation: </h1>
                            <p>{user.ps4}</p>
                        </>
                    )}
                    {user.riot && (
                        <>
                            <h1>Riot: </h1>
                            <p>{user.riot}</p>
                        </>
                    )}
                </div>
                <div>
                    {user.steam && (
                        <>
                            <h1>Steam: </h1>
                            <p>{user.steam}</p>
                        </>
                    )}
                    {user.xbox && (
                        <>
                            <h1>Xbox: </h1>
                            <p>{user.xbox}</p>
                        </>
                    )}
                </div>
            </UserPlatforms>
            <Doughnut data={data} options={options} />
            {removable && (
                <Button variant='contained' onClick={removeTeamMember}>Remove From Team</Button>
            )}
            {props.user && reportable && !reported && (
                <Button variant='contained' onClick={openReport}>Report User</Button>
            )}
            {reportable && reported && <Button variant='contained' disabled>Report Sent</Button>}
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

const UserPlatforms = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    h1{
        font-size: 100%;
    }
`;

const User = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 2em;
    font-weight: bold;

    .UserAvatar{
        height: 5em;
        width: 5em;
    }
`
