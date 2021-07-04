import React, { Component } from 'react';

import Axios from 'axios';
import MovieList from '../MovieList/MovieList';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

const KEY = '2f914b341fe5d8616a45b71c9d9cbdee';
const BASE_URL = 'https://api.themoviedb.org';

class HomeView extends Component {
    state = {
        trendMoovie: [],
        page: 1
    };

    async componentDidMount() {
        const response = await Axios.get(`${BASE_URL}/3/trending/movie/week?api_key=${KEY}&language=en-US&page=${this.state.page}`)
            .catch(error => console.log(error));
        // console.log(response.data.results);
        this.setState({trendMoovie: response.data.results})
    };

    handleLoadMore = () => {
        Axios.get(`${BASE_URL}/3/trending/movie/week?api_key=${KEY}&language=en-US&page=${this.state.page += 1}`)
        .then(res => this.setState(({ trendMoovie }) => ({ trendMoovie: [...trendMoovie, ...res.data.results] })))
        .catch(error => console.log(error))
    };

    render() {
        // console.log(this.props.match.url)
        return (
        <>
                <MovieList trendMoovie={this.state.trendMoovie} />
                
                {this.state.trendMoovie.length !== 0 && <LoadMoreBtn onClick={this.handleLoadMore } />}
        </>   
        )
    };
};

export default HomeView;