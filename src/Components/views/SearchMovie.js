import React, { Component } from 'react';
import { ReactComponent as IconSearch } from '../../icons/icon-search.svg';
import Axios from '../../utils/axios';
import { Link } from 'react-router-dom';

import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

class SearchMovie extends Component{
    state = {
        inputValue: '',
        data: [],
        page: 1
    };

   async componentDidMount() {
        const search = this.props.location.search
        const params = new URLSearchParams(search);


        if (params.has('query')) {
            const locationQuery = params.get('query');
            const data = await this.makeRequest(this.state.page, locationQuery)
        
            this.setState({ data : data.results}) ;
       }
       

    };

    makeRequest = async (page, value) => {
        const params = new URLSearchParams({
            page: page,
            query: value,
            language: "en-US"
        });

        const response = await Axios.get(
            `search/movie?${params.toString()}`
        );

        return response.data;
    };

    showState = async (e) => {
        e.preventDefault();

        this.props.history.push({
            search: `?query=${this.state.inputValue} `
        });

        const data = await this.makeRequest(this.state.page, this.state.inputValue)
        console.log(data)
        this.setState({ data : data.results}) ;  
    };

  
    handleChange = evt => {
    this.setState({ inputValue: evt.target.value })
    // console.log(evt.target.value)
    };
    
    handleLoadMore = async () => {
        const requestData = await this.makeRequest(this.state.page + 1, this.state.inputValue);
        this.setState(({data}) => ({data: [...data, ...requestData.results]}))
    };

    render() {
        // console.log(this.props.location.pathname)
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
                                state: {
                                    from: {
                                        search: this.props.location.search,
                                        pathname: this.props.location.pathname
                                    }
                                }
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