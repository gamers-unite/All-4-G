import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const styles = theme => ({
    modal: {
        position: "absolute",
        float: "left",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: theme.spacing.unit * 50,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        background: "#fff"
    }
});

const Report = props => {
    const { classes } = props;
    const [reason, setReason] = useState("");

    const onChange = e => {
        setReason(e.target.value);
    };

    const submitReport = e => {
        e.preventDefault();
        const { user_id } = props;
        axios
            .post("/api/reports", {
                user_id,
                reason
            })
            .then(() => {
                props.closeReport();
            });
    };

    return (
        <div className={classes.modal}>
            <input name="reason" onChange={onChange} />
            <Button variant='contained' onClick={submitReport}>Submit</Button>
            <Button variant='contained' onClick={props.closeReport}>Cancel</Button>
        </div>
    );
};

Report.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Report);
