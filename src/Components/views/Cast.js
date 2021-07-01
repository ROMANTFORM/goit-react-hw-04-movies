import React, { Component } from 'react';
import Axios from 'axios';
 
const KEY = '2f914b341fe5d8616a45b71c9d9cbdee';
const BASE_URL = 'https://api.themoviedb.org';

class Cast extends Component{
    state = {
        data: []
    };

    async componentDidMount() {
        const res = await Axios.get(
            `${BASE_URL}/3/movie/${this.props.match.params.movieId}/credits?api_key=${KEY}`
        );
        this.setState({data: [...res.data.cast]})
        // console.log(res.data)
    };

    render() {
        // console.log(this.props.match.params.movieId);
        return (
            <div>
                <h2>Cast</h2>
                <ul>
                    {this.state.data.map(action => (
                        <li key={action.id}>{action.name}</li>
                    ))}
                </ul>
            </div>
        )
    };
};

export default Cast;