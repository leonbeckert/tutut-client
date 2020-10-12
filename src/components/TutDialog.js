import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// MUI stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

// Redux stuff
import { connect } from "react-redux";
import { getTut } from "../redux/actions/dataActions";

const styles = (theme) => ({
    ...theme.spreadThis,
    invisibleSeparator: {
        border: "none",
        margin: 4,
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: "50%",
        objectFit: "cover",
    },
    dialogContent: {
        padding: 20,
    },
    closeButton: {
        position: "absolute",
        left: "90%",
    },
});

class TutDialog extends Component {
    state = {
        open: false,
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getTut(this.props.tutId);
    };
    handleClose = () => {
        console.log("TutDialog handleClose");
        this.setState({ open: false });
        console.log(this.state.open);
    };
    render() {
        const {
            classes,
            tut: {
                tutId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
            },
            UI: { loading },
        } = this.props;

        const dialogMarkup = loading ? (
            <CircularProgress size={200} />
        ) : (
            <Grid container spacing={10}>
                <Grid item sm={5}>
                    <img
                        src={userImage}
                        alt="Profile"
                        className={classes.profileImage}
                    />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                </Grid>
            </Grid>
        );
        return (
            <Fragment>
                <MyButton
                    onClick={this.handleOpen}
                    tip="Expand tut"
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

TutDialog.propTypes = {
    getTut: PropTypes.func.isRequired,
    tutId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    tut: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    tut: state.data.tut,
    UI: state.UI,
});

const mapActionsToProps = {
    getTut,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(TutDialog));
