import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeleteTut from "./DeleteTut";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// Redux
import { connect } from "react-redux";
import { likeTut, unlikeTut } from "../redux/actions/dataActions";

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
    likedTut = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.tutId === this.props.tut.tutId
            )
        ) {
            return true;
        } else {
            return false;
        }
    };
    likeTut = () => {
        this.props.likeTut(this.props.tut.tutId);
    };
    unlikeTut = () => {
        this.props.unlikeTut(this.props.tut.tutId);
    };
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
        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavoriteBorder color="primary" />
                </Link>
            </MyButton>
        ) : this.likedTut() ? (
            <MyButton tip="Unlike" onClick={this.unlikeTut}>
                <FavoriteIcon color="primary" />
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={this.likeTut}>
                <FavoriteBorder color="primary" />
            </MyButton>
        );
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
                        color="textPrimary"
                    >
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                </CardContent>
            </Card>
        );
    }
}

Tut.propTypes = {
    likeTut: PropTypes.func.isRequired,
    unlikeTut: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    tut: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    likeTut,
    unlikeTut,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Tut));
