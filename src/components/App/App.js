import './App.css';
import Details from '../Details/Details';
import MovieList from '../MovieList/MovieList';
import MovieForm from '../MovieForm/MovieForm';
import { HashRouter as Router, Route } from 'react-router-dom';
// Importing components and styling.

function App() {
  return (
    <div className="App">

      <Router>
        {/* Home page */}
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details" >
          <Details />
        </Route>

        {/* Movie page */}
        <Route path="/movieForm" >
          <MovieForm />
        </Route>
      </Router>

    </div>
  );
}


export default App;
