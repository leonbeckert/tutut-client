import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// MUI stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// Redux stuff
import { connect } from "react-redux";
import { getTut, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
    ...theme.spreadThis,
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
        top: "6%",
    },
    expandButton: {
        position: "absolute",
        left: "90%",
    },
    spinnerDiv: {
        textAlign: "center",
        marginTop: 50,
        marginBottom: 50,
    },
});

class TutDialog extends Component {
    state = {
        open: false,
    };
    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getTut(this.props.tutId);
    };
    handleClose = () => {
        this.setState({ open: false });
        this.props.clearErrors();
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
                comments,
            },
            UI: { loading },
            authenticated,
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={100} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={4}>
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
                    <LikeButton tutId={tutId} />
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                </Grid>
                {commentCount > 0 && (
                    <hr className={classes.visibleSeparator} />
                )}
                <CommentForm tutId={tutId} />
                {authenticated && <hr className={classes.visibleSeparator} />}
                <Comments comments={comments} />
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
    clearErrors: PropTypes.func.isRequired,
    getTut: PropTypes.func.isRequired,
    tutId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    tut: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    tut: state.data.tut,
    UI: state.UI,
    authenticated: state.user.authenticated,
});

const mapActionsToProps = {
    getTut,
    clearErrors,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(TutDialog));
