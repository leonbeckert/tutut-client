import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Tut from "../components/tut/Tut";
import Profile from "../components/profile/Profile";
import TutSkeleton from "../util/TutSkeleton";

import { connect } from "react-redux";
import { getTuts } from "../redux/actions/dataActions";

class home extends Component {
    componentDidMount() {
        this.props.getTuts();
    }
    render() {
        const { tuts, loading } = this.props.data;
        let recentTutsMarkup = !loading ? (
            tuts.map((tut) => <Tut key={tut.tutId} tut={tut} />)
        ) : (
            <TutSkeleton />
        );
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentTutsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    }
}

home.propTypes = {
    getTuts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps, { getTuts })(home);
