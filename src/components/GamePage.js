import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Request from "./Request";
import MiniProfile from "./MiniProfile";
import CreateRequest from "./CreateRequest";
import { getCurrentUser } from "../ducks/userReducer";
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

const GamePage = props => {
    const { classes } = props;
    const [game, updateGame] = useState({ platform: [] });
    const [allRequest, updateAllRequest] = useState([]);
    const [filteredRequest, updateFilteredRequest] = useState([])
    const [platform, updatePlatform] = useState('All')
    const [modal, setModal] = useState(false);

    const fillGame = async () => {
        let url = props.location.pathname.replace("/", "");
        let result = await axios.post("/api/games/url", { url });
        updateGame(result.data[0]);
    };

    const fillRequests = async () => {
        if (game.game_id) {
            let fillReq = await axios.post("/api/requests/game", {
                game_id: game.game_id
            });
            updateAllRequest(fillReq.data);
            updateFilteredRequest(fillReq.data)
        }
    };

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

    useEffect(() => {
        if (platform !== 'All') {
            const filtered = allRequest.filter(req => req.platform === platform)
            updateFilteredRequest(filtered)
            console.log('filtered:', filtered)
        }
        if (platform === 'All') {
            updateFilteredRequest(allRequest)
        }
    }, [platform])

    useEffect(() => {
        console.log('current state of filteredRequest: ', filteredRequest)
    }, [filteredRequest])

    const changePlatform = e => {
        updatePlatform(e.target.value);
    };

    const requestMap = filteredRequest.map((e, i) => {
        console.log('e:', e)
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

    const optionMap = game.platform.map(platform => {
        return (
            <option name="platform" value={platform}>
                {platform}
            </option>
        )
    }
    )
    console.log('requestMap: ', requestMap)
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
            <Requests img='https://firebasestorage.googleapis.com/v0/b/all-4-g.appspot.com/o/images%2Fbackground.jpg?alt=media&token=88fde558-e096-4a32-9b76-c7bb9eeb3b3c'>
                {props.user.email && (
                    <Button className='request_btn' variant='contained' onClick={openRequest}>Create Request</Button>
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
                <h1>Requests</h1>
                <div className='select_platform'>
                    <select name='platform' onChange={changePlatform}>
                        <option name='platform' value='All'>All</option>
                        {optionMap}
                    </select>
                </div>
                <div className='request_map'>{requestMap}</div>
                {console.log('reqMap: ', requestMap)}

            </Requests>
            {game.platform &&
                <MiniProfileFormat>
                    <MiniProfile platforms={game.platform} />
                </MiniProfileFormat>}
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
    // color: white;

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
    width: 100vw;
    color: white;
    box-shadow: inset 0px 15px 25px 8px rgba(0,0,0,0.75);

    h1 {
        position: absolute;
        margin: 2%;
    }

    .request_btn {
        position: absolute;
        right: 0;
        margin: 2%;
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

`
const MiniProfileFormat = styled.div`
    color: #000000;
`