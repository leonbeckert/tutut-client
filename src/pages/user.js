import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Tut from "../components/tut/Tut";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import TutSkeleton from "../util/TutSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

export class user extends Component {
    state = {
        profile: null,
        tutIdParam: null,
    };
    componentDidMount() {
        const { handle, tutId } = this.props.match.params;

        if (tutId) {
            this.setState({ tutIdParam: tutId });
        }

        this.props.getUserData(handle);
        axios
            .get(`/user/${handle}`)
            .then((res) => {
                this.setState({
                    profile: res.data.user,
                });
            })
            .catch((err) => console.log(err));
    }
    render() {
        const { tuts, loading } = this.props.data;
        const { tutIdParam } = this.state;

        const tutsMarkup = loading ? (
            <TutSkeleton />
        ) : tuts === null ? (
            <p>No tuts from this user</p>
        ) : !tutIdParam ? (
            tuts.map((tut) => <Tut key={tut.tutId} tut={tut} />)
        ) : (
            tuts.map((tut) => {
                if (tut.tutId !== tutIdParam) {
                    return <Tut key={tut.tutId} tut={tut} />;
                } else {
                    return <Tut key={tut.tutId} tut={tut} openDialog />;
                }
            })
        );

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {tutsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton />
                    ) : (
                        <StaticProfile profile={this.state.profile} />
                    )}
                </Grid>
            </Grid>
        );
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
