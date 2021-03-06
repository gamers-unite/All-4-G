import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Doughnut } from 'react-chartjs-2';
import { getCurrentUser } from "../ducks/userReducer";
import EditProfile from "./EditProfile";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";

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
    const [modal, setModal] = useState(false);
    const [totalCount, setTotalCount] = useState(0)
    const [gameCountArr, setGameCountArr] = useState([])

    const labels = ["League of Legends", "Smite", "Diablo 3", "Destiny 2", "Overwatch"]

    const getCount = async () => {
        const user_id = props.user.id
        const fullCount = await axios.get(`/api/teams/count/${user_id}`)
        setTotalCount(fullCount.data[0].count)
        const countObj = await axios.get(`/api/teams/count/game/${user_id}`)
        setGameCountArr(countObj.data);
    }

    useEffect(() => {
        props.getCurrentUser();
        setRefresh(false);
    }, [refresh === true]);

    useEffect(() => {
        if (props.user.id) {
            getCount();
        }
    }, [props.user.id])

    const openEdit = () => {
        setModal(true);
    };

    const closeEdit = () => {
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
                boxWidth: 20,
                boxHeight: 20,
                fontColor: 'black',
                fontSize: 20
            }
        }
    }

    return (
        <ProfilePage>
            <div className='fog' />
            <ProfileFormat>
                <AvatarStyle>
                    <h1>{props.user.display_name}</h1>
                    <Avatar src={props.user.avatar} alt="avatar" className='user_avatar' />
                </AvatarStyle>
                <UserInfo>
                    <IdFormat>
                        <h2>Email: </h2>
                        <p>{props.user.email}</p>
                    </IdFormat>
                    {props.user.blizzard && (
                        <IdFormat>
                            <h2>Blizzard: </h2>
                            <p>{props.user.blizzard}</p>
                        </IdFormat>
                    )}
                    {props.user.epic && (
                        <IdFormat>
                            <h2>Epic: </h2>
                            <p>{props.user.epic}</p>
                        </IdFormat>
                    )}
                    {props.user.ps4 && (
                        <IdFormat>
                            <h2>PlayStation: </h2>
                            <p>{props.user.ps4}</p>
                        </IdFormat>
                    )}
                    {props.user.riot && (
                        <IdFormat>
                            <h2>Riot: </h2>
                            <p>{props.user.riot}</p>
                        </IdFormat>
                    )}
                    {props.user.steam && (
                        <IdFormat>
                            <h2>Steam: </h2>
                            <p>{props.user.steam}</p>
                        </IdFormat>
                    )}
                    {props.user.xbox && (
                        <IdFormat>
                            <h2>Xbox: </h2>
                            <p>{props.user.xbox}</p>
                        </IdFormat>
                    )}
                    <IdFormat>
                        <h2>Total Games: </h2>
                        <p>{totalCount}</p>
                    </IdFormat>
                    {!modal && <Button variant='contained' style={{ position: 'relative', bottom: '-2em', height: '12em', width: '7em'}}onClick={openEdit}>Edit</Button>}
                    {modal && (
                        <Modal
                            className={classes.modalWrapper}
                            open={modal}
                            onClose={closeEdit}
                        >
                            <EditProfile
                                email={props.user.email}
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
                </UserInfo>
            </ProfileFormat>
            <DoughnutDiv>
                <Doughnut data={data} options={options} width='600' height='600' textColor='black' />
            </DoughnutDiv>
        </ProfilePage>
    );
};

Profile.propTypes = {
    classes: PropTypes.object.isRequired
};

export const mapStateToProps = state => {
    return { user: state.user.user };
};

export default connect(
    mapStateToProps,
    { getCurrentUser }
)(withStyles(styles)(Profile));

const ProfilePage = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    z-index: -1;
    background: url('https://firebasestorage.googleapis.com/v0/b/all-4-g.appspot.com/o/images%2Fbackground.jpg?alt=media&token=88fde558-e096-4a32-9b76-c7bb9eeb3b3c') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    .fog {
        position: absolute;
        background: rgba(250,250,250, 0.3);
        height: 100%;
        width: 100%;
        z-index: -1;
    }
`;

const DoughnutDiv = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10vw;
`;

const IdFormat = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 15vw;
`;

const ProfileFormat = styled.div`
    position: relative;
    padding: 4em 0 0 5vw;
    height: 100%;
    width: 40%;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    height: 85vh;
    width: 20%;
`;

const AvatarStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 20em;
    align-items: space-between;
    justify-content: flex-end;
    float: left;
    top: 5em;
    left: 0;
    margin: 2em;

    h1 {
        margin-right: 2em;
    }

    .user_avatar {
        height: 10em;
        width: 10em;
    }
`;