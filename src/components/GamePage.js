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
    const [game, updateGame] = useState({});
    const [allRequest, updateAllRequest] = useState([]);
    const [modal, setModal] = useState(false);

    const fillGame = async () => {
        let url = props.location.pathname.replace("/", "");
        let result = await axios.post("/api/games/url", { url });
        updateGame(result.data[0]);
    };

    const fillRequest = async () => {
        if (game.game_id) {
            let fillReq = await axios.post("/api/requests/game", {
                game_id: game.game_id
            });
            updateAllRequest(fillReq.data);
        }
    };

    const openRequest = () => {
        setModal(true);
    };

    const closeRequest = () => {
        setModal(false);
        fillRequest();
    };

    useEffect(() => {
        fillGame();
    }, []);
    useEffect(() => {
        fillRequest();
    }, [game]);

    const requestMap = allRequest.map((e, i) => {
        return (
            <Request
                key={i}
                id={e.req_id}
                creatorImg={e.avatar}
                creatorName={e.display_name}
                fillGame={fillGame}
            />
        );
    });

    return (
        <>
            <GameInfo>
                <img src={game.logo} alt="alt" />
                <div />
                <p>{game.info}</p>
                <h3>{game.max_party}</h3>
            </GameInfo>
            <Requests>
                {props.user.email && (
                    <Button variant='contained' onClick={openRequest}>Create Request</Button>
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
                            style={classes.modal}
                        />
                    </Modal>
                )}
                <h1>Requests</h1>
                <div>{requestMap}</div>
                
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
    position: relative;
    display: flex;
    background: #333333;
    height: 400px;

    div {
        position: absolute;
        bottom: 0;
        height: 3px;
        background: white;
        width: 80%;
        left: 10%;
        border: 1px solid black;
    }

    img {
        margin: auto 0;
        height: 300px;
        width: 200px;
    }

    p,
    h3 {
        color: white;
    }

    h1{
        color: white;
    }
`;

const Requests = styled.div`
    background: black;

`

const MiniProfileFormat = styled.div`
    color: #ffffff;
`