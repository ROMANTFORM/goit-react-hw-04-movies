import React, { Component } from 'react';
import { ReactComponent as IconSearch } from '../../icons/icon-search.svg';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';


const KEY = '2f914b341fe5d8616a45b71c9d9cbdee';
const BASE_URL = 'https://api.themoviedb.org';

class SearchMovie extends Component{
    state = {
        inputValue: '',
        data: [],
        page: 1
    };

    showState = (e) => {
        e.preventDefault();
        console.log(this.state.inputValue);
        this.componentDidMount();
    }
    async componentDidMount() {
        const response = await Axios.get(
            `${BASE_URL}/3/search/movie?api_key=${KEY}&language=en-US&page=${this.state.page}&query=${this.state.inputValue}`
        )
            
        this.setState({ data: [...response.data.results] });
        // console.log(response.data.results)
    };

    handleChange = evt => {
    this.setState({ inputValue: evt.target.value })
    // console.log(evt.target.value)
    };
    
    handleLoadMore = () => {
        Axios.get(
    `${BASE_URL}/3/search/movie?api_key=${KEY}&language=en-US&page=${this.state.page += 1}&query=${this.state.inputValue}`
        )
        .then(res => this.setState(({ data }) => ({ data: [...data, ...res.data.results] })))
        .catch(error => console.log(error))
    };

    render() {
        console.log(this.props.location.pathname)
        const { data } = this.state;
        return (
            <>
            <h2>Search Movie@</h2>
            <header className="Searchbar">
                    <form className="SearchForm">
                        <button
                            type="submit"
                            className="SearchForm-button"
                            onClick={this.showState}
                            >
                        <IconSearch width="20" height="20" fill="white"/>
                        </button>

                        <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search movie"
                        value={this.state.value}
                        onChange={this.handleChange}
                        
                        />
                    </form>
                </header>

                <ul className="Gallery">
                    {data.map(movie => (
                        <li key={movie.id}>
                            <Link to={{
                                pathname: `/movie/${movie.id}`,
                                state: {from: this.props.location.pathname}
                            }}>
                                {movie.title}
                                <img className="Search-card__img" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title }/>
                            </Link>
                        </li>
                    ))}
                </ul>

                {this.state.data.length !== 0 && <LoadMoreBtn onClick={this.handleLoadMore }/>}
                </>
        ) 
    };
};

export default SearchMovie;