import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { getCurrentUser } from "../ducks/userReducer";
import EditProfile from "./EditProfile";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import axios from "axios";

const styles = theme => ({
    modalWrapper: {
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#333333"
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

    return (
        <ProfileFormat>
            <AvatarStyle>
                <Avatar src={props.user.avatar} alt="avatar" style={{ height: '10em', width: '10em' }} />
            </AvatarStyle>
            <UserInfo>
                <h1>{props.user.display_name}</h1>
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

                {!modal && <Button variant='contained' onclick={openEdit}>Edit</Button>}
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


const IdFormat = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
padding-left: 10vw;

`;

const ProfileFormat = styled.div`
    padding-left: 5vw;
    width: 40%;

`;

const UserInfo = styled.div`
    width: 40%;

`;
const AvatarStyle = styled.div`
    width: 50%;
    height: 60%
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
`;

