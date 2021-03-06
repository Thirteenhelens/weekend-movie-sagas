import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery("FETCH_SELECTED_MOVIE_DB", fetchSelectedMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch {
        console.log('get all error');
    }

}

function* fetchSelectedMovie(action) {
    // Get selected Movie from DB
    try {
        let selected = action.payload;
        const response = yield axios.get(`/api/genre/${selected}`);

        yield put({
            type: 'SET_SELECTED_MOVIE_GENRE',
            payload: response
        })
    } catch (err) {
        console.log('Err getting selected genres ->', err);
    }
}

function* fetchAllGenres() {
    // get all genres from the DB
    try {
        const genres = yield axios.get('/api/genre');
        console.log('get all:', genres);
        yield put({ type: 'SET_GENRES', payload: genres });
    } catch {
        console.log('get genres error');
    }

}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store the movie the user clicked on. 
const selectedMovie = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTED_MOVIE":
            return action.payload;
        default:
            return state;
    }
}

// Used to store the genres of the movie the user clicked on. 
const selectedMovieGenres = (state = [], action) => {
    switch (action.type) {
        case "SET_SELECTED_MOVIE_GENRE":
            return action.payload;
        default:
            return state;
    }
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie,
        selectedMovieGenres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
