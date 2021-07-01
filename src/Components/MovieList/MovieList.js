import React from 'react';
import { Link, withRouter } from 'react-router-dom';




const MovieList = ({ trendMoovie, match, location}) => {
    
console.log(location.state)

    return (


        <>
        <h1>Tranding Movie for the Week</h1>
            <ul className="Gallery">
                {
                trendMoovie && trendMoovie.map(movie => (
                    <li key={movie.id}>
                        <Link to={{
                            pathname: `${match.url}movie/${movie.id}`,
                            state: { from: location.pathname }
                        }}>
                        {movie.title}
                            <img className="Search-card__img" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title }/>
                        </Link>
                    </li>
                    ))}
            </ul>
        </>
    )
};

export default withRouter(MovieList);