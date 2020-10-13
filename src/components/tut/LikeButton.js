import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// Redux
import { connect } from "react-redux";
import { likeTut, unlikeTut } from "../../redux/actions/dataActions";

class LikeButton extends Component {
    likedTut = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.tutId === this.props.tutId
            )
        ) {
            return true;
        } else {
            return false;
        }
    };
    likeTut = () => {
        this.props.likeTut(this.props.tutId);
    };
    unlikeTut = () => {
        this.props.unlikeTut(this.props.tutId);
    };
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="Like">
                    <FavoriteBorder color="primary" />
                </MyButton>
            </Link>
        ) : this.likedTut() ? (
            <MyButton tip="Unlike" onClick={this.unlikeTut}>
                <FavoriteIcon color="primary" />
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={this.likeTut}>
                <FavoriteBorder color="primary" />
            </MyButton>
        );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    tutId: PropTypes.string.isRequired,
    likeTut: PropTypes.func.isRequired,
    unlikeTut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    likeTut,
    unlikeTut,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
