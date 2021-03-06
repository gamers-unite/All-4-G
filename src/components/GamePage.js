import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// local
import { getCurrentUser } from "../ducks/userReducer";
import Request from "./Request";
import CreateRequest from "./CreateRequest";
// import { request } from "http";
// styling
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';

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
        padding: theme.spacing.unit * 4,
        background: "rgba(192, 192, 192, 0.9)",
        borderRadius: "5%",
        outline: "none",
        webkitBoxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)",
        mozBoxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)",
        boxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)"
    }
})

const GamePage = props => {
    const { classes } = props;
    const [game, updateGame] = useState({ platform: [] });
    const [allRequest, updateAllRequest] = useState([]);
    const [filteredRequest, updateFilteredRequest] = useState([])
    const [platform, updatePlatform] = useState('All')
    const [modal, setModal] = useState(false);

    //RETRIEVE GAME DATA
    const fillGame = async () => {
        let url = props.location.pathname.replace("/", "");
        let result = await axios.post("/api/games/url", { url });
        updateGame(result.data[0]);
    };

    //RETRIEVE ALL ACTIVE REQUESTS FOR GAME
    const fillRequests = async () => {
        if (game.game_id) {
            let fillReq = await axios.post("/api/requests/game", {
                game_id: game.game_id
            });
            updateAllRequest(fillReq.data);
            updateFilteredRequest(fillReq.data)
        }
    };

    //CHANGE PLATFORM STATE WHEN DROP DOWN MENU OPTION IS SELECTED
    const changePlatform = e => {
        updatePlatform(e.target.value);
    };

    //MODAL FUNCTIONS
    const openRequest = () => {
        setModal(true);
    };

    const closeRequest = () => {
        fillRequests();
        setModal(false);
    };

    useEffect(() => {
        fillGame();
    }, []);

    useEffect(() => {
        fillRequests();
    }, [game]);

    //IF PLATFORM CHANGES, FILTER THROUGH ALL REQUESTS AND RETURN FILTERED REQUESTS
    useEffect(() => {
        if (platform !== 'All') {
            const filtered = allRequest.filter(req => req.platform === platform)
            updateFilteredRequest(filtered)
        }
        if (platform === 'All') {
            updateFilteredRequest(allRequest)
        }
    }, [platform])

    //MAP OVER FILTERED REQUEST ARRAY
    const requestMap = filteredRequest.map((e, i) => {
        return (
            <Request
                key={i}
                id={e.req_id}
                creatorImg={e.avatar}
                creatorName={e.display_name}
                fillRequests={fillRequests}
            />
        );
    });

    //CREATE DROP DOWN OPTIONS TO FILTER REQUESTS BY GAMING PLATFORM
    const optionMap = game.platform.map(platform => {
        return (
            <option name="platform" value={platform}>
                {platform}
            </option>
        )
    }
    )
    return (
        <>
            <GameInfo img={game.background_img}>
                <div className='fog' />
                <div className='under_div'>
                    <img src={game.logo} alt="alt" />
                    <div className='game_info'>
                        <h1>{game.title}</h1>
                        <p>{game.info}</p>
                        <div>
                            <h2>Max Party: </h2>
                            <h2>{game.max_party}</h2>
                        </div>
                    </div>
                </div>
            </GameInfo>
            <Requests
                img='https://firebasestorage.googleapis.com/v0/b/all-4-g.appspot.com/o/images%2Fbackground.jpg?alt=media&token=88fde558-e096-4a32-9b76-c7bb9eeb3b3c'
                primary={filteredRequest.length > 1}
            >
                {props.user.email && (
                    <Button className='request_btn' style={{cursor: 'pointer'}} variant='contained' onClick={openRequest}>Create Request</Button>
                )}
                {modal && (
                    <Modal
                        className={classes.modalWrapper}
                        open={modal}
                        onClose={closeRequest}
                    >
                        <CreateRequest
                            platforms={game.platform}
                            max_party={game.max_party}
                            game_id={game.game_id}
                            closeRequest={closeRequest}
                            fillRequests={fillRequests}
                            style={classes.modal}
                        />
                    </Modal>
                )}
                <RequestsTitle src='https://firebasestorage.googleapis.com/v0/b/all-4-g.appspot.com/o/images%2FRequests4.png?alt=media&token=09a3374a-13de-43f5-86da-9d7ead60629f'></RequestsTitle>
                <div className='select_platform'>
                    <select name='platform' onChange={changePlatform}>
                        <option name='platform' value='All'>All</option>
                        {optionMap}
                    </select>
                </div>
                <div className='request_map'>{requestMap}</div>
            </Requests>
        </>
    );
};

GamePage.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.user.user
    };
};

export default connect(
    mapStateToProps,
    { getCurrentUser }
)(withStyles(styles)(GamePage));

const GameInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 400px;
    overflow: hidden;
    background: url(${props => props.img}) no-repeat center center;
    background-size: cover;

    .fog {
        position: absolute;
        background: rgba(0,0,0, 0.7);
        height: 100%;
        width: 100%;
    }

    .under_div {
        display: flex;
        position: relative;
        background: rgba(255,255,255, 0.5);
        box-shadow: 0px 0px 10px 6px rgba(255,255,255, 0.5);
        width: 90%;
        height: 90%;
    }

    img {
        float: left;
        margin: auto 1% auto 1%;
        height: 90%;
        width: auto;
        border-radius: 2px;
    }

    .game_info {
        display: flex;
        flex-direction: column;

        div {
            margin: 2px;
            display: flex;
            align-items: center;
        }
    }

    h2 {
        margin: 5px;
    }
`;

const Requests = styled.div`
    display: flex;
    flex-direction: column;
    background: url('https://firebasestorage.googleapis.com/v0/b/all-4-g.appspot.com/o/images%2Fbackground.jpg?alt=media&token=88fde558-e096-4a32-9b76-c7bb9eeb3b3c') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    width: 100%;
    height: ${ props => props.primary ? 'auto' : '60vh' };
    color: white;
    box-shadow: inset 0px 15px 25px 8px rgba(0,0,0,0.75);

    .request_btn {
        position: absolute;
        right: 0;
        margin: 2%;
        cursor: pointer;
    }

    .request_map {
        margin: 5% 10% 2% 10%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .select_platform {
        width: 100%;
        display: flex;
        justify-content: center;

        select {
            width: 15em;
            height: 5em;
            background: rgba(255,255,255, 0.5);
            border: none;
            margin-top: 2em;
        }
    }

`;

const RequestsTitle = styled.img`
    position: absolute;
    z-index: 1;
    height: 5em;
    width: 20em;
    transform: rotate(-42deg);
    image-rendering: sharp;
    margin-top: 5em;
`;