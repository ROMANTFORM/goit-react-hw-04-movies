import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Axios from 'axios';
import { ReactComponent as IconArrow } from '../../icons/left-arrow.svg';

// Components
import routes from '../../routes';
import Cast from './Cast';
import Review from './Review';

class MovieCard extends Component{

    state = {
        id: '',
        imageLink: 'https://image.tmdb.org/t/p/w500',
        title: '',
        backdrop_path: '',
        overview: '',
        genres: []
    };

    async componentDidMount() {
     
        const response = await Axios.get(
            `https://api.themoviedb.org/3/${this.props.match.url}?api_key=2f914b341fe5d8616a45b71c9d9cbdee`);
        
        this.setState({
            id: response.data.id,
            title: response.data.title,
            backdrop_path: response.data.backdrop_path,
            overview: response.data.overview,
            genres: [...response.data.genres]
        });
        // console.log(response.data)
    };

    handleGoBack = () => {
        const { location, history } = this.props;
        
        if (location.state && location.state.from) {
            return history.push(location.state.from)
        }
        history.push(routes.home)

        // history.push(location?.state?.from || routes.home)  это новый синтаксис, но он пока очень утяжеляет приложение

        // новый синтаксис оператор ?.
        // тернарник a.x ? a.x : 'oops';
        // новый a?.x || 'oops'
    };

    render() {
        const { imageLink, title, backdrop_path, overview, genres } = this.state;

        return (
            <div className="Movie-card-container">

                <button
                    className="Back-btn"
                    type='button'
                    onClick={this.handleGoBack}
                >
                    <IconArrow width="20" height="20" /> 
                </button>

                <h2>{title}</h2>
                <div className="Movie-card">
                        <img className="Movie-card__img" src={`${imageLink}${backdrop_path}`} alt={title }/>
                        <p className="Movie-card__overview">{overview}</p>    
                </div>
                
                <h5>Genre :</h5>
                        <ul className="Genre-list">
                            {genres.map(genre => (
                                <li className="Genre-list__item" key={genre.id}>{genre.name}</li>
                            ))}
                        </ul>
                <div className="additional">
                    <ul>
                        <li >
                            <Link to={{
                                pathname: `${this.props.match.url}/cast`,
                                state: this.props.location.state
                            }}>Cast</Link>
                        </li>
                        <li >
                            <Link to={{
                                pathname: `${this.props.match.url}/review`,
                                state: this.props.location.state
                            }}>Reviews</Link> 
                        </li>
                    </ul>
                    <Route path="/movie/:movieId/cast" component={Cast}/>
                    <Route path="/movie/:movieId/review" component={Review}/>
                </div>
            </div>
        )
    };
};

export default MovieCard;