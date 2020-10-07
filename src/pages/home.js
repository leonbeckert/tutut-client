import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Tut from "../components/Tut";

class home extends Component {
    state = {
        tuts: null,
    };
    componentDidMount() {
        axios
            .get("/tuts")
            .then((res) => {
                this.setState({
                    tuts: res.data,
                });
            })
            .catch((err) => console.error(err));
    }
    render() {
        let recentTutsMarkup = this.state.tuts ? (
            this.state.tuts.map((tut) => <Tut key={tut.tutId} tut={tut} />)
        ) : (
            <p>Loading...</p>
        );
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentTutsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        );
    }
}

export default home;
