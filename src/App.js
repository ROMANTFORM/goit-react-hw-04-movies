import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

// Styles
import './App.scss';

// Components
import routes from './routes';
// import HomeView from './Components/views/HomeView';
// import SearchMovie from './Components/views/SearchMovie';
// import MovieCard from './Components/views/MovieCard';
import AppBar from './Components/AppBar';

const HomeView = lazy(() => import('./Components/views/HomeView.js' /* webpackChunkName: "home-view" */));
const SearchMovie = lazy(() => import('./Components/views/SearchMovie.js' /* webpackChunkName: "search-movie" */));
const MovieCard = lazy(() => import('./Components/views/MovieCard.js' /* webpackChunkName: "movie-card" */));


function App() {
  return (
    <>
      <AppBar />
      
      <Suspense fallback={<h1>Loading...</h1>}>
      <div className="App">
        <Switch>
          <Route exact path={routes.home} component={HomeView} />
          <Route path={routes.searchMovie} component={SearchMovie} />
          <Route path={routes.movieCard} component={MovieCard} />
        </Switch>
      </div>
      </Suspense>
    </>
  );
}

export default App;
