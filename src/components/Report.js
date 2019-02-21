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
            <Button variant='contained' style={{cursor: 'pointer'}} onClick={submitReport}>Submit</Button>
            <Button variant='contained' style={{cursor: 'pointer'}} onClick={props.closeReport}>Cancel</Button>
        </div>
    );
};

Report.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Report);
