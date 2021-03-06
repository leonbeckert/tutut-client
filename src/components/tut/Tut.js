import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeleteTut from "./DeleteTut";
import TutDialog from "./TutDialog";
import LikeButton from "./LikeButton";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";

const styles = {
    card: {
        position: "relative",
        display: "flex",
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: "cover",
    },
};

export class Tut extends Component {
    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            tut: {
                body,
                createdAt,
                userImage,
                userHandle,
                likeCount,
                commentCount,
                tutId,
            },
            user: {
                authenticated,
                credentials: { handle },
            },
        } = this.props;

        const deleteButton =
            authenticated && userHandle === handle ? (
                <DeleteTut tutId={tutId} />
            ) : null;

        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                    >
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton tutId={tutId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <TutDialog
                        tutId={tutId}
                        userHandle={userHandle}
                        openDialog={this.props.openDialog}
                    />
                </CardContent>
            </Card>
        );
    }
}

Tut.propTypes = {
    user: PropTypes.object.isRequired,
    tut: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Tut));
//
