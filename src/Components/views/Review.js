import React, { Component } from 'react';
import Axios from 'axios';

const KEY = '2f914b341fe5d8616a45b71c9d9cbdee';
const BASE_URL = 'https://api.themoviedb.org';

class Review extends Component{
    state = {
        data: []
    };

    async componentDidMount() {
        const response = await Axios.get(
            `${BASE_URL}/3/movie/${this.props.match.params.movieId}/reviews?api_key=${KEY}`);
        // console.log(response)
        this.setState({data: [...response.data.results]})
    }

    render() {
        return (
            <div>
                <h2>Review</h2>
                <ul>
                    {this.state.data.map(rev => (
                        <li key={rev.id} className="Review-list__item">
                            <h5>{rev.author}</h5>
                            <p>{rev.content}</p>
                            <p>{rev.created_at}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    };
};

export default Review;